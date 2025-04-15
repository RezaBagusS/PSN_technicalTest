import React, { createContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

type Severity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';

interface ToastMessage {
    severity: Severity;
    summary: string;
    detail: string;
    life?: number;
}

interface ToastContextType {
    showToast: (message: ToastMessage) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const toast = useRef<Toast>(null);

    const showToast = ({ severity, summary = 'info', detail = 'This default message', life = 3000 }: ToastMessage) => {
        toast?.current?.show({ severity, summary, detail, life });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toast ref={toast} />
            {children}
        </ToastContext.Provider>
    );
};