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
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddIcon from '@mui/icons-material/Add';
import styles from './carousel-list.module.scss';
import { HeroCard } from '../../../../interfaces/index';
import { useUploadSomeDataMutation } from '../../../../redux/slices/home';
import ModalWrapper from '../../../../common/modal';
import AddCarousalData from '../add-carousel-form/add-carousel-form';
import CarousalAdded from '../carousel-added-data/carousel-added-data';
import PreviewCarouselItem from '../preview-carousel-item/preview-carousel-item';
import flag1 from '../../../../assets/images/isreal.png';
import flag2 from '../../../../assets/images/usFlag.png';
import PreviewItem from '../preview-item/preview-item';

const CarouelList: React.FC = () => {
  const [isCarouselFormOpen, setIsCarouselFormOpen] = useState(false);
  const [initialFormObject, setInitialFormObject] = useState({
    id: '',
    title: '',
    description: '',
    order: '',
    active: false,
    image: '',
    action: '',
  });
  const [carousalData, setCarousalData] = useState<HeroCard[]>([]);
  const [checkboxState, setCheckboxState] = useState<{
    [key: string]: boolean;
  }>({});
  const [checkboxCardDataState, setCheckboxCardDataState] = useState<{
    [key: string]: boolean;
  }>({});
  const [carouselItemToDelete, setCarouselItemToDelete] = useState<
    string | null
  >(null);
  const [previewCarouselItem, setPreviewCarouselItem] = useState<
    string | null
  >(null);
  const [formMode, setFormMode] = useState('Add');
  const [isRandomOrderActive, setRandomOrderActive] = useState(false)



  const [uploadSomeData] = useUploadSomeDataMutation();

  const handleEditData = (updatedData: HeroCard) => {
    setCarousalData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
    setCheckboxState((prevCheckboxState) => ({
      ...prevCheckboxState,
      [updatedData.id]: updatedData.active || false,
    }));
  };

  const handleAddData = (newData: HeroCard) => {
    setCarousalData((prevData) => [...prevData, newData]);
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

    setRandomOrderActive((prev) => !prev)
  };

  const handleDeleteItem = () => {
    if (carouselItemToDelete) {
      setCarousalData((prevData) =>
        prevData.filter((item) => item.id !== carouselItemToDelete)
      );

      // Clear the itemToDelete state after deletion
      setCarouselItemToDelete(null);
    }
  };

  const handleOpenCarouselDeleteModal = (itemId: string) => {
    setCarouselItemToDelete(itemId);
  };

  // Function to close the delete confirmation modal
  const handleCloseCarouselDeleteModal = () => {
    setCarouselItemToDelete(null);
  };

  const onPreviewIconClick = (itemId: string) => {
    setPreviewCarouselItem(itemId);
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
      image: '',
      action: '',
    });
    setFormMode('Add');
    setIsCarouselFormOpen(true);
  };

  const isLanguageSelected = (language: string) => langauage === language;
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
                className={`secondary-btn btn-round ${isRandomOrderActive ? 'randomBtn' : ''}`}
                variant="outlined"
                startIcon={<ShuffleIcon style={{ marginLeft: 10, marginRight: 0 }} />}
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
                <AddCarousalData
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
                className={`${styles.tabCustom} ${isLanguageSelected('HE') ? styles.activeTab : ''}`}
                onClick={() => handleLanguage('HE')}
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">עִברִית</Typography>
                    <img src={flag1} alt="flag" className={styles.tabIcon} />
                  </div>
                }
              />

              <Tab
                className={`${styles.tabCustom} ${isLanguageSelected('EN') ? styles.activeTab : ''}`}
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
            <CarousalAdded
              carousalData={carousalData}
              checkboxState={checkboxState}
              onEditData={handleEditData}
              onDeleteItem={handleOpenCarouselDeleteModal}
              onUpdateIconClick={onUpdateIconClick}
              onPreviewCarousel={onPreviewIconClick}
            />
            <ModalWrapper maxWidth='641px' open={Boolean(previewCarouselItem)} onClose={() => setPreviewCarouselItem(null)}>
              <PreviewCarouselItem carousalData={carousalData} onClose={() => setPreviewCarouselItem(null)} selectedItemId={previewCarouselItem} />
              {/* <PreviewItem
                id={carousalData.find((item) => item.id === previewCarouselItem)?.id || ''}
                title={carousalData.find((item) => item.id === previewCarouselItem)?.title || ''}
                description={carousalData.find((item) => item.id === previewCarouselItem)?.description || ''}
                image={carousalData.find((item) => item.id === previewCarouselItem)?.image || ''}
                order={carousalData.find((item) => item.id === previewCarouselItem)?.order || 0}
                action={carousalData.find((item) => item.id === previewCarouselItem)?.action || ''}
                onClose={() => setPreviewCarouselItem(null)}
              /> */}

            </ModalWrapper>
            <ModalWrapper
              maxWidth='437px'
              open={Boolean(carouselItemToDelete)}
              onClose={handleCloseCarouselDeleteModal}
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
                      onClick={handleCloseCarouselDeleteModal}
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

export default CarouelList;
