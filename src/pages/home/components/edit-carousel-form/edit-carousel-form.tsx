import React, { useState, useEffect } from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    styled,
} from '@mui/material';
import styles from "./edit-carousel-form.module.scss";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useUpdateEditDataMutation } from '../../../../redux/slices/home';
const EditCarousalForm = ({
    onClose,
    onEditData,
    initialData,
}: {
    onClose: () => void;
    onEditData: (data: any) => void;
    initialData: any;
}) => {
    const [formData, setFormData] = useState(initialData);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(
        initialData.image
    );

    const [updateEditData] = useUpdateEditDataMutation(); // Update the hook based on your actual mutation function

    useEffect(() => {
        setFormData(initialData);
        setImagePreviewUrl(initialData.image);
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateEditData({ payload: formData });

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
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = generateImageUrlOrPath(file);

            if (imageUrl !== undefined) {
                setFormData((prevData: any) => ({ ...prevData, image: imageUrl }));
                setImagePreviewUrl(imageUrl);
            } else {
                console.error('Failed to generate image URL');
            }
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginTop: 0 }}>Edit Item</h2>

            <Grid container className={styles.uploadBtn} justifyContent="flex-between">
                <Grid xs={4}>
                    <Button
                        component="label"
                        sx={{ marginBottom: 2 }}
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                    </Button>
                </Grid>

                <Grid xs={8}>
                    {imagePreviewUrl && (
                        <img
                            src={imagePreviewUrl}
                            alt="uploaded img preview"
                            style={{ height: '120px', objectFit: 'contain', borderRadius: 6 }}
                        />
                    )}
                </Grid>
            </Grid>

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

function generateImageUrlOrPath(file: File): string | undefined {
    try {
        const imageUrl = URL.createObjectURL(file);
        return imageUrl;
    } catch (error) {
        console.error('Failed to generate image URL', error);
        return undefined;
    }
}

export default EditCarousalForm;
