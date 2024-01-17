import React from 'react';
import { Modal, Box, Fade } from '@mui/material';

interface ModalWrapperProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ open, onClose, children, maxWidth }) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: maxWidth,
        width: '100%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '12px',
        padding: '28px',
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition

        >
            <Fade in={open} >
                <Box
                    sx={{
                        ...style
                    }}
                >
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalWrapper;