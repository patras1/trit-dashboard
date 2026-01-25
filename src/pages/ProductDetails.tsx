
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, ArrowRight, Clock, Tag, Database, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Product {
    barcode: string;
    name_he: string;
    name_en: string;
    brand: string;
    category: string;
    nutrition_per_100g: any;
    images: string[];
    source: string;
    created_at: string;
    price?: {
        price?: string;
        unit_price?: string;
    }
}

import { getNutrientValue, NUTRITION_KEYS } from '../lib/utils';

export const ProductDetails = () => {
    const { barcode } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (barcode) {
            fetchProduct(barcode);
        }
    }, [barcode]);

    const fetchProduct = async (code: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('foods')
            .select('*')
            .eq('barcode', code)
            .single();

        if (error) {
            console.error('Error fetching product:', error);
        } else {
            setProduct(data);
        }
        setLoading(false);
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">{t('products.details.loading')}</div>;
    }

    if (!product) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">{t('products.details.not_found')}</p>
                <button
                    onClick={() => navigate('/products')}
                    className="text-primary hover:underline"
                >
                    {t('products.details.back_to_list')}
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-6">
            <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
                {i18n.dir() === 'rtl' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                <span>{t('products.details.back_to_list')}</span>
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Image Section */}
                    <div className="bg-gray-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-l md:border-r-0 border-gray-100">
                        {product.images && product.images[0] ? (
                            <img
                                src={product.images[0]}
                                alt={i18n.language === 'en' ? product.name_en : product.name_he}
                                className="max-w-full max-h-[400px] object-contain mix-blend-multiply"
                            />
                        ) : (
                            <div className="text-gray-300 flex flex-col items-center">
                                <ShoppingBag size={64} />
                                <span className="mt-2 text-sm">{t('products.details.no_image')}</span>
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="col-span-2 p-8 space-y-8">
                        <div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                                        {(i18n.language === 'en' && product.name_en ? product.name_en : product.name_he) || (i18n.language === 'he' ? 'ללא שם' : 'Unnamed')}
                                    </h1>
                                    <p className="text-xl text-gray-400 font-light mt-1">
                                        {product.brand || t('products.details.unknown_brand')}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium">
                                        {getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.calories) || 0} kcal
                                    </span>
                                    {product.price?.price && (
                                        <p className="mt-2 text-lg font-bold text-gray-700">
                                            {product.price.price}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                                    <Tag size={14} />
                                    <span>{product.category || t('products.details.unknown_category')}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                                    <Database size={14} />
                                    <span className="font-mono">{product.barcode}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                                    <Clock size={14} />
                                    <span>{new Date(product.created_at).toLocaleDateString(i18n.language === 'he' ? 'he-IL' : 'en-US')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('products.details.per_100g')}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <NutrientCard
                                    label={t('products.table.calories')}
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.calories)}
                                    unit="kcal"
                                />
                                <NutrientCard
                                    label={t('products.table.protein')}
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.protein)}
                                    unit="g"
                                />
                                <NutrientCard
                                    label="Fat"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.fat)}
                                    unit="g"
                                />
                                <NutrientCard
                                    label="Carbs"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.carbs)}
                                    unit="g"
                                />
                                <NutrientCard
                                    label="Sodium"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.sodium)}
                                    unit="mg"
                                />
                                <NutrientCard
                                    label="Sugars"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.sugar)}
                                    unit="g"
                                />
                                <NutrientCard
                                    label="Sat. Fat"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.satFat)}
                                    unit="g"
                                />
                                <NutrientCard
                                    label="Cholest."
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.cholesterol)}
                                    unit="mg"
                                />
                            </div>
                        </div>

                        {/* Raw JSON for debug */}
                        <div className="border-t border-gray-100 pt-8">
                            <details className="text-xs text-gray-400 cursor-pointer">
                                <summary className="hover:text-gray-600 transition-colors">{t('products.details.raw_data')}</summary>
                                <pre className="mt-4 p-4 bg-gray-50 rounded-lg overflow-x-auto text-left" dir="ltr">
                                    {JSON.stringify(product, null, 2)}
                                </pre>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NutrientCard = ({ label, value, unit }: { label: string; value: any; unit: string }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-900">
            {value || '-'} <span className="text-xs font-normal text-gray-400">{unit}</span>
        </p>
    </div>
);
