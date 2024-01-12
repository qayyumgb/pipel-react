import React, { useState, useEffect } from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@mui/material';
// import styles from "./card-data-edit-form.module.scss";
import { useUpdateEditDataMutation } from '../../../../redux/slices/home';
const CardDataEdit = ({
    onClose,
    onEditData,
    initialData,
    updateLocalCheckboxState
}: {
    onClose: () => void;
    onEditData: (data: any) => void;
    initialData: any;
    updateLocalCheckboxState: (itemId: string, checked: boolean) => void;
}) => {
    const [formData, setFormData] = useState(initialData);

    const [updateEditData] = useUpdateEditDataMutation(); // Update the hook based on your actual mutation function

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateEditData({ payload: formData });
            console.log("Updated Card Data Item ------>>>")

            // show some toast or snackbar message for success

            // Success, so close the modal
            onClose();
        } catch (error) {
            console.log('error while editing form data', error);
        } finally {
            // incase if loader used, stop it here
        }

        onEditData(formData);
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prevData: any) => ({ ...prevData, [name]: checked }));

        updateLocalCheckboxState(formData.id, checked);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginTop: 0 }}>Edit Card Item</h2>

            <TextField
                sx={{ width: '100%', marginBottom: 2 }}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
            />
            <TextField
                sx={{ width: '100%', marginBottom: 2 }}
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
            />

            <TextField
                sx={{ width: '100%', marginBottom: 2 }}
                id="outlined-basic"
                label="Button Url"
                variant="outlined"
                name="action"
                value={formData.action}
                onChange={handleInputChange}
                inputProps={{
                    type: 'url',
                }}
            />

            <TextField
                sx={{ width: '100%', marginBottom: 2 }}
                id="outlined-basic"
                label="Order"
                variant="outlined"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                inputProps={{
                    type: 'number',
                }}
            />

            <FormControlLabel
                sx={{ marginBottom: 2, width: '100%' }}
                control={
                    <Checkbox
                        checked={formData.active || false}
                        onChange={handleCheckboxChange}
                        name="active"
                    />
                }
                label="Active"
            />

            <Button variant="contained" className="primary-btn" type="submit" color="success">
                Update Data
            </Button>

            <Button
                variant="outlined"
                className="secondary-btn"
                type="button"
                sx={{ ml: 2 }}
                onClick={onClose}
                color="success"
            >
                Close
            </Button>
        </form>
    );
};

export default CardDataEdit;
