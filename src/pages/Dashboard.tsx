
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Package, TrendingUp, Database } from 'lucide-react';

export const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState<number | null>(null);
    const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);

        // Fetch total count
        const { count, error: countError } = await supabase
            .from('foods')
            .select('*', { count: 'exact', head: true });

        if (!countError && count !== null) {
            setTotalProducts(count);
        }

        // Fetch categories
        const { data: products, error: productsError } = await supabase
            .from('foods')
            .select('category');

        if (!productsError && products) {
            const categoryCounts: Record<string, number> = {};
            products.forEach(p => {
                const cat = p.category || 'ללא קטגוריה';
                categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            });

            const sortedCategories = Object.entries(categoryCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count);

            setCategories(sortedCategories);
        }

        setLoading(false);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-text-main mb-6">לוח בקרה</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/products" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-text-muted text-sm font-medium">סה"כ מוצרים</h3>
                                <p className="text-3xl font-bold text-text-main mt-2">
                                    {loading ? '...' : totalProducts?.toLocaleString('he-IL')}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                                <Package className="text-primary" size={24} />
                            </div>
                        </div>
                    </Link>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-text-muted text-sm font-medium">עם ערכים תזונתיים</h3>
                                <p className="text-3xl font-bold text-text-main mt-2">-</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                <TrendingUp className="text-blue-500" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-text-muted text-sm font-medium">מקור נתונים</h3>
                                <p className="text-lg font-bold text-text-main mt-2">Shufersal</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                                <Database className="text-purple-500" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div>

                <div className="md:w-1/3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[400px]">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-semibold text-text-main">קטגוריות</h3>
                        </div>
                        <div className="overflow-y-auto flex-1">
                            <div className="flex flex-col divide-y divide-gray-100">
                                {categories.map((cat) => (
                                    <Link
                                        to={`/products?category=${encodeURIComponent(cat.name)}`}
                                        key={cat.name}
                                        className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-inherit no-underline"
                                    >
                                        <span className="text-text-main font-medium truncate ml-2" title={cat.name}>{cat.name}</span>
                                        <span className="bg-primary-light text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0">
                                            {cat.count}
                                        </span>
                                    </Link>
                                ))}
                                {categories.length === 0 && !loading && (
                                    <div className="p-8 text-center text-text-muted">
                                        לא נמצאו קטגוריות
                                    </div>
                                )}
                                {loading && categories.length === 0 && (
                                    <div className="p-8 text-center text-text-muted">
                                        טוען קטגוריות...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
