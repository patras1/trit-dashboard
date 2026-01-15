
export const Dashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">לוח בקרה</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">סה"כ מוצרים</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">...</p>
                </div>
            </div>
        </div>
    )
}
