import React from 'react';
import { Check } from 'lucide-react';

export const StepperSidebar = ({ steps, currentStep, onStepClick }) => {
    return (
        <div className="w-full md:w-72 bg-[#0F172A] text-white p-8 flex flex-col min-h-[600px]">
            <div className="mb-10">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Application Steps</h2>
                <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
            </div>

            <nav className="flex-1 space-y-8">
                {steps.map((step, idx) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;

                    return (
                        <div key={step.id} className="relative flex items-center gap-4 group cursor-default">
                            {/* Line connecting steps */}
                            {idx < steps.length - 1 && (
                                <div className={`absolute left-5 top-10 w-0.5 h-10 ${isCompleted ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
                            )}

                            {/* Step Number Circle */}
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 z-10
                                ${isCompleted ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' :
                                    isActive ? 'bg-blue-500 text-white ring-4 ring-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]' :
                                        'bg-slate-800 text-slate-500 border border-slate-700'}
                            `}>
                                {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                            </div>

                            {/* Step Text */}
                            <div className="flex flex-col">
                                <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                                    Step {step.id}
                                </span>
                                <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                    {step.title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* Agent Footer Info */}
            <div className="pt-10 mt-auto border-t border-slate-800/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold">
                    A
                </div>
                <div>
                    <p className="text-sm font-bold text-white leading-none">Agent Portal</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">ID: AGT-8829</p>
                </div>
            </div>
        </div>
    );
};
