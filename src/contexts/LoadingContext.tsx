import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';

interface LoadingDialogState {
    visible: boolean;
    header: string;
    description: string;
}

interface LoadingDialogContextType {
    showLoadingDialog: (header: string, description: string) => void;
    hideLoadingDialog: () => void;
}

const LoadingDialogContext = createContext<LoadingDialogContextType | undefined>(undefined);

export const LoadingDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dialogState, setDialogState] = useState<LoadingDialogState>({
        visible: false,
        header: '',
        description: '',
    });

    const showLoadingDialog = (header: string, description: string) => {
        setDialogState({ visible: true, header, description });
    };

    const hideLoadingDialog = () => {
        setDialogState({ visible: false, header: '', description: '' });
    };

    return (
        <LoadingDialogContext.Provider value={{ showLoadingDialog, hideLoadingDialog }}>
            <Dialog
                header={dialogState.header}
                closable={false}
                visible={dialogState.visible}
                style={{ width: 'fit-content' }}
                onHide={() => hideLoadingDialog()}
                className='text-center'
            >
                <div className='grid place-content-center mb-4'>
                    <ProgressSpinner
                        style={{ width: '50px', height: '50px' }}
                        strokeWidth="8"
                        fill="var(--surface-ground)"
                        animationDuration=".5s"
                        className='animate-pulse'
                    />
                </div>
                <p className="m-0 text-center animate-pulse">{dialogState.description}</p>
            </Dialog>
            {children}
        </LoadingDialogContext.Provider>
    );
};

export const useLoadingDialog = (): LoadingDialogContextType => {
    const context = useContext(LoadingDialogContext);
    if (!context) {
        throw new Error('useLoadingDialog must be used within a LoadingDialogProvider');
    }
    return context;
};