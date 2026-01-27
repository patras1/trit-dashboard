import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, UtensilsCrossed, Activity, Network, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Register = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) throw error;
            navigate('/');
        } catch (error) {
            const message = error instanceof Error ? error.message : t('auth.errors.create_account');
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen font-sans">
            {/* Left Section: Registration Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white dark:bg-[#171b1b] px-8 py-10 md:px-20 lg:px-24">
                {/* Branding Header */}
                <header className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3" aria-label={t('auth.alt.logo')}>
                        <div className="size-8 text-[#4a7874]" aria-hidden="true">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-[#131515] dark:text-white text-xl font-bold tracking-tight">Trit Studio</h2>
                    </div>
                    <LanguageSwitcher />
                </header>

                {/* Form Content */}
                <div className="max-w-md w-full mx-auto py-12">
                    {/* Step Header */}
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[#4a7874] font-bold text-sm tracking-wider">
                            {t('auth.register.step_1')}
                        </span>
                        <span className="text-gray-400 text-sm font-medium">
                            {t('auth.register.account_details')}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-gray-100 rounded-full mb-8 overflow-hidden">
                        <div className="h-full bg-[#4a7874] w-1/3 rounded-full"></div>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-center gap-3 border border-red-100">
                                <AlertCircle size={18} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[#131515] dark:text-gray-200 text-sm font-bold">
                                {t('auth.register.full_name_label')}
                            </label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full rounded-lg border border-[#dfe2e2] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#131515] dark:text-white h-12 px-4 focus:ring-2 focus:ring-[#4a7874]/20 focus:border-[#4a7874] outline-none transition-all placeholder:text-gray-300"
                                placeholder={t('auth.register.full_name_placeholder')}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[#131515] dark:text-gray-200 text-sm font-bold">
                                {t('auth.register.professional_email_label')}
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-[#dfe2e2] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#131515] dark:text-white h-12 px-4 focus:ring-2 focus:ring-[#4a7874]/20 focus:border-[#4a7874] outline-none transition-all placeholder:text-gray-300"
                                placeholder={t('auth.register.email_placeholder')}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[#131515] dark:text-gray-200 text-sm font-bold">
                                {t('auth.register.password_label')}
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-[#dfe2e2] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#131515] dark:text-white h-12 px-4 focus:ring-2 focus:ring-[#4a7874]/20 focus:border-[#4a7874] outline-none transition-all placeholder:text-gray-300"
                                placeholder={t('auth.register.password_placeholder')}
                            />
                            {/* Password Strength Meter */}
                            <div className="flex gap-2 mt-3">
                                <div className={`h-1 flex-1 rounded-full ${password.length > 0 ? 'bg-[#4a7874]' : 'bg-gray-200'}`}></div>
                                <div className={`h-1 flex-1 rounded-full ${password.length > 8 ? 'bg-[#4a7874]' : 'bg-gray-200'}`}></div>
                                <div className={`h-1 flex-1 rounded-full ${password.length > 10 ? 'bg-[#4a7874]' : 'bg-gray-200'}`}></div>
                                <div className={`h-1 flex-1 rounded-full ${password.length > 12 ? 'bg-[#4a7874]' : 'bg-gray-200'}`}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                {t('auth.register.password_strength_text')}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 py-1">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="size-5 rounded border-gray-300 text-[#4a7874] focus:ring-[#4a7874] transition-colors cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                                {t('auth.register.i_agree')} <a href="#" className="text-[#4a7874] hover:underline">{t('auth.register.terms_service')}</a> {t('auth.register.and')} <a href="#" className="text-[#4a7874] hover:underline">{t('auth.register.privacy_policy')}</a>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#4a7874] hover:bg-[#3d6360] text-white font-bold h-12 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? (
                                <span className="animate-spin text-xl">◌</span>
                            ) : (
                                <>
                                    <span>{t('auth.register.create_account')}</span>
                                    <UserPlus size={18} />
                                </>
                            )}
                        </button>

                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-[#f2f3f3] dark:border-gray-700"></div>
                            <span className="flex-shrink mx-4 text-[#6f7b7a] text-xs uppercase tracking-widest font-medium">
                                {t('auth.login.or_continue_with')}
                            </span>
                            <div className="flex-grow border-t border-[#f2f3f3] dark:border-gray-700"></div>
                        </div>

                        <button type="button" className="w-full flex items-center justify-center gap-3 border border-[#dfe2e2] dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#131515] dark:text-white font-semibold h-12 rounded-lg transition-colors">
                            <svg className="size-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                            </svg>
                            <span>{t('auth.login.google_account')}</span>
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#6f7b7a] dark:text-gray-400 mt-8">
                        {t('auth.register.already_have_account')}{' '}
                        <Link to="/login" className="text-[#4a7874] font-bold hover:underline">
                            {t('auth.register.log_in')}
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <footer className="flex justify-center gap-6 text-xs text-[#6f7b7a] dark:text-gray-500 font-medium">
                    <a className="hover:text-[#4a7874] transition-colors" href="#">
                        {t('auth.register.privacy_policy')}
                    </a>
                    <a className="hover:text-[#4a7874] transition-colors" href="#">
                        {t('auth.register.terms_service')}
                    </a>
                    <a className="hover:text-[#4a7874] transition-colors" href="#">
                        {t('auth.register.support')}
                    </a>
                </footer>
            </div>

            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#4a7874] items-center justify-center">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDU9uS3Q8cjWFHWyus3s-LPhyPl8QHyJVT6E1OtODMjEturMbjUa4HP9EgvqkMWS6-9w3VakrHJSYr35FJQyv8I77T0SzGO_YxaU-fljgkpLZluKNGYgXRNOaeF4aH0LGkdnr6wkI7Mfj7ZAEaV-ni8cODGPNX9zNG3E_RPNrQ_6M1v7ygvHm-Wo7XdX4sKsEwea4sQS3HQuPJ9DoTvjEqu92WawboE4MoF_CoP6fpJ8d8ul0M_zSmKWlZamsABBVy7t0rWWa5aEUQ')` }}
                >
                    {/* Overlay for depth */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Glassmorphic Content Panel */}
                <div className="relative z-10 max-w-lg w-full p-10 rounded-xl m-8 text-white bg-white/15 backdrop-blur-xl border border-white/20">
                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            {t('auth.hero.tagline')}
                        </span>
                        <h2 className="text-4xl font-black leading-tight tracking-tight mb-4">
                            {t('auth.hero.headline')}
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed">
                            {t('auth.hero.description')}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="bg-[#4a7874] size-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
                                <UtensilsCrossed className="text-white" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-base">
                                    {t('auth.hero.features.avatars_title')}
                                </h4>
                                <p className="text-white/70 text-sm">
                                    {t('auth.hero.features.avatars_desc')}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-[#4a7874] size-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
                                <Activity className="text-white" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-base">
                                    {t('auth.hero.features.intelligence_title')}
                                </h4>
                                <p className="text-white/70 text-sm">
                                    {t('auth.hero.features.intelligence_desc')}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-[#4a7874] size-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
                                <Network className="text-white" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-base">
                                    {t('auth.hero.features.live_title')}
                                </h4>
                                <p className="text-white/70 text-sm">
                                    {t('auth.hero.features.live_desc')}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-[#4a7874] size-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
                                <Activity className="text-white" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-base">
                                    {t('auth.hero.features.workspace_title')}
                                </h4>
                                <p className="text-white/70 text-sm">
                                    {t('auth.hero.features.workspace_desc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/20 flex items-center justify-between">
                        <div className="flex -space-x-2">
                            <img alt={t('auth.alt.coach_avatar')} className="size-8 rounded-full border-2 border-[#4a7874]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWP0BUfkR1dIsrRnX2IwvnK082y0A_aaUAhgk3pHe1jMWaKyemAUgUSQwxvcNXF1DCn6hp8vg_dFEv9cwogxwfi71_r25_jftAdlk7mwAoL4MBGIkLTtalRurXXvWx0LscDg9A_vYukkyW_PhC3SViGq5esz54-iN6Mk4rVQSdccqtNhIJrxlkOX4pCKehkEQsYRejVkVEeVSjcDOMhuLsBAFZB-LLQU1OLdLRTNcrCv6wjRc5z6zUf0uqyNfcXVaZZmbDygCgx7Q" />
                            <img alt={t('auth.alt.coach_avatar')} className="size-8 rounded-full border-2 border-[#4a7874]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClKOlQNncav9Au02X6zstLwUqIOM7-vQu99fU7h1fZf8CSVZmQFN5hWwd-GIzxUHxuDAMfQHxixmNXnbLw81tSwCpzmi8VCuOZ731p6KurtWe_yWyZJDwoT39DGat8dt4XMkP3GJLv55kkVwrK4j3dxqM_ibBtEaf-KssBufSkIHpS9Ov5cGBUs3g7A0b8fSOgIssINhmUTnQSjunANZOgHJuuzCnw4ygPRfwk7mBYwaOJeS2WkxvxPgB6LBEaGZz_Y3C31i1bBP2o8" />
                            <img alt={t('auth.alt.coach_avatar')} className="size-8 rounded-full border-2 border-[#4a7874]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQtpz-sfCr-yLAerBbVDvsbOWozGyjdGz0FEmCcI-JgCO8s-QqWiqO0njXFcAFh2UV5B9jq3YIBUgbOGFjxfjR4CzTC0O2MOuMZZ09wTUaWx-9qv4jg2hPbvmLSZsBhKII9UTqrBmuqgjGMdFbfoQJgEjTvisDyUapU6MPu4mgloSVXedOQoBLIZ6Tqd42f60eV1ptAWOcf-ps_mXCAIwvjj-lSCdn1Ienb0Dl-TQsP-gmS9MtBwZ38K_v8ALoXRv41YcwXIfEDoE" />
                            <div className="size-8 rounded-full border-2 border-[#4a7874] bg-[#4a7874] flex items-center justify-center text-[10px] font-bold text-white">+2k</div>
                        </div>
                        <p className="text-white/80 text-xs italic font-medium">
                            {t('auth.hero.trusted_by')}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};
