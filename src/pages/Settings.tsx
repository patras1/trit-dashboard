import { useState } from 'react';
import { useDirection } from '../contexts/DirectionContext';
import { Languages, ChevronRight } from 'lucide-react';

export const SettingsPage = () => {
    const { direction, setDirection } = useDirection();
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleDirectionChange = (newDirection: 'ltr' | 'rtl') => {
        setDirection(newDirection);
        setMessage({ type: 'success', text: 'Direction changed successfully' });
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background-light">
            {/* Header */}
            <header className="border-b border-[#dfe2e2] bg-white px-8 py-3 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="text-primary">
                        <Languages size={24} />
                    </div>
                    <h2 className="text-text-main text-lg font-bold">Settings</h2>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {/* Toast Message */}
                {message && (
                    <div className={`fixed top-20 right-8 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 animate-in slide-in-from-right ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                <div className="max-w-4xl mx-auto w-full">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 mb-4">
                        <a className="text-text-muted text-sm font-medium hover:text-primary" href="#">Settings</a>
                        <ChevronRight size={14} className="text-text-muted" />
                        <span className="text-text-main text-sm font-semibold">Language & Direction</span>
                    </div>

                    {/* Page Heading */}
                    <div className="mb-8">
                        <h1 className="text-text-main text-4xl font-black tracking-tight mb-2">Language & Direction</h1>
                        <p className="text-text-muted text-lg leading-relaxed">
                            Configure the text direction and language settings for the application.
                        </p>
                    </div>

                    {/* Direction Setting */}
                    <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm mb-6">
                        <h3 className="font-bold text-lg text-text-main border-b border-[#dfe2e2] pb-4 mb-6 flex items-center gap-2">
                            <Languages size={20} className="text-primary" />
                            Text Direction
                        </h3>

                        <div className="space-y-4">
                            <p className="text-sm text-text-muted mb-4">
                                Choose the text direction for the entire application. This affects how text flows and UI elements are positioned.
                            </p>

                            {/* Direction Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* LTR Option */}
                                <button
                                    onClick={() => handleDirectionChange('ltr')}
                                    className={`p-4 rounded-lg border-2 transition-all text-left ${direction === 'ltr'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-[#dfe2e2] hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-text-main">Left-to-Right (LTR)</h4>
                                        {direction === 'ltr' && (
                                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-text-muted">English, Spanish, French, etc.</p>
                                    <div className="mt-3 p-2 bg-background-light rounded text-xs font-mono text-text-main" dir="ltr">
                                        Hello World → Sample Text
                                    </div>
                                </button>

                                {/* RTL Option */}
                                <button
                                    onClick={() => handleDirectionChange('rtl')}
                                    className={`p-4 rounded-lg border-2 transition-all text-left ${direction === 'rtl'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-[#dfe2e2] hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-text-main">Right-to-Left (RTL)</h4>
                                        {direction === 'rtl' && (
                                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-text-muted">Hebrew, Arabic, Persian, etc.</p>
                                    <div className="mt-3 p-2 bg-background-light rounded text-xs font-mono text-text-main" dir="rtl">
                                        שלום עולם ← טקסט לדוגמה
                                    </div>
                                </button>
                            </div>

                            {/* Current Status */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <div className="text-blue-600 mt-0.5">
                                        <Languages size={18} />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold text-blue-900 mb-1">Current Direction</h5>
                                        <p className="text-xs text-blue-700">
                                            The application is currently set to <strong>{direction.toUpperCase()}</strong> mode.
                                            {direction === 'rtl' ? ' Text flows from right to left.' : ' Text flows from left to right.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Settings Placeholder */}
                    <div className="bg-white border border-[#dfe2e2] p-6 rounded-xl shadow-sm opacity-75">
                        <div className="flex justify-between items-center mb-6 border-b border-[#dfe2e2] pb-4">
                            <h3 className="font-bold text-lg text-text-main">Additional Settings</h3>
                            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded font-mono">Coming Soon</span>
                        </div>
                        <p className="text-sm text-text-muted">
                            More configuration options will be available here in future updates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
