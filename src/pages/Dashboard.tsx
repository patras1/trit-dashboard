
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Package, TrendingUp, Database } from 'lucide-react';

export const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        const { count, error } = await supabase
            .from('foods')
            .select('*', { count: 'exact', head: true });

        if (!error && count !== null) {
            setTotalProducts(count);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">לוח בקרה</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/products" className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">סה"כ מוצרים</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {loading ? '...' : totalProducts?.toLocaleString('he-IL')}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Package className="text-emerald-600" size={24} />
                        </div>
                    </div>
                </Link>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">עם ערכים תזונתיים</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">-</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <TrendingUp className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">מקור נתונים</h3>
                            <p className="text-lg font-bold text-gray-900 mt-2">Shufersal</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Database className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
