import React, {useEffect, useState} from 'react';
import {
    Button,
    Grid,
    IconButton,
    styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useUploadSomeDataMutation} from '../../../../redux/slices/home';
import styles from './add-carousel-form.module.scss';
import LabelForm from '../../../../common/form-label';
import InputForm from '../../../../common/form-input';
import {FiEdit} from "react-icons/fi";

const INITIAL_FORM_OBJECT = {
    id: '',
    title: '',
    description: '',
    order: 0,
    active: false,
    image: '',
    action: '',
};
const AddCarousalForm = ({
                             onClose,
                             onAddData,
                         }: {
    onClose: () => void;
    onAddData: (data: any) => void;

}) => {
    const [formData, setFormData] = useState(INITIAL_FORM_OBJECT);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();


    const [uploadSomeData] = useUploadSomeDataMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const generatedId = Date.now();
        const newDataItem = {...formData, id: generatedId};
        onAddData(newDataItem);
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData: any) => ({...prevData, [name]: value}));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = generateImageUrlOrPath(file);

            if (imageUrl !== undefined) {
                setFormData((prevData: any) => ({...prevData, image: imageUrl}));
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
            <Grid
                className={styles.modalHeader}
                item
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <h2 style={{margin: 0, fontSize: 24, fontWeight: 600}}>
                    Add Item
                </h2>
                <IconButton onClick={onClose} aria-label="close" style={{padding: '5px', background: '#E5E7EB'}}>
                    <CloseIcon/>
                </IconButton>
            </Grid>

            <Grid
                container
                className={styles.uploadBtn}
                justifyContent="flex-between"
            >
                <Grid item position="relative">
                    <div className={styles.editImageMain}>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon/>}
                            className={styles.editImageIcon}
                        >
                            <VisuallyHiddenInput type="file" onChange={handleImageChange}/>
                        </Button>
                    </div>
                </Grid>

                <Grid item>
                    {imagePreviewUrl ? (
                        <img
                            src={imagePreviewUrl}
                            alt="uploaded img preview"
                            style={{
                                height: '84px',
                                width: '84px',
                                objectFit: 'cover',
                                borderRadius: 6,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                height: '84px',
                                width: '84px',
                                border: '1px solid #ccc',
                                borderRadius: 6,
                            }}
                        >
                        </div>
                    )}
                </Grid>
            </Grid>

            <div className='formGroup'>
                <LabelForm labelText="כותרת"/>
                <InputForm type="text" placehloder='Enter title here' name='title' onChange={handleInputChange}
                           value={formData.title} id='title'/>
            </div>

            <div className='formGroup'>
                <LabelForm labelText="כתובת אתר"/>
                <InputForm
                    name='action'
                    value={formData.action}
                    onChange={handleInputChange}
                    type='url'
                    placehloder='Enter button url here'
                    id='action'/>
            </div>

            <div className='formGroup'>
                <LabelForm labelText="סדר"/>
                <InputForm
                    name='order'
                    value={formData.order}
                    onChange={handleInputChange}
                    type='number'
                    placehloder='Enter order here'
                    id='order'/>
            </div>

            <Grid display={'flex'} justifyContent={'center'} className='formGroup'>
                <Button
                    variant="contained"
                    className="primary-btn btn-round"
                    type="submit"
                    color="success"
                >
                    Add Data
                </Button>
            </Grid>
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

export default AddCarousalForm;
