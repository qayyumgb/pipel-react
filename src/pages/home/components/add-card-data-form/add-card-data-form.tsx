import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import cardJson from '../../../../constants/card-data.json';
import { useUploadSomeDataMutation } from '../../../../redux/slices/home';




// -----------------------------------------------------------------------------------------------------------------------


const AddCardDataForm = ({ onClose, onAddData }: { onClose: () => void; onAddData: (data: any) => void }) => {
    const initialFormData = {
        title: '',
        description: '',
        order: '',
        active: false,
        action: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [uploadSomeData] = useUploadSomeDataMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const generatedId = Date.now();
        const newDataItem = { id: generatedId, ...formData };
        const newData = [...cardJson, newDataItem];

        console.log(newData);
        setFormData(initialFormData);
        const payload = {
            // create a payload for submitting form
        }

        try {
            await uploadSomeData({ payload: payload });

            // show some toast or snackbar message for success

            // Success, so close the modal
            onClose();

        } catch (error) {
            console.log('error while adding form data', error);
        } finally {
            // incase if loader used, stop it here
        }

        onAddData(newDataItem);
        onClose();
    };




    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginTop: 0 }}>Add Item</h2>

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
                Add Data
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

export default AddCardDataForm;