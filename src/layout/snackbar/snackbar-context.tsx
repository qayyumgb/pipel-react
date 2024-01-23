import React, {createContext, PropsWithChildren, ReactElement, useCallback, useContext, useState} from 'react';
import {GlobalSnackbar} from './global-snackbar';

interface SnackbarContextType {
    showMessage: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({} as SnackbarContextType);

export const useSnackbar = () => useContext(SnackbarContext);


export function SnackbarProvider(props: PropsWithChildren): ReactElement {
    const {children} = props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const showMessage = useCallback((newMessage: string) => {
        setMessage(newMessage);
        setOpen(true);
    }, []);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{showMessage}}>
            {children}
            <GlobalSnackbar open={open} message={message} handleClose={handleClose}/>
        </SnackbarContext.Provider>
    );
};
