-- Trit Studio Unified Supabase Schema

-- 1. Coaches Table
CREATE TABLE IF NOT EXISTS coaches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    descriptor TEXT,
    strictness FLOAT DEFAULT 0.5,
    protein_priority FLOAT DEFAULT 0.5,
    carb_tolerance FLOAT DEFAULT 0.5,
    fat_tolerance FLOAT DEFAULT 0.5,
    hydration_emphasis FLOAT DEFAULT 0.5,
    consistency_emphasis FLOAT DEFAULT 0.5,
    tone TEXT DEFAULT 'calm',
    philosophy_id TEXT,
    language TEXT DEFAULT 'en',
    programs_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    birth_date DATE,
    gender TEXT,
    sex TEXT,
    occupation TEXT,
    height_cm FLOAT,
    starting_weight_kg FLOAT,
    target_weight_kg FLOAT,
    activity_level TEXT,
    dietary_preferences JSONB,
    assigned_coach_id TEXT REFERENCES coaches(id),
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Measurement Tracking
CREATE TABLE IF NOT EXISTS client_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    weight_kg FLOAT NOT NULL,
    body_fat_percent FLOAT,
    waist_circ_cm DECIMAL(5,2),
    navel_circ_cm DECIMAL(5,2),
    sleep_hours DECIMAL(3,1),
    sleep_quality INTEGER,
    measurements_cm JSONB,
    photo_front_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CRM - Medical
