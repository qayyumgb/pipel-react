import React from 'react';
import { Modal, Backdrop, Box, Fade, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface ModalWrapperProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ open, onClose, children }) => {
    const style ={
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
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