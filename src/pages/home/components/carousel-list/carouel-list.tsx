import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import AddIcon from '@mui/icons-material/Add';
import styles from './carousel-list.module.scss';
import { HeroCard, CardDataJson } from '../../../../interfaces/index';
import { useUploadSomeDataMutation } from '../../../../redux/slices/home';
import ModalWrapper from '../../../../common/modal';
import AddCarousalData from '../add-carousel-form/add-carousel-form';
import CarousalAdded from '../carousel-added-data/carousel-added-data';
import PreviewCarouselItem from '../preview-carousel-item/preview-carousel-item';
import PreviewCardDataItem from '../preview-card-data/preview-card-data';
import flag1 from '../../../../assets/images/isreal.png';
import flag2 from '../../../../assets/images/usFlag.png';

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
  const [isCardDataFormOpen, setIsCardDataFormOpen] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isCardDataPreview, setIsCardDataPreview] = useState(false);
  const [carousalData, setCarousalData] = useState<HeroCard[]>([]);
  const [isCardData, setIsCardData] = useState<CardDataJson[]>([]);
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
  const [cardDataItemToDelete, setCardDataItemToDelete] = useState<
    string | null
  >(null);
  const [formMode, setFormMode] = useState('Add');

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

  const handleEditCardData = (updatedCardData: CardDataJson) => {
    setIsCardData((prevData) =>
      prevData.map((item) =>
        item.id === updatedCardData.id ? updatedCardData : item
      )
    );
    setCheckboxCardDataState((prevCheckboxState) => ({
      ...prevCheckboxState,
      [updatedCardData.id]: updatedCardData.active || false,
    }));
  };

  const handleAddCardData = (newData: CardDataJson) => {
    setIsCardData((prevData) => [...prevData, newData]);
    setCheckboxCardDataState((prevCheckboxState) => ({
      ...prevCheckboxState,
      [newData.id]: newData.active || false,
    }));
  };

  const cardDataModalHandler = () => {
    setIsCardDataFormOpen(true);
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
  };

  const handlePreview = () => {
    setIsPreviewVisible((prev) => !prev);
    setIsCardDataPreview(false);
  };

  const handleCardDataPreview = () => {
    setIsCardDataPreview((prev) => !prev);
    setIsPreviewVisible(false);
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

  const handleCardDeleteItem = () => {
    if (cardDataItemToDelete) {
      setIsCardData((prevData) =>
        prevData.filter((item) => item.id !== cardDataItemToDelete)
      );

      // Clear the itemToDelete state after deletion
      setCardDataItemToDelete(null);
    }
  };

  const handleOpenCardDataDeleteModal = (itemId: string) => {
    setCardDataItemToDelete(itemId);
  };

  // Function to close the delete confirmation modal
  const handleCloseCardDataDeleteModal = () => {
    setCardDataItemToDelete(null);
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
            <CarousalAdded
              carousalData={carousalData}
              checkboxState={checkboxState}
              onEditData={handleEditData}
              onDeleteItem={handleOpenCarouselDeleteModal}
              onUpdateIconClick={onUpdateIconClick}
              onPreviewCarousel={onPreviewIconClick}
            />
            <ModalWrapper maxWidth='641px' open={Boolean(previewCarouselItem)} onClose={() => setPreviewCarouselItem(null)}>
              <PreviewCarouselItem carousalData={carousalData} onClose={() => setPreviewCarouselItem(null)} />
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
