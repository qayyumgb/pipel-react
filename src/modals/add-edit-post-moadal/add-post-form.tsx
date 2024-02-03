import React, { useEffect, useState } from 'react';
import {
    Button,
    Grid,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LabelForm from '../../common/form-label';
import InputForm from '../../common/form-input';

const INITIAL_FORM_OBJECT = {
    id: '',
    title: '',
    description: '',
    order: 0,
    active: false,
    action: '',
};

const AddPostForm = ({
    onClose,
    onAddData,
    onUpdateData,
    editMode = false,
    initialData = {},
}: {
    onClose: () => void;
    onAddData: (data: any) => void;
    onUpdateData: (data: any) => void;
    editMode?: boolean;
    initialData?: any;
}) => {
    const [formData, setFormData] = useState(
        editMode ? initialData : { ...INITIAL_FORM_OBJECT }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editMode) {
            onUpdateData(formData);
        } else {
            const generatedId = Date.now();
            const newDataItem = { ...formData, id: generatedId };
            onAddData(newDataItem);
        }
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid
                item
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
                    {editMode ? 'Edit Item' : 'Add Item'}
                </h2>
                <IconButton
                    onClick={onClose}
                    aria-label="close"
                    style={{ padding: '5px', background: '#E5E7EB' }}
                >
                    <CloseIcon />
                </IconButton>
            </Grid>

            <div className='formGroup'>
                <LabelForm labelText="כותרת" />
                <InputForm type="text" placehloder='Enter title here' name='title' onChange={handleInputChange}
                    value={formData.title} id='title' />
            </div>

            <div className='formGroup'>
                <LabelForm labelText="כותרת" />
                <InputForm type="text" placehloder='Enter description here' name='description' onChange={handleInputChange}
                    value={formData.description} id='title' />
            </div>

            <div className='formGroup'>
                <LabelForm labelText="כתובת אתר" />
                <InputForm
                    name='action'
                    value={formData.action}
                    onChange={handleInputChange}
                    type='url'
                    placehloder='Enter button url here'
                    id='action' />
            </div>

            <div className='formGroup'>
                <LabelForm labelText="סדר" />
                <InputForm
                    name='order'
                    value={formData.order}
                    onChange={handleInputChange}
                    type='number'
                    placehloder='Enter order here'
                    id='order' />
            </div>

            <Grid display={'flex'} justifyContent={'center'} className='formGroup'>
                <Button
                    variant="contained"
                    className="primary-btn btn-round"
                    type="submit"
                    color="success"
                >
                    {editMode ? 'Update Data' : 'Add Data'}
                </Button>
            </Grid>
        </form>
    );
};

export default AddPostForm;
