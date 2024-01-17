import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import AddIcon from '@mui/icons-material/Add';
import styles from './post-list.module.scss';
import { CardDataJson } from '../../../../interfaces/index';
import { useUploadSomeDataMutation } from '../../../../redux/slices/home';
import ModalWrapper from '../../../../common/modal';
import PreviewCardDataItem from '../preview-card-data/preview-card-data';
import flag1 from '../../../../assets/images/isreal.png';
import flag2 from '../../../../assets/images/usFlag.png';
import AddPostForm from '../add-card-data-form/add-card-data-form';
import PostAdded from '../card-data-added/card-data-added';

const PostList: React.FC = () => {
  const [isCarouselFormOpen, setIsCarouselFormOpen] = useState(false);
  const [initialFormObject, setInitialFormObject] = useState({
    id: '',
    title: '',
    description: '',
    order: '',
    active: false,
    action: '',
  });
  const [postData, setpostData] = useState<CardDataJson[]>([]);
  const [checkboxState, setCheckboxState] = useState<{
    [key: string]: boolean;
  }>({});
  const [cardItemToDelete, setcardItemToDelete] = useState<
    string | null
  >(null);
  const [PreviewCardItem, setPreviewCardItem] = useState<
    string | null
  >(null);
  const [formMode, setFormMode] = useState('Add');

  const [uploadSomeData] = useUploadSomeDataMutation();

  const handleEditData = (updatedData: CardDataJson) => {
    setpostData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
    setCheckboxState((prevCheckboxState) => ({
      ...prevCheckboxState,
      [updatedData.id]: updatedData.active || false,
    }));
  };


  const handleAddData = (newData: CardDataJson) => {
    setpostData((prevData) => [...prevData, newData]);
    setCheckboxState((prevCheckboxState) => ({
      ...prevCheckboxState,
      [newData.id]: newData.active || false,
    }));
  };

  const checkBoxHandler = async () => {
    const payload = {
      // create a payload for submitting form
    };

    try {
      await uploadSomeData({ payload: payload });
      console.log('API Hit for Random Order');

      // show some toast or snackbar message for success
    } catch (error) {
      console.error('Error while adding form data', error);
    } finally {
      // in case if loader used, stop it here
    }
  };


  const handleDeleteItem = () => {
    if (cardItemToDelete) {
      setpostData((prevData) =>
        prevData.filter((item) => item.id !== cardItemToDelete)
      );

      // Clear the itemToDelete state after deletion
      setcardItemToDelete(null);
    }
  };

  const handleOpenPostDeleteModal = (itemId: string) => {
    setcardItemToDelete(itemId);
  };

  // Function to close the delete confirmation modal
  const handleCloseCardDeleteModal = () => {
    setcardItemToDelete(null);
  };

  const onPreviewIconClick = (itemId: string) => {
    setPreviewCardItem(itemId);
  };

  const [langauage, setLangauage] = useState('HE');

  const handleLanguage = (event: any) => {
    setLangauage(event);
    console.log(langauage);
  };
  const customTheme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            display: 'none',
          },
        },
      },
    },
  });
  const onUpdateIconClick = (item: any) => {
    setInitialFormObject(item);
    setFormMode('Update');
    setIsCarouselFormOpen(true);
  };
  const onAddButtonClick = () => {
    setInitialFormObject({
      id: '',
      title: '',
      description: '',
      order: '',
      active: false,
      action: '',
    });
    setFormMode('Add');
    setIsCarouselFormOpen(true);
  };

  return (
    <>
      <Container>
        <Grid item xs={12} className={styles.listWrapper}>
          <Grid
            container
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Grid item xs={6}>
              <h4 className={styles.heading}>ניהול קרוסלה</h4>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'} gap={1}>
              <Button
                onClick={checkBoxHandler}
                className="secondary-btn btn-round"
                variant="outlined"
                startIcon={
                  <SyncAltIcon style={{ marginLeft: 10, marginRight: 0 }} />
                }
                color="success"
              >
                סדר אקראי
              </Button>
              <Button
                variant="contained"
                startIcon={
                  <AddIcon style={{ marginLeft: 10, marginRight: 0 }} />
                }
                className="primary-btn btn-round"
                color="success"
                onClick={onAddButtonClick}
              >
                הוסף פריט
              </Button>
              <ModalWrapper
                open={isCarouselFormOpen}
                onClose={() => setIsCarouselFormOpen(false)}
                maxWidth='437px'
              >
                <AddPostForm
                  onClose={() => setIsCarouselFormOpen(false)}
                  onAddData={handleAddData}
                  onUpdateData={handleEditData}
                  formMode={formMode}
                  initialFormObject={initialFormObject}
                />
              </ModalWrapper>
            </Grid>
          </Grid>

          <ThemeProvider theme={customTheme}>
            <Tabs value={0} className={styles.tabWrapper}>
              <Tab
                className={styles.tabCustom}
                onClick={() => handleLanguage('HE')}
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">עִברִית</Typography>
                    <img src={flag1} alt="flag" className={styles.tabIcon} />
                  </div>
                }
              />

              <Tab
                className={styles.tabCustom}
                onClick={() => handleLanguage('EN')}
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">אנגלית</Typography>
                    <img src={flag2} alt="flag" className={styles.tabIcon} />
                  </div>
                }
              />
            </Tabs>
          </ThemeProvider>
          <Grid>
            <PostAdded
              postData={postData}
              checkboxState={checkboxState}
              onEditData={handleEditData}
              onDeleteItem={handleOpenPostDeleteModal}
              onUpdateIconClick={onUpdateIconClick}
              onPreviewCarousel={onPreviewIconClick}
            />
            <ModalWrapper maxWidth='641px' open={Boolean(PreviewCardItem)} onClose={() => setPreviewCardItem(null)}>
              <PreviewCardDataItem cardDataMain={postData} onClose={() => setPreviewCardItem(null)} />
              </ModalWrapper>
            <ModalWrapper
            maxWidth='437px'
              open={Boolean(cardItemToDelete)}
              onClose={handleCloseCardDeleteModal}
            >
              <div>
                <p>Are you sure you want to delete this item?</p>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button className="primary-btn" onClick={handleDeleteItem}>
                      Delete
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className="secondary-btn"
                      onClick={handleCloseCardDeleteModal}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </ModalWrapper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostList;
