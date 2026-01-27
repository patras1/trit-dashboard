
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "dashboard": "Dashboard",
            "products": {
                "title": "Product Database",
                "search_placeholder": "Search products...",
                "filter_placeholder": "Filter by category",
                "total_products": "Showing {{count}} of {{total}} products",
                "no_products": "No products found",
                "loading": "Loading products...",
                "table": {
                    "product": "Product",
                    "barcode": "Barcode",
                    "category": "Category",
                    "calories": "Calories",
                    "protein": "Protein"
                },
                "details": {
                    "back_to_list": "Back to list",
                    "not_found": "Product not found",
                    "loading": "Loading product details...",
                    "no_image": "No Image",
                    "per_100g": "Values per 100g",
                    "raw_data": "Raw Data source",
                    "unknown_brand": "Unknown Brand",
                    "unknown_category": "Uncategorized"
                }
            },
            "stats": {
                "total_products": "Total Products",
                "with_nutrition": "With Nutrition",
                "data_source": "Data Source",
                "categories": "Categories"
            },
            "settings": {
                "title": "Settings",
                "general": "General",
                "language": "Language",
                "select_language": "Select Language",
                "theme": "Theme"
            },
            "common": {
                "loading": "Loading...",
                "save": "Save",
                "cancel": "Cancel",
                "edit": "Edit",
                "delete": "Delete"
            },
            "nav": {
                "dashboard": "Dashboard",
                "products": "Product Database",
                "coaches": "Coach Editor",
                "clients": "Client List",
                "settings": "Settings"
            },
            "clients": {
                "title": "Client List",
                "search_placeholder": "Search clients...",
                "all_coaches": "All Coaches",
                "all_statuses": "All Statuses",
                "add_client": "Add Client",
                "status_active": "Active",
                "status_paused": "Paused",
                "status_completed": "Completed",
                "no_clients_found": "No clients found",
                "table": {
                    "name": "Name",
                    "status": "Status",
                    "coach": "Coach",
                    "joined": "Joined Date"
                }
            },
            "coaches": {
                "title": "Coach Editor",
                "save_draft": "Save Draft",
                "publish": "Publish",
                "tabs": {
                    "identity": "Identity & Visuals",
                    "behavior": "Behavior Engine",
                    "programs": "Programs",
                    "voice": "Voice & Tone",
                    "quests": "Quests & Gamification",
                    "simulate": "Simulate",
                    "share": "Share"
                },
                "messages": {
                    "loading": "Loading coaches...",
                    "error_load": "Failed to load coaches",
                    "success_save": "Coach updated successfully",
                    "error_save": "Failed to save changes"
                }
            },
            "coach_identity": {
                "core_identity": "Core Identity",
                "visual_brand": "Visual Brand",
                "coach_name": "Coach Name",
                "coach_name_placeholder": "Enter coach name",
                "coach_name_hint": "The public name visible to your clients.",
                "descriptor": "Descriptor",
                "descriptor_placeholder": "e.g. AI Nutrition Expert",
                "descriptor_hint": "A short tagline describing the coach's persona.",
                "avatar_label": "Coach Avatar",
                "upload": "Upload",
                "image_url_label": "Avatar Image URL",
                "image_url_placeholder": "Paste URL here",
                "image_url_hint": "Recommended size: 512x512px. PNG or JPG.",
                "theme_color": "Theme Color",
                "accent_color": "Accent Color",
                "preview_title": "Live Preview",
                "preview_desc": "See how your changes look in the client app.",
                "launch_simulator": "Launch Simulator"
            },
            "coach_behavior": {
                "title": "Behavior Engine",
                "description": "Fine-tune the AI coach's personality traits and behavioral logic. These values directly influence natural language generation and decision-making thresholds.",
                "view_docs": "View Documentation",
                "personality_matrix": "Personality Matrix",
                "sliders": {
                    "strictness": "Strictness",
                    "protein_priority": "Protein Priority",
                    "hydration_emphasis": "Hydration Emphasis",
                    "encouragement": "Encouragement",
                    "technicality": "Technicality",
                    "directness": "Directness",
                    "lenient": "Lenient",
                    "rigid": "Rigid",
                    "standard": "Standard",
                    "aggressive": "Aggressive",
                    "minimal": "Minimal",
                    "frequent": "Frequent",
                    "stoic": "Stoic",
                    "hyper": "Hyper",
                    "simple": "Simple",
                    "scientific": "Scientific",
                    "nuanced": "Nuanced",
                    "blunt": "Blunt"
                },
                "triggers_title": "Behavioral Triggers",
                "notification_freq": {
                    "label": "Notification Frequency",
                    "hint": "How often should the coach ping the user for updates?",
                    "options": {
                        "low": "Low (1-2 per day)",
                        "medium": "Medium (3-4 per day)",
                        "high": "High (6+ per day)",
                        "realtime": "Real-time (Contextual)"
                    }
                },
                "forgiveness_factor": {
                    "label": "Forgiveness Factor",
                    "hint": "Tolerance level for missed targets or logging lapses.",
                    "options": {
                        "strict": "Strict (Immediate Warning)",
                        "balanced": "Balanced (Grace Period)",
                        "lenient": "Lenient (Delayed Intervention)"
                    }
                },
                "checkin_style": {
                    "label": "Check-in Style",
                    "hint": "Tone used during mandatory daily reflections.",
                    "options": {
                        "aggressive": "Aggressive (Metric-first)",
                        "supportive": "Supportive (Feeling-first)",
                        "passive": "Passive (Observation-only)"
                    }
                },
                "reset_defaults": "Reset Defaults",
                "update_logic": "Update Engine Logic"
            },
            "coach_programs": {
                "title": "Programs Configuration",
                "description": "Manage and curate your structured nutrition plans for clients.",
                "enable_programs": "Enable Programs",
                "enable_hint": "Make the programs tab visible to your end-users on the mobile app.",
                "your_programs": "Your Programs",
                "manage_all": "Manage All",
                "delete": "Delete",
                "add_new": "Add New Program",
                "create_modal": {
                    "title": "Create New Program",
                    "basic_info": "Basic Information",
                    "program_title": "Program Title",
                    "program_title_placeholder": "e.g. Rapid Reset Protocol",
                    "description": "Description",
                    "description_placeholder": "Briefly describe the purpose of this program...",
                    "duration": "Duration",
                    "days": "DAYS",
                    "weeks": "WEEKS",
                    "months": "MONTHS",
                    "educational_content": "Educational Content",
                    "video_lessons": "Total Video Lessons",
                    "program_phases": "Program Phases",
                    "add_phase": "Add Phase",
                    "phase_name_placeholder": "Phase {{index}} Name",
                    "visual_identity": "Visual Identity",
                    "cancel": "Cancel",
                    "create": "Create Program"
                },
                "card_1": {
                    "title": "Rapid Reset Protocol",
                    "desc": "AI-Optimized Metabolic Restart",
                    "structure": "Structure",
                    "phases": ["Detox", "Refeed", "Sustain"]
                },
                "card_2": {
                    "title": "Endurance Fueling",
                    "desc": "High-performance carb cycling",
                    "structure": "Structure",
                    "phases": ["Base", "Build", "Peak", "Taper"]
                },
                "card_3": {
                    "title": "Gut Health Intensive",
                    "desc": "Microbiome restoration plan",
                    "structure": "Structure",
                    "phases": ["Eliminate", "Reintroduce"]
                }
            },
            "coach_voice": {
                "title": "Voice & Tone",
                "description": "Configure the linguistic style and communication patterns of the AI coach.",
                "voice_personalization": "Voice Personalization",
                "base_tone": {
                    "label": "Base Tone",
                    "hint": "Sets the fundamental communication style for generated messages.",
                    "options": {
                        "calm": "Calm & Reassuring",
                        "direct": "Direct & No-Nonsense",
                        "motivational": "High Energy & Motivational",
                        "friendly": "Friendly & Conversational",
                        "professional": "Professional & Formal"
                    }
                },
                "primary_language": {
                    "label": "Primary Language",
                    "hint": "Default language for all coach communications.",
                    "options": {
                        "en": "English",
                        "es": "Spanish",
                        "fr": "French",
                        "de": "German",
                        "it": "Italian",
                        "pt": "Portuguese"
                    }
                },
                "response_length": {
                    "label": "Response Length",
                    "hint": "Average length of coach responses to user queries.",
                    "options": {
                        "concise": "Concise (1-2 sentences)",
                        "balanced": "Balanced (2-4 sentences)",
                        "detailed": "Detailed (Paragraph form)"
                    }
                },
                "emoji_usage": {
                    "label": "Emoji Usage",
                    "hint": "How often the coach uses emojis in messages.",
                    "options": {
                        "none": "None (Text only)",
                        "minimal": "Minimal (Occasional)",
                        "moderate": "Moderate (Balanced)",
                        "frequent": "Frequent (Every message)"
                    }
                },
                "language_model": {
                    "label": "Language Model",
                    "hint": "The AI model powering this coach's responses.",
                    "active": "Currently active"
                },
                "advanced_settings": {
                    "title": "Advanced Prompt Engineering",
                    "coming_soon": "Coming Soon",
                    "system_prompt": "System Prompt Template",
                    "system_prompt_hint": "Custom system prompt for advanced users (v2.0)",
                    "vocabulary": "Vocabulary Preferences",
                    "vocabulary_hint": "Preferred terms and phrases for this coach (v2.0)",
                    "forbidden": "Forbidden Words",
                    "forbidden_hint": "Words the coach should avoid using (v2.0)"
                },
                "example_messages": {
                    "title": "Example Messages",
                    "hint": "Preview how this coach might respond with current settings",
                    "protein_hack": "Scenario: User missed protein goal",
                    "streak_hack": "Scenario: User achieved weekly streak"
                }
            },
            "coach_gamification": {
                "title": "Quests & Gamification",
                "description": "Manage points, streaks, and quest content for your clients.",
                "enable": "Enable Gamification",
                "enable_hint": "Global master switch for all gamification features across the user mobile app.",
                "config_logic": "Configuration Logic",
                "points_system": "Points System",
                "log_meal": "Log a Meal",
                "hit_protein": "Hit Protein Goal",
                "drink_water": "Drink 2L Water",
                "streak_rules": "Streak Rules",
                "validation_interval": "Validation Interval",
                "grace_period": "Grace Period",
                "intervals": ["Daily Check-in", "Weekly Compliance", "Bi-Weekly Audit"],
                "grace_periods": ["0 days (No leeway)", "1 day allowance", "2 days allowance", "3 days allowance"],
                "content_management": "Content Management",
                "new_content": "New Content",
                "achievement_badges": "Achievement Badges",
                "manage_all": "Manage All",
                "badges": {
                    "fire_starter": { "title": "Fire Starter", "desc": "7-day streak" },
                    "macro_master": { "title": "Macro Master", "desc": "Perfect week" },
                    "early_bird": { "title": "Early Bird", "desc": "Log before 8 AM" }
                },
                "add_badge": "Add Badge",
                "active_quests": "Active Quests",
                "new_quest": "New Quest",
                "quests": {
                    "protein": { "title": "Protein Power Week", "desc": "Ends in 3 days", "status": "Live" },
                    "hydration": { "title": "Hydration Hero", "desc": "Continuous", "status": "Live" },
                    "meal_prep": { "title": "Meal Prep Master", "desc": "Scheduling phase", "status": "Draft" }
                },
                "footer": {
                    "last_saved": "Last saved 2 minutes ago",
                    "active_participants": "124 active participants",
                    "preview_app": "Preview Mobile App",
                    "view_docs": "View Documentation"
                }
            },
            "coach_simulate": {
                "title": "Test & Preview Simulation",
                "description": "Configure scenarios and preview the AI coach's response in real-time.",
                "history": "History",
                "export": "Export",
                "context": "Simulation Context",
                "select_scenario": "Select Scenario",
                "scenarios": {
                    "missed": "Missed Workout Support",
                    "protein": "High Protein Day Achieved",
                    "binge": "Emotional Eating Response",
                    "holiday": "Holiday Travel Planning",
                    "plateau": "Weight Loss Plateau Advice"
                },
                "user_profile": "Current User Profile",
                "edit_json": "Edit JSON",
                "data": {
                    "protein": "Daily Protein",
                    "streak": "Streak",
                    "goal_type": "Goal Type",
                    "mood_score": "Mood Score"
                },
                "add_field": "Add Data Field",
                "generate": "Generate Response",
                "preview_title": "Coach Preview",
                "live_mode": "Live Preview Mode",
                "encouraging_tone": "Encouraging Tone",
                "user_msg": "\"I missed my gym session today and I'm feeling pretty guilty about it. I also went a bit over on my carbs. What should I do for the rest of the day?\"",
                "coach_msg_1": "Hey! First of all, take a deep breath. One missed session doesn't define your progress. You've hit your protein goals for 12 days straight—that's incredible consistency that doesn't just disappear because of one day.",
                "coach_msg_2": "For the rest of today, don't try to \"starve\" to make up for the carbs. Just focus on high-quality protein and hydration. We'll get back to the plan tomorrow. Remember, this is a marathon, not a sprint! 🏃‍♂️",
                "coach_msg_3": "Would you like me to adjust your workout schedule for the rest of the week to fit that session in?",
                "ai_coach": "AI Coach • Just now",
                "end_simulation": "End of Simulation",
                "input_placeholder": "Type a follow-up user message to continue the test...",
                "input_hint": "Input is disabled in 'Scenario Simulation' mode. Click 'Generate' to restart with new context."
            },
            "coach_share": {
                "title": "Share Your Coach",
                "description": "Promote your AI nutrition coach across social media and grow your client base with ready-to-use links and templates.",
                "link_card": {
                    "title": "Shareable Link",
                    "label": "Your Coach URL",
                    "copied": "Copied",
                    "copy_link": "Copy Link",
                    "toast_copied": "Copied to clipboard!"
                },
                "social": {
                    "title": "Promote on Social Media"
                },
                "templates": {
                    "title": "Post Templates",
                    "customize": "Customize All",
                    "enthusiast": {
                        "label": "The Enthusiast",
                        "text": "\"Exciting news! 🚀 I've just launched my AI Nutrition Coach to help you reach your health goals faster. Get 24/7 personalized meal plans and guidance. Start your journey here: {{url}}\""
                    },
                    "professional": {
                        "label": "The Professional",
                        "text": "\"I am pleased to introduce my new AI-driven nutrition platform. Combining data-science with my nutritional expertise, this tool offers 24/7 client support. Link in bio to explore.\""
                    }
                },
                "mobile_preview": {
                    "rating": "Rating",
                    "clients": "Clients",
                    "status": "Status",
                    "active": "Active",
                    "about": "About",
                    "about_text": "I specialize in sustainable weight loss and performance nutrition. My AI assistant is trained on my methodology to provide you 24/7 support.",
                    "latest_plans": "Latest Plans",
                    "cta": "Start Coaching",
                    "powered_by": "Powered by Coach.ai",
                    "live_preview": "Live Preview"
                }
            },
            "auth": {
                "login": {
                    "title": "Welcome back, Coach",
                    "subtitle": "Access your dashboard to manage client progress and nutrition plans.",
                    "email_label": "Email Address",
                    "email_placeholder": "coach@tritstudio.com",
                    "password_label": "Password",
                    "forgot_password": "Forgot password?",
                    "password_placeholder": "••••••••",
                    "remember_me": "Remember me for 30 days",
                    "sign_in_button": "Sign In",
                    "or_continue_with": "Or continue with",
                    "google_account": "Google Account",
                    "dont_have_account": "Don't have an account?",
                    "apply_access": "Apply for early access"
                },
                "register": {
                    "step_1": "STEP 1 OF 3",
                    "account_details": "Account Details",
                    "full_name_label": "Full Name",
                    "full_name_placeholder": "John Doe",
                    "professional_email_label": "Professional Email",
                    "email_placeholder": "john@nutritionist.com",
                    "password_label": "Password",
                    "password_placeholder": "••••••••",
                    "password_strength_text": "Minimum 8 characters with a mix of letters and numbers.",
                    "i_agree": "I agree to the",
                    "terms_service": "Terms of Service",
                    "and": "and",
                    "privacy_policy": "Privacy Policy",
                    "create_account": "Create Account",
                    "already_have_account": "Already have an account?",
                    "log_in": "Log in",
                    "support": "Support"
                },
                "errors": {
                    "sign_in": "Failed to sign in",
                    "create_account": "Failed to create account"
                },
                "alt": {
                    "logo": "Trit Studio Logo",
                    "hero_image": "Digital Nutrition Twin Background",
                    "coach_avatar": "Coach Avatar"
                },
                "hero": {
                    "tagline": "The Future of AI-Powered Nutrition",
                    "headline": "Build Your Digital Nutrition Twin",
                    "description": "Trit Studio lets nutritionists and creators turn their expertise into scalable AI coaches — without losing control, credibility, or personalization.",
                    "features": {
                        "avatars_title": "Expert-driven AI Avatars",
                        "avatars_desc": "Create AI coaches based on your real philosophy, rules, and boundaries.",
                        "intelligence_title": "Smart nutrition intelligence",
                        "intelligence_desc": "Automated meal building, ingredient scoring, and daily insights — grounded in nutrition logic, not guesswork.",
                        "live_title": "Live client intelligence",
                        "live_desc": "Track adherence, trends, and progress signals in real time across your audience.",
                        "workspace_title": "One professional workspace",
                        "workspace_desc": "Clients, programs, subscriptions, and communication — all in one place."
                    },
                    "trusted_by": "Trusted by leading nutritionists"
                }
            }
        }
    },
    he: {
        translation: {
            "dashboard": "לוח בקרה",
            "products": {
                "title": "מאגר מוצרים",
                "search_placeholder": "חיפוש מוצרים...",
                "filter_placeholder": "סינון לפי קטגוריה",
                "total_products": "מציג {{count}} מתוך {{total}} מוצרים",
                "no_products": "לא נמצאו מוצרים",
                "loading": "טוען מוצרים...",
                "table": {
                    "product": "מוצר",
                    "barcode": "ברקוד",
                    "category": "קטגוריה",
                    "calories": "קלוריות",
                    "protein": "חלבון"
                },
                "details": {
                    "back_to_list": "חזרה לרשימה",
                    "not_found": "מוצר לא נמצא",
                    "loading": "טוען פרטי מוצר...",
                    "no_image": "אין תמונה",
                    "per_100g": "ערכים ל-100 גרם",
                    "raw_data": "מקור נתונים גולמי",
                    "unknown_brand": "מותג לא ידוע",
                    "unknown_category": "ללא קטגוריה"
                }
            },
            "stats": {
                "total_products": 'סה"כ מוצרים',
                "with_nutrition": "עם ערכים תזונתיים",
                "data_source": "מקור נתונים",
                "categories": "קטגוריות"
            },
            "settings": {
                "title": "הגדרות",
                "general": "כללי",
                "language": "שפה",
                "select_language": "בחר שפה",
                "theme": "ערכת נושא"
            },
            "common": {
                "loading": "טוען...",
                "save": "שמור",
                "cancel": "ביטול",
                "edit": "ערוך",
                "delete": "מחק"
            },
            "nav": {
                "dashboard": "לוח בקרה",
                "products": "מאגר מוצרים",
                "coaches": "עורך מאמנים",
                "clients": "רשימת לקוחות",
                "settings": "הגדרות"
            },
            "clients": {
                "title": "רשימת לקוחות",
                "search_placeholder": "חיפוש לקוחות...",
                "all_coaches": "כל המאמנים",
                "all_statuses": "כל הסטטוסים",
                "add_client": "הוסף לקוח",
                "status_active": "פעיל",
                "status_paused": "מושהה",
                "status_completed": "הושלם",
                "no_clients_found": "לא נמצאו לקוחות",
                "table": {
                    "name": "שם",
                    "status": "סטטוס",
                    "coach": "מאמן",
                    "joined": "תאריך הצטרפות"
                }
            },
            "coaches": {
                "title": "עורך מאמנים",
                "save_draft": "שמור טיוטה",
                "publish": "פרסם",
                "tabs": {
                    "identity": "זהות ונראות",
                    "behavior": "מנוע התנהגות",
                    "programs": "תוכניות",
                    "voice": "קול וטון",
                    "quests": "משימות ומשחוק",
                    "simulate": "סימולציה",
                    "share": "שתף"
                },
                "messages": {
                    "loading": "טוען מאמנים...",
                    "error_load": "שגיאה בטעינת מאמנים",
                    "success_save": "המאמן עודכן בהצלחה",
                    "error_save": "שגיאה בשמירת השינויים"
                }
            },
            "coach_identity": {
                "core_identity": "זהות ליבה",
                "visual_brand": "מותג ויזואלי",
                "coach_name": "שם המאמן",
                "coach_name_placeholder": "הכנס שם מאמן",
                "coach_name_hint": "השם הציבורי שיוצג ללקוחות שלך.",
                "descriptor": "תיאור קצר",
                "descriptor_placeholder": "לדוגמה: מומחה תזונה",
                "descriptor_hint": "משפט קצר המתאר את אישיות המאמן.",
                "avatar_label": "תמונת פרופיל",
                "upload": "העלאה",
                "image_url_label": "כתובת תמונה",
                "image_url_placeholder": "הדבק כתובת כאן",
                "image_url_hint": "גודל מומלץ: 512x512px. PNG או JPG.",
                "theme_color": "צבע ראשי",
                "accent_color": "צבע משני",
                "preview_title": "תצוגה מקדימה",
                "preview_desc": "ראה איך השינויים נראים באפליקציית הלקוח.",
                "launch_simulator": "הפעל סימולטור"
            },
            "coach_behavior": {
                "title": "מנוע התנהגות",
                "description": "התאם את תכונות האישיות והלוגיקה ההתנהגותית של המאמן. ערכים אלו משפיעים ישירות על יצירת השפה וקבלת ההחלטות.",
                "view_docs": "צפה בתיעוד",
                "personality_matrix": "מטריצת אישיות",
                "sliders": {
                    "strictness": "קפדנות",
                    "protein_priority": "עדיפות לחלבון",
                    "hydration_emphasis": "דגש על שתייה",
                    "encouragement": "עידוד",
                    "technicality": "רמה טכנית",
                    "directness": "ישירות",
                    "lenient": "גמיש",
                    "rigid": "נוקשה",
                    "standard": "רגיל",
                    "aggressive": "אגרסיבי",
                    "minimal": "מינימלי",
                    "frequent": "תדיר",
                    "stoic": "מאופק",
                    "hyper": "נלהב",
                    "simple": "פשוט",
                    "scientific": "מדעי",
                    "nuanced": "מרומז",
                    "blunt": "ישיר"
                },
                "triggers_title": "טריגרים התנהגותיים",
                "notification_freq": {
                    "label": "תדירות התראות",
                    "hint": "באיזו תדירות המאמן יפנה למשתמש?",
                    "options": {
                        "low": "נמוכה (1-2 ביום)",
                        "medium": "בינונית (3-4 ביום)",
                        "high": "גבוהה (6+ ביום)",
                        "realtime": "בזמן אמת (לפי הקשר)"
                    }
                },
                "forgiveness_factor": {
                    "label": "מקדם סלחנות",
                    "hint": "רמת הסובלנות לחריגות או פספוס דיווחים.",
                    "options": {
                        "strict": "קשוח (אזהרה מיידית)",
                        "balanced": "מאוזן (תקופת חסד)",
                        "lenient": "סלחן (התערבות מושהית)"
                    }
                },
                "checkin_style": {
                    "label": "סגנון צ'ק-אין",
                    "hint": "הטון המשמש בשיחות סיכום יום.",
                    "options": {
                        "aggressive": "אגרסיבי (ממוקד מדדים)",
                        "supportive": "תומך (ממוקד רגש)",
                        "passive": "פסיבי (צפייה בלבד)"
                    }
                },
                "reset_defaults": "אפס לברירת מחדל",
                "update_logic": "עדכן לוגיקת מנוע"
            },
            "coach_programs": {
                "title": "הגדרת תוכניות",
                "description": "נהל וערוך את תוכניות התזונה המובנות ללקוחות.",
                "enable_programs": "הפעל תוכניות",
                "enable_hint": "הפוך את לשונית התוכניות לגלויה למשתמשי הקצה באפליקציה.",
                "your_programs": "התוכניות שלך",
                "manage_all": "נהל הכל",
                "delete": "מחק",
                "add_new": "הוסף תוכנית חדשה",
                "create_modal": {
                    "title": "יצירת תוכנית חדשה",
                    "basic_info": "מידע בסיסי",
                    "program_title": "שם התוכנית",
                    "program_title_placeholder": "לדוגמה: פרוטוקול איפוס מהיר",
                    "description": "תיאור",
                    "description_placeholder": "תאר בקצרה את מטרת התוכנית...",
                    "duration": "משך זמן",
                    "days": "ימים",
                    "weeks": "שבועות",
                    "months": "חודשים",
                    "educational_content": "תוכן לימודי",
                    "video_lessons": "סה\"כ שיעורי וידאו",
                    "program_phases": "שלבי התוכנית",
                    "add_phase": "הוסף שלב",
                    "phase_name_placeholder": "שם שלב {{index}}",
                    "visual_identity": "זהות ויזואלית",
                    "cancel": "ביטול",
                    "create": "צור תוכנית"
                },
                "card_1": {
                    "title": "פרוטוקול איפוס מהיר",
                    "desc": "אתחול מטבולי מבוסס AI",
                    "structure": "מבנה",
                    "phases": ["ניקוי", "הזנה מחדש", "שימור"]
                },
                "card_2": {
                    "title": "תדלוק סיבולת",
                    "desc": "סייקלינג פחמימות לביצועים גבוהים",
                    "structure": "מבנה",
                    "phases": ["בסיס", "בנייה", "שיא", "טייפר"]
                },
                "card_3": {
                    "title": "שיקום בריאות המעי",
                    "desc": "תוכנית לשיקום המיקרוביום",
                    "structure": "מבנה",
                    "phases": ["אלימינציה", "החזרה הדרגתית"]
                }
            },
            "coach_voice": {
                "title": "קול וטון",
                "description": "הגדר את הסגנון הלשוני ודפוסי התקשורת של המאמן.",
                "voice_personalization": "התאמה אישית של הקול",
                "base_tone": {
                    "label": "טון בסיסי",
                    "hint": "מגדיר את סגנון התקשורת הבסיסי להודעות.",
                    "options": {
                        "calm": "רגוע ומרגיע",
                        "direct": "ישיר ולעניין",
                        "motivational": "אנרגטי ומוטיבציוני",
                        "friendly": "חברותי ושיחתי",
                        "professional": "מקצועי ורשמי"
                    }
                },
                "primary_language": {
                    "label": "שפה ראשית",
                    "hint": "שפת ברירת המחדל לכל תקשורת המאמן.",
                    "options": {
                        "en": "אנגלית",
                        "es": "ספרדית",
                        "fr": "צרפתית",
                        "de": "גרמנית",
                        "it": "איטלקית",
                        "pt": "פורטוגזית"
                    }
                },
                "response_length": {
                    "label": "אורך תשובה",
                    "hint": "אורך ממוצע של תשובות המאמן לשאילתות משתמש.",
                    "options": {
                        "concise": "תמציתי (1-2 משפטים)",
                        "balanced": "מאוזן (2-4 משפטים)",
                        "detailed": "מפורט (צורת פסקה)"
                    }
                },
                "emoji_usage": {
                    "label": "שימוש באימוג'י",
                    "hint": "באיזו תדירות המאמן משתמש באימוג'י בהודעות.",
                    "options": {
                        "none": "ללא (טקסט בלבד)",
                        "minimal": "מינימלי (מדי פעם)",
                        "moderate": "מתון (מאוזן)",
                        "frequent": "תדיר (כל הודעה)"
                    }
                },
                "language_model": {
                    "label": "מודל שפה",
                    "hint": "מודל ה-AI שמפעיל את תשובות המאמן.",
                    "active": "פעיל כעת"
                },
                "advanced_settings": {
                    "title": "הנדסת פרומפטים מתקדמת",
                    "coming_soon": "בקרוב",
                    "system_prompt": "תבנית פרומפט מערכת",
                    "system_prompt_hint": "פרומפט מערכת מותאם למשתמשים מתקדמים (v2.0)",
                    "vocabulary": "העדפות אוצר מילים",
                    "vocabulary_hint": "מונחים וביטויים מועדפים למאמן זה (v2.0)",
                    "forbidden": "מילים אסורות",
                    "forbidden_hint": "מילים שהמאמן צריך להימנע מלהשתמש בהן (v2.0)"
                },
                "example_messages": {
                    "title": "הודעות לדוגמה",
                    "hint": "תצוגה מקדימה של תשובות המאמן עם ההגדרות הנוכחיות",
                    "protein_hack": "תרחיש: משתמש פספס יעד חלבון",
                    "streak_hack": "תרחיש: משתמש השיג רצף שבועי"
                }
            },
            "coach_gamification": {
                "title": "משימות ומשחוק",
                "description": "ניהול נקודות, רצפים ותוכן משימות ללקוחות.",
                "enable": "הפעל משחוק",
                "enable_hint": "מתג ראשי לכל תכונות המשחוק באפליקציית הלקוח.",
                "config_logic": "לוגיקת תצורה",
                "points_system": "מערכת נקודות",
                "log_meal": "רישום ארוחה",
                "hit_protein": "עמידה ביעד חלבון",
                "drink_water": "שתיית 2 ליטר מים",
                "streak_rules": "חוקי רצף",
                "validation_interval": "מרווח אימות",
                "grace_period": "תקופת חסד",
                "intervals": ["צ'ק-אין יומי", "עמידה שבועית", "ביקורת דו-שבועית"],
                "grace_periods": ["0 ימים (ללא הקלות)", "יום אחד הקלה", "יומיים הקלה", "שלושה ימי הקלה"],
                "content_management": "ניהול תוכן",
                "new_content": "תוכן חדש",
                "achievement_badges": "תגי הישגים",
                "manage_all": "נהל הכל",
                "badges": {
                    "fire_starter": { "title": "מדליק האש", "desc": "רצף 7 ימים" },
                    "macro_master": { "title": "אלוף המאקרו", "desc": "שבוע מושלם" },
                    "early_bird": { "title": "משכים קום", "desc": "רישום לפני 8 בבוקר" }
                },
                "add_badge": "הוסף תג",
                "active_quests": "משימות פעילות",
                "new_quest": "משימה חדשה",
                "quests": {
                    "protein": { "title": "שבוע הכוח (חלבון)", "desc": "מסתיים בעוד 3 ימים", "status": "פעיל" },
                    "hydration": { "title": "גיבור הרוויה", "desc": "מתמשך", "status": "פעיל" },
                    "meal_prep": { "title": "אלוף הכנות האוכל", "desc": "שלב תזמון", "status": "טיוטה" }
                },
                "footer": {
                    "last_saved": "נשמר לאחרונה לפני 2 דקות",
                    "active_participants": "124 משתתפים פעילים",
                    "preview_app": "תצוגה מקדימה לאפליקציה",
                    "view_docs": "צפה בתיעוד"
                }
            },
            "coach_simulate": {
                "title": "בדיקה ותצוגה מקדימה של סימולציה",
                "description": "הגדר תרחישים וצפה בתגובת המאמן בזמן אמת.",
                "history": "היסטוריה",
                "export": "ייצוא",
                "context": "הקשר סימולציה",
                "select_scenario": "בחר תרחיש",
                "scenarios": {
                    "missed": "תמיכה באימון שחמצ",
                    "protein": "הושג יעד חלבון גבוה",
                    "binge": "תגובה לאכילה רגשית",
                    "holiday": "תכנון נסיעה לחג",
                    "plateau": "ייעוץ לעצירה במשקל (פלטו)"
                },
                "user_profile": "פרופיל משתמש נוכחי",
                "edit_json": "ערוך JSON",
                "data": {
                    "protein": "חלבון יומי",
                    "streak": "רצף",
                    "goal_type": "סוג מטרה",
                    "mood_score": "ציון מצב רוח"
                },
                "add_field": "הוסף שדה נתונים",
                "generate": "צור תשובה",
                "preview_title": "תצוגת מאמן",
                "live_mode": "מצב תצוגה חיה",
                "encouraging_tone": "טון מעודד",
                "user_msg": "\"פספסתי את האימון היום ואני מרגיש די אשם. גם חרגתי קצת בפחמימות. מה כדאי לעשות בשאר היום?\"",
                "coach_msg_1": "היי! קודם כל, לנשום עמוק. אימון אחד שחמץ לא מגדיר את ההתקדמות שלך. עמדת ביעדי החלבון 12 ימים ברציפות — זו עקביות ממהימה שלא נעלמת בגלל יום אחד.",
                "coach_msg_2": "להמשך היום, אל תנסה 'להרעיב' את עצמך כדי לפצות על הפחמימות. פשוט תתמקד בחלבון איכותי ושתייה. נחזור לתוכנית מחר. זכור, זה מרתון, לא ספרינט! 🏃‍♂️",
                "coach_msg_3": "תרצה שאתאים את לו\"ז האימונים שלך לשאר השבוע כדי להשלים את האימון?",
                "ai_coach": "מאמן AI • עכשיו",
                "end_simulation": "סוף סימולציה",
                "input_placeholder": "הקלד הודעת המשך לבדיקה...",
                "input_hint": "הקלט מושבת במצב 'סימולציית תרחיש'. לחץ על 'צור' כדי להתחיל מחדש עם הקשר חדש."
            },
            "coach_share": {
                "title": "שתף את המאמן שלך",
                "description": "קדם את מאמן התזונה ה-AI שלך ברשתות החברתיות והגדל את קהל הלקוחות עם קישורים ותבניות מוכנים לשימוש.",
                "link_card": {
                    "title": "קישור לשיתוף",
                    "label": "כתובת המאמן שלך",
                    "copied": "הועתק",
                    "copy_link": "העתק קישור",
                    "toast_copied": "הועתק ללוח!"
                },
                "social": {
                    "title": "קדם ברשתות חברתיות"
                },
                "templates": {
                    "title": "תבניות פוסטים",
                    "customize": "התאם אישית הכל",
                    "enthusiast": {
                        "label": "הנלהב",
                        "text": "\"חדשות מרגשות! 🚀 הרגע השקתי את מאמן התזונה ה-AI שלי כדי לעזור לכם להגיע ליעדי הבריאות מהר יותר. קבלו תוכניות תזונה והכוונה אישית 24/7. התחילו את המסע כאן: {{url}}\""
                    },
                    "professional": {
                        "label": "המקצוען",
                        "text": "\"שמח להציג את פלטפורמת התזונה החדשה שלי מבוססת AI. בשילוב מדע נתונים עם המומחיות התזונתית שלי, הכלי מציע תמיכה ללקוחות 24/7. לינק בביו לפרטים.\""
                    }
                },
                "mobile_preview": {
                    "rating": "דירוג",
                    "clients": "לקוחות",
                    "status": "סטטוס",
                    "active": "פעיל",
                    "about": "אודות",
                    "about_text": "אני מתמחה בירידה במשקל בת קיימא ותזונה לביצועים. עוזר ה-AI שלי מאומן על פי המתודולוגיה שלי לספק לכם תמיכה 24/7.",
                    "latest_plans": "תוכניות אחרונות",
                    "cta": "התחל אימון",
                    "powered_by": "מופעל ע\"י Coach.ai",
                    "live_preview": "תצוגה מקדימה חיה"
                }
            },
            "auth": {
                "login": {
                    "title": "ברוך שובך, מאמן",
                    "subtitle": "היכנס ללוח הבקרה לניהול התקדמות הלקוחות ותוכניות התזונה.",
                    "email_label": "כתובת אימייל",
                    "email_placeholder": "coach@tritstudio.com",
                    "password_label": "סיסמה",
                    "forgot_password": "שכחת סיסמה?",
                    "password_placeholder": "••••••••",
                    "remember_me": "זכור אותי ל-30 יום",
                    "sign_in_button": "התחבר",
                    "or_continue_with": "או המשך עם",
                    "google_account": "חשבון Google",
                    "dont_have_account": "אין לך חשבון?",
                    "apply_access": "הגש בקשה לגישה מוקדמת"
                },
                "register": {
                    "step_1": "שלב 1 מתוך 3",
                    "account_details": "פרטי חשבון",
                    "full_name_label": "שם מלא",
                    "full_name_placeholder": "ישראל ישראלי",
                    "professional_email_label": "אימייל מקצועי",
                    "email_placeholder": "john@nutritionist.com",
                    "password_label": "סיסמה",
                    "password_placeholder": "••••••••",
                    "password_strength_text": "מינימום 8 תווים עם שילוב של אותיות ומספרים.",
                    "i_agree": "אני מסכים ל",
                    "terms_service": "תנאי השימוש",
                    "and": "ו",
                    "privacy_policy": "מדיניות הפרטיות",
                    "create_account": "צור חשבון",
                    "already_have_account": "כבר יש לך חשבון?",
                    "log_in": "התחבר",
                    "support": "תמיכה"
                },
                "errors": {
                    "sign_in": "ההתחברות נכשלה",
                    "create_account": "יצירת החשבון נכשלה"
                },
                "alt": {
                    "logo": "לוגו Trit Studio",
                    "hero_image": "רקע תאום דיגיטלי תזונתי",
                    "coach_avatar": "אווטאר מאמן"
                },
                "hero": {
                    "tagline": "העתיד של תזונה מבוססת AI",
                    "headline": "בנה את התאום הדיגיטלי התזונתי שלך",
                    "description": "Trit Studio מאפשר לתזונאים ויוצרים להפוך את המומחיות שלהם למאמני AI סקיילביליים — מבלי לאבד שליטה, אמינות או יחס אישי.",
                    "features": {
                        "avatars_title": "אווטארים מבוססי מומחה",
                        "avatars_desc": "צור מאמני AI המבוססים על הפילוסופיה, החוקים והגבולות האמיתיים שלך.",
                        "intelligence_title": "אינטליגנציה תזונתית חכמה",
                        "intelligence_desc": "בניית ארוחות אוטומטית, דירוג רכיבים ותובנות יומיות — מבוסס על היגיון תזונתי, לא ניחושים.",
                        "live_title": "מודיעין לקוחות חי",
                        "live_desc": "עקוב אחר היענות, מגמות ואותות התקדמות בזמן אמת בקרב הקהל שלך.",
                        "workspace_title": "סביבת עבודה מקצועית אחת",
                        "workspace_desc": "לקוחות, תוכניות, מנויים ותקשורת — הכל במקום אחד."
                    },
                    "trusted_by": "בשימוש על ידי התזונאים המובילים"
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
