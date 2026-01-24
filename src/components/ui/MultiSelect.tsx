import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    label: string;
    value: string;
    count?: number;
}

interface MultiSelectProps {
    options: Option[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    label?: string;
}

export function MultiSelect({ options, selected, onChange, placeholder = 'בחר...', label }: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter(item => item !== value)
            : [...selected, value];
        onChange(newSelected);
    };

    return (
        <div className="relative" ref={containerRef}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full md:w-64 flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-right"
            >
                <ChevronDown className="h-4 w-4 text-gray-400" />
                <span className={`block truncate ml-2 ${selected.length === 0 ? 'text-gray-400' : 'text-gray-900'}`}>
                    {selected.length === 0
                        ? placeholder
                        : `${selected.length} נבחרו`}
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full md:w-64 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-right">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`cursor-pointer select-none relative py-2 px-3 hover:bg-emerald-50 ${selected.includes(option.value) ? 'bg-emerald-50' : ''}`}
                            onClick={() => toggleOption(option.value)}
                        >
                            <div className="flex items-center justify-between">
                                <span className={`block truncate ${selected.includes(option.value) ? 'font-semibold text-emerald-900' : 'font-normal text-gray-900'}`}>
                                    {option.label}
                                </span>
                                <div className="flex items-center">
                                    {option.count !== undefined && (
                                        <span className="text-xs text-gray-400 ml-2">
                                            ({option.count})
                                        </span>
                                    )}
                                    {selected.includes(option.value) && (
                                        <Check className="h-4 w-4 text-emerald-600" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
