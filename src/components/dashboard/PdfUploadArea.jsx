import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, Loader2, CheckCircle2, AlertCircle, FileUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PdfUploadArea = ({ onExtract, isExtracting, token }) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const { toast } = useToast();

    const handleFile = useCallback((selectedFile) => {
        if (!selectedFile) return;

        if (selectedFile.type !== 'application/pdf') {
            toast({
                title: "Invalid file type",
                description: "Please upload a PDF policy document.",
                variant: "destructive"
            });
            return;
        }

        setFile(selectedFile);
        onExtract(selectedFile);
    }, [onExtract, toast]);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        handleFile(droppedFile);
    }, [handleFile]);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        handleFile(selectedFile);
    };

    const clearFile = () => {
        setFile(null);
    };

    return (
        <div className="space-y-4">
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={`
                    relative group border-2 border-dashed rounded-2xl p-6 transition-all duration-300
                    flex flex-col items-center justify-center text-center
                    ${isDragging ? 'border-blue-500 bg-blue-50/50 scale-[1.01]' : 'border-slate-200 bg-slate-50/30 hover:bg-slate-50/80 hover:border-slate-300'}
                    ${isExtracting ? 'opacity-70 pointer-events-none' : ''}
                `}
            >
                <input
                    type="file"
                    id="pdf-upload"
                    className="hidden"
                    accept=".pdf"
                    onChange={onFileChange}
                    disabled={isExtracting}
                />

                {isExtracting ? (
                    <div className="space-y-4 py-4 animate-in fade-in zoom-in duration-300">
                        <div className="relative">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                            </div>
                            <div className="absolute -inset-1 bg-blue-400/20 rounded-full animate-ping" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-800 uppercase tracking-widest">Extracting Data...</p>
                            <p className="text-xs text-slate-500 font-medium mt-1">Reading policy details with AI</p>
                        </div>
                    </div>
                ) : file ? (
                    <div className="space-y-4 py-2 animate-in slide-in-from-bottom-2 duration-300 w-full">
                        <div className="flex items-center justify-center gap-3">
                            <div className="p-3 bg-emerald-50 rounded-xl">
                                <FileText className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-slate-800 max-w-[200px] truncate">{file.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Ready to process</p>
                            </div>
                            <button
                                onClick={clearFile}
                                className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors ml-2"
                            >
                                <X className="w-4 h-4 text-slate-500" />
                            </button>
                        </div>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-9 px-6 rounded-lg border-emerald-200 text-emerald-600 hover:bg-emerald-50 font-bold text-xs"
                            onClick={() => onExtract(file)}
                        >
                            Retry Extraction
                        </Button>
                    </div>
                ) : (
                    <label
                        htmlFor="pdf-upload"
                        className="cursor-pointer space-y-4 py-4 w-full h-full block"
                    >
                        <div className="w-16 h-16 bg-white shadow-xl shadow-slate-200/50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                            <FileUp className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-800 uppercase tracking-widest">
                                Quick Fill via PDF
                            </p>
                            <p className="text-xs text-slate-500 font-medium mt-1">
                                Drag & drop policy document or <span className="text-blue-600 font-bold">browse</span>
                            </p>
                        </div>
                    </label>
                )}
            </div>

            {!file && !isExtracting && (
                <div className="flex items-center justify-center gap-2 px-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Supports LIC Policy Certificates & PDF Statements
                    </p>
                </div>
            )}
        </div>
    );
};
