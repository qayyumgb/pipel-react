import * as React from 'react';
import {ReactElement} from 'react';
import Snackbar from '@mui/material/Snackbar';
import {Box, SnackbarContent} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface GlobalSnackbarProps {
    open: boolean;
    message: string;
    handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

const snackbarSx = {
    backgroundColor: '#F5F5F5',
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

export function GlobalSnackbar(props: GlobalSnackbarProps): ReactElement {
    const {open, message, handleClose} = props;

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            <SnackbarContent
                sx={snackbarSx}
                message={
                    <Box display="flex" alignItems="center" gap={"4px"}>
                        <CheckCircleIcon sx={{color: '#4CAF50'}}/>
                        <span>{message}</span>
                    </Box>
                }
            />
        </Snackbar>
    );
};

