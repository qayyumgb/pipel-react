import React, { useEffect, useState } from 'react';

import {
  Button,
  Grid,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useUploadSomeDataMutation } from '../../../../redux/slices/home';
import styles from './add-card-data-form.module.scss';
import LabelForm from '../../../../common/form-label';
import InputForm from '../../../../common/form-input';
import InputTextarea from '../../../../common/form-textarea';

const AddPostForm = ({
  onClose,
  onAddData,
  formMode,
  initialFormObject,
  onUpdateData,
}: {
  onClose: () => void;
  onAddData: (data: any) => void;
  onUpdateData: (data: any) => void;
  formMode: string;
  initialFormObject: any;
}) => {
  const [formData, setFormData] = useState(initialFormObject);


  useEffect(() => {

  }, [initialFormObject]);
  const [uploadSomeData] = useUploadSomeDataMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formMode === 'Add') {
      const generatedId = Date.now();
      const newDataItem = { ...formData, id: generatedId };
      onAddData(newDataItem);
    } else {
      onUpdateData(formData);
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
        className={styles.modalHeader}
        item
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
          {formMode} Item
        </h2>
        <IconButton onClick={onClose} aria-label="close" style={{ padding: '5px', background: '#E5E7EB' }}>
          <CloseIcon />
        </IconButton>
      </Grid>

      <div className='formGroup'>
        <LabelForm labelText="כותרת" />
        <InputForm type="text" placehloder='Enter title here' name='title' onChange={handleInputChange} value={formData.title} id='title' />
      </div>

      <div className='formGroup'>
        <LabelForm labelText="טקסט" />
        <InputTextarea
          name="description"
          value={formData.description}
          id="description"
          placehloder="Enter description here"
          onChange={handleInputChange} />
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
          {formMode} Data
        </Button>
      </Grid>
    </form>
  );
};

export default AddPostForm;
