
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowRight, Clock, Tag, Database, ShoppingBag } from 'lucide-react';

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
        return <div className="p-8 text-center text-gray-500">טוען פרטי מוצר...</div>;
    }

    if (!product) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">מוצר לא נמצא</p>
                <button
                    onClick={() => navigate('/products')}
                    className="text-emerald-600 hover:underline"
                >
                    חזרה למוצרים
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
                <ArrowRight size={18} className="rotate-180" />
                <span>חזרה לרשימה</span>
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Image Section */}
                    <div className="bg-gray-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-l border-gray-100">
                        {product.images && product.images[0] ? (
                            <img
                                src={product.images[0]}
                                alt={product.name_he}
                                className="max-w-full max-h-[400px] object-contain mix-blend-multiply"
                            />
                        ) : (
                            <div className="text-gray-300 flex flex-col items-center">
                                <ShoppingBag size={64} />
                                <span className="mt-2 text-sm">אין תמונה</span>
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="col-span-2 p-8 space-y-8">
                        <div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                                        {product.name_he}
                                    </h1>
                                    <p className="text-xl text-gray-400 font-light mt-1">
                                        {product.brand}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
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
                                    <span>{product.category || 'ללא קטגוריה'}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                                    <Database size={14} />
                                    <span className="font-mono">{product.barcode}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                                    <Clock size={14} />
                                    <span>{new Date(product.created_at).toLocaleDateString('he-IL')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">ערכים ל-100 גרם</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <NutrientCard
                                    label="קלוריות"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.calories)}
                                    unit="קק״ל"
                                />
                                <NutrientCard
                                    label="חלבונים"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.protein)}
                                    unit="גרם"
                                />
                                <NutrientCard
                                    label="שומנים"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.fat)}
                                    unit="גרם"
                                />
                                <NutrientCard
                                    label="פחמימות"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.carbs)}
                                    unit="גרם"
                                />
                                <NutrientCard
                                    label="נתרן"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.sodium)}
                                    unit="מ״ג"
                                />
                                <NutrientCard
                                    label="סוכרים"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.sugar)}
                                    unit="גרם"
                                />
                                <NutrientCard
                                    label="שומן רווי"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.satFat)}
                                    unit="גרם"
                                />
                                <NutrientCard
                                    label="כולסטרול"
                                    value={getNutrientValue(product.nutrition_per_100g, NUTRITION_KEYS.cholesterol)}
                                    unit="מ״ג"
                                />
                            </div>
                        </div>

                        {/* Raw JSON for debug */}
                        <div className="border-t border-gray-100 pt-8">
                            <details className="text-xs text-gray-400 cursor-pointer">
                                <summary className="hover:text-gray-600 transition-colors">מקור נתונים גולמי</summary>
                                <pre className="mt-4 p-4 bg-gray-50 rounded-lg overflow-x-auto">
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
