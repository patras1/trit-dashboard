
export const getNutrientValue = (nutrition: any, keys: string[]) => {
    if (!nutrition) return null;

    // Normalize keys to array if string
    const searchKeys = Array.isArray(keys) ? keys : [keys];

    for (const key of searchKeys) {
        // 1. Precise match
        if (nutrition[key] !== undefined) return nutrition[key];

        // 2. Contains match (DB Key contains Search Key)
        // e.g. DB="סוכרים מתוך פחמימות", Search="סוכרים"
        const foundKey = Object.keys(nutrition).find(k => k.includes(key));
        if (foundKey) return nutrition[foundKey];
    }

    return null;
};

export const NUTRITION_KEYS = {
    calories: ['אנרגיה', 'קלוריות', 'קק"ל', 'Energy', 'Calories', 'kcal'],
    protein: ['חלבונים', 'חלבון', 'Protein'],
    fat: ['סך השומנים', 'שומנים', 'שומן', 'Fat', 'Fats', 'Lipids'],
    carbs: ['פחמימות', 'Carbohydrates', 'Carbs'],
    sodium: ['נתרן', 'Sodium', 'Salt'],
    sugar: ['סוכרים', 'סוכר', 'Sugars', 'Sugar'],
    satFat: ['שומן רווי', 'שומנים רוויים', 'Saturated', 'Sat Fat'],
    cholesterol: ['כולסטרול', 'Cholesterol']
};