CREATE TABLE IF NOT EXISTS client_medical_conditions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    condition_name TEXT NOT NULL,
    diagnosed_date DATE,
    status TEXT DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_medications (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    dosage TEXT,
    start_date DATE,
    end_date DATE,
    reason TEXT,
    is_supplement BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_blood_tests (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    glucose DECIMAL(5,2),
    hba1c DECIMAL(4,2),
    alt DECIMAL(6,2),
    ast DECIMAL(6,2),
    ferritin DECIMAL(6,2),
    hemoglobin DECIMAL(8,2),
    vitamin_b12 DECIMAL(8,2),
    vitamin_d DECIMAL(8,2),
    folate DECIMAL(8,2),
    ldl DECIMAL(5,2),
    hdl DECIMAL(5,2),
    clinician_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CRM - Strategy & Planning
CREATE TABLE IF NOT EXISTS client_goals (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    target_weight_kg DECIMAL(5,2),
    target_body_fat_percent DECIMAL(4,2),
    priority TEXT NOT NULL,
    expected_weekly_change_kg DECIMAL(3,2),
    phase_name TEXT,
    status TEXT DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_nutrition_prescriptions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    phase_name TEXT,
    calories_target INTEGER,
    calories_min INTEGER,
    calories_max INTEGER,
    protein_grams INTEGER,
    carbs_grams INTEGER,
    fat_grams INTEGER,
    is_intermittent_fasting BOOLEAN DEFAULT FALSE,
    fasting_protocol TEXT,
    training_day_rules TEXT,
    rest_day_rules TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_protocols (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'nutrition',
    status TEXT DEFAULT 'active',
    details TEXT,
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tracking & Behavior
CREATE TABLE IF NOT EXISTS client_diary_entries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    food_item_id TEXT NOT NULL,
    date DATE NOT NULL,
    meal_type TEXT NOT NULL,
    quantity_grams DECIMAL(14,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_psychology_checkins (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    evening_hunger BOOLEAN DEFAULT FALSE,
    psychological_hunger_scale INTEGER,
    adherence_difficulty TEXT,
    stress_level TEXT,
    motivation_status TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_activity_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    activity_type TEXT,
    sessions_per_week INTEGER,
    distance_km_week DECIMAL(5,2),
    intensity TEXT,
    strength_training BOOLEAN DEFAULT FALSE,
    strength_split TEXT,
    is_current BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_metabolic_profiles (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    rmr_value INTEGER,
    rmr_method TEXT,
    tdee_range TEXT,
    calorie_deficit_target INTEGER,
    kcal_per_km_assumption INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_session_notes (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT REFERENCES clients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    observations TEXT,
    changes_made TEXT,
    reason_for_change TEXT,
    constants TEXT,
    next_checkpoint TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Migration: Ensure columns exist if table was created previously
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS programs_enabled BOOLEAN DEFAULT TRUE;

-- 7. Initial Data Seeding
INSERT INTO coaches (id, name, descriptor, strictness, protein_priority, carb_tolerance, fat_tolerance, hydration_emphasis, consistency_emphasis, tone, philosophy_id, language, programs_enabled)
VALUES 
('trit-default', 'Trit Coach', 'Balanced • All Macros', 0.7, 0.7, 0.5, 0.5, 0.7, 0.5, 'calm', 'default_balanced_v1', 'en', true),
('hebrew-default', 'המאמן של Trit', 'מאוזן • כל המקרו', 0.7, 0.7, 0.5, 0.5, 0.7, 0.5, 'calm', 'default_balanced_v1', 'he', true),
('strict-protein', 'Protein First Coach', 'Protein-focused • Direct', 0.9, 1.0, 0.4, 0.5, 0.6, 0.3, 'direct', 'protein_performance_v1', 'en', true),
('hydration-first', 'Hydration Hero', 'Hydration-focused • Motivational', 0.6, 0.6, 0.7, 0.7, 1.0, 0.8, 'motivational', 'hydration_wellness_v1', 'en', true),
('balanced', 'Balance Coach', 'All-around • Balanced', 0.5, 0.5, 0.5, 0.5, 0.5, 0.7, 'calm', 'balanced_v1', 'en', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Programs for default coaches
INSERT INTO coach_programs (coach_id, title, description, duration, videos, gradient, phases, active_phase)
VALUES 
('trit-default', 'Rapid Reset Protocol', 'AI-Optimized Metabolic Restart', '30 DAYS', '12 VIDEOS', 'from-[#4b7c77] to-[#a8c1bf]', '["Detox", "Refeed", "Sustain"]'::jsonb, 0),
('trit-default', 'Endurance Fueling', 'High-performance carb cycling', '12 WEEKS', '8 VIDEOS', 'from-[#2d4f4b] to-[#4b7c77]', '["Base", "Build", "Peak", "Taper"]'::jsonb, 1),
('trit-default', 'Gut Health Intensive', 'Microbiome restoration plan', '21 DAYS', '5 VIDEOS', 'from-[#d4a373] to-[#4b7c77]', '["Eliminate", "Reintroduce"]'::jsonb, 1),
('hebrew-default', 'פרוטוקול איפוס מהיר', 'אתחול מטבולי מבוסס AI', '30 ימים', '12 סרטונים', 'from-[#4b7c77] to-[#a8c1bf]', '["ניקוי", "הזנה מחדש", "שימור"]'::jsonb, 0),
('hebrew-default', 'תדלוק סיבולת', 'סייקלינג פחמימות לביצועים גבוהים', '12 שבועות', '8 סרטונים', 'from-[#2d4f4b] to-[#4b7c77]', '["בסיס", "בנייה", "שיא", "טייפר"]'::jsonb, 1)
ON CONFLICT DO NOTHING;

-- 8. Coach Programs
CREATE TABLE IF NOT EXISTS coach_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coach_id TEXT REFERENCES coaches(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    videos TEXT,
    gradient TEXT,
    phases JSONB DEFAULT '[]'::jsonb,
    active_phase INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_coach_programs_updated_at BEFORE UPDATE ON coach_programs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 9. Foods Table (Master Product List)
CREATE TABLE IF NOT EXISTS foods (
    barcode TEXT PRIMARY KEY,
    name_he TEXT,
    name_en TEXT,
    brand TEXT,
    category TEXT,
    nutrition_per_100g JSONB,
    images TEXT[],
    source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Utility Functions & Triggers
CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON coaches FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 11. RPC Functions (Server-side Logic)
CREATE OR REPLACE FUNCTION get_client_dashboard_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total', (SELECT count(*) FROM clients),
        'active', (SELECT count(*) FROM clients WHERE status = 'active')
    ) INTO result;
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to safely update client (handles empty string to null conversion)
CREATE OR REPLACE FUNCTION update_client_profile(client_id TEXT, updates JSONB)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    UPDATE clients 
    SET 
        full_name = COALESCE((updates->>'full_name'), full_name),
        phone = CASE WHEN (updates->>'phone') = '' THEN NULL ELSE COALESCE((updates->>'phone'), phone) END,
        status = COALESCE((updates->>'status'), status),
        assigned_coach_id = COALESCE((updates->>'assigned_coach_id'), assigned_coach_id),
        gender = COALESCE((updates->>'gender'), gender),
        height_cm = (updates->>'height_cm')::FLOAT,
        target_weight_kg = (updates->>'target_weight_kg')::FLOAT,
        birth_date = CASE WHEN (updates->>'birth_date') = '' THEN NULL ELSE (updates->>'birth_date')::DATE END,
        occupation = COALESCE((updates->>'occupation'), occupation),
        activity_level = COALESCE((updates->>'activity_level'), activity_level)
    WHERE id = client_id;

    SELECT row_to_json(c) INTO result FROM clients c WHERE id = client_id;
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;