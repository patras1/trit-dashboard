

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { MultiSelect } from '../components/ui/MultiSelect';
import { useTranslation } from 'react-i18next';

interface Product {
    barcode: string;
    name_he: string;
    name_en: string;
    brand: string;
    category: string;
    nutrition_per_100g: any;
    images: string[];
}

import { getNutrientValue, NUTRITION_KEYS } from '../lib/utils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ProductsPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilters = searchParams.getAll('category');

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const PAGE_SIZE = 10;

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(0);
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchData();
    }, [page, debouncedSearch, searchParams.toString()]);

    const fetchData = async () => {
        setLoading(true);

        // Fetch categories if not already loaded (only once)
        if (categories.length === 0) {
            const { data: catData } = await supabase
                .from('foods')
                .select('category');

            if (catData) {
                const categoryCounts: Record<string, number> = {};
                catData.forEach(p => {
                    const cat = p.category || 'ללא קטגוריה';
                    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
                });

                const sortedCategories = Object.entries(categoryCounts)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count);

                setCategories(sortedCategories);
            }
        }

        let query = supabase
            .from('foods')
            .select('*', { count: 'exact' });

        if (debouncedSearch) {
            query = query.or(`name_he.ilike.%${debouncedSearch}%,name_en.ilike.%${debouncedSearch}%,barcode.eq.${debouncedSearch}`);
        }

        if (categoryFilters.length > 0) {
            const regularCategories = categoryFilters.filter(c => c !== 'ללא קטגוריה');
            const hasUncategorized = categoryFilters.includes('ללא קטגוריה');

            if (hasUncategorized && regularCategories.length > 0) {
                const inList = `(${regularCategories.map(c => `"${c}"`).join(',')})`;
                query = query.or(`category.is.null,category.in.${inList}`);
            } else if (hasUncategorized) {
                query = query.is('category', null);
            } else {
                query = query.in('category', regularCategories);
            }
        }

        const { data, count, error } = await query
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data || []);
            setTotal(count || 0);
        }
        setLoading(false);
    };



    return (
        <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">{t('products.title')}</h1>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('products.search_placeholder')}
                        className={`w-full ${i18n.dir() === 'rtl' ? 'pl-10 pr-4' : 'pr-10 pl-4'} py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all`}
                    />
                    <Search className={`absolute ${i18n.dir() === 'rtl' ? 'left-3' : 'right-3'} top-2.5 text-gray-400`} size={18} />
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-start gap-4">
                <div className="z-20"> {/* Added z-index to ensure dropdown opens over other elements if needed, though mostly handled by absolute positioning in component */}
                    <MultiSelect
                        options={categories.map(c => ({ label: c.name, value: c.name, count: c.count }))}
                        selected={categoryFilters}
                        onChange={(selected) => {
                            const newParams = new URLSearchParams(searchParams);
                            newParams.delete('category');
                            selected.forEach(c => newParams.append('category', c));
                            setSearchParams(newParams);
                            setPage(0);
                        }}
                        placeholder={t('products.filter_placeholder')}
                    />
                </div>

                {/* Selected Chips */}
                {categoryFilters.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        {categoryFilters.map(cat => (
                            <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary-light text-primary border border-primary/20">
                                {cat}
                                <button
                                    onClick={() => {
                                        const newParams = new URLSearchParams(searchParams);
                                        const newFilters = categoryFilters.filter(c => c !== cat);
                                        newParams.delete('category');
                                        newFilters.forEach(c => newParams.append('category', c));
                                        setSearchParams(newParams);
                                        setPage(0);
                                    }}
                                    className="hover:bg-primary/10 rounded-full p-0.5 transition-colors cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                        <button
                            onClick={() => {
                                const newParams = new URLSearchParams(searchParams);
                                newParams.delete('category');
                                setSearchParams(newParams);
                                setPage(0);
                            }}
                            className="text-sm text-gray-500 hover:text-gray-700 underline px-2"
                        >
                            {/* Clear All text can be translated too if needed */}
                            {i18n.language === 'he' ? 'נקה הכל' : 'Clear all'}
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('products.table.product')}</th>
                                <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('products.table.barcode')}</th>
                                <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('products.table.category')}</th>
                                <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('products.table.calories')}</th>
                                <th className={`px-6 py-4 font-semibold text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{t('products.table.protein')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        {t('products.loading')}
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        {t('products.no_products')}
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr
                                        key={product.barcode}
                                        onClick={() => navigate(`/products/${product.barcode}`)}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <td className={`px-6 py-4 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                                    {product.images && product.images[0] ? (
                                                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">{t('products.details.no_image')}</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 line-clamp-1 max-w-[200px]" title={i18n.language === 'en' && product.name_en ? product.name_en : product.name_he}>
                                                        {(i18n.language === 'en' && product.name_en ? product.name_en : product.name_he) || (i18n.language === 'he' ? 'ללא שם' : 'Unnamed')}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{product.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 text-gray-600 font-mono text-xs ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>{product.barcode}</td>
                                        <td className={`px-6 py-4 text-gray-600 ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}>
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                                {product.category || (i18n.language === 'he' ? 'ללא קטגוריה' : 'Uncategorized')}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-gray-600 font-medium ${i18n.dir() === 'rtl' ? 'text-left' : 'text-left'}`}>
                                            {getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.calories) || '-'}
                                        </td>
                                        <td className={`px-6 py-4 text-gray-600 ${i18n.dir() === 'rtl' ? 'text-left' : 'text-left'}`}>
                                            {getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.protein) || '-'} g
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        {t('products.total_products', { count: page * PAGE_SIZE + 1, total: total })}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-white"
                        >
                            {i18n.dir() === 'rtl' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                        </button>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={(page + 1) * PAGE_SIZE >= total}
                            className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-white"
                        >
                            {i18n.dir() === 'rtl' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

