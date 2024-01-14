import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from './top-carousel.module.scss';
import {
    HeroCard,
    CardDataJson,
} from '../../../../interfaces/index';
import {
    useUploadSomeDataMutation,
} from '../../../../redux/slices/home';
import ModalWrapper from '../../../../common/modal';
import AddCarousalData from '../add-carousel-form/add-carousel-form';
import CarousalAdded from '../carousel-added-data/carousel-added-data';
import PreviewCarouselItem from '../preview-carousel-item/preview-carousel-item';
import PreviewCardDataItem from '../preview-card-data/preview-card-data';
import AddCardDataForm from '../add-card-data-form/add-card-data-form';
import CardDataAdded from '../card-data-added/card-data-added';

const TabPanel = (props:any) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  };


const TopCarousal: React.FC = () => {
    const [isCarouselFormOpen, setIsCarouselFormOpen] = useState(false);
    const [isCardDataFormOpen, setIsCardDataFormOpen] = useState(false);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [isCardDataPreview, setIsCardDataPreview] = useState(false);
    const [carousalData, setCarousalData] = useState<HeroCard[]>([]);
    const [isCardData, setIsCardData] = useState<CardDataJson[]>([]);
    const [checkboxState, setCheckboxState] = useState<{ [key: string]: boolean }>({});
    const [checkboxCardDataState, setCheckboxCardDataState] = useState<{ [key: string]: boolean }>({});
    const [carouselItemToDelete, setCarouselItemToDelete] = useState<string | null>(null);
    const [cardDataItemToDelete, setCardDataItemToDelete] = useState<string | null>(null);

    const [uploadSomeData] = useUploadSomeDataMutation();

    const handleEditData = (updatedData: HeroCard) => {
        setCarousalData((prevData) => prevData.map(item => (item.id === updatedData.id ? updatedData : item)));
        setCheckboxState((prevCheckboxState) => ({
            ...prevCheckboxState,
            [updatedData.id]: updatedData.active || false,
        }));
    };

    const handleEditCardData = (updatedCardData: CardDataJson) => {
        setIsCardData((prevData) => prevData.map(item => (item.id === updatedCardData.id ? updatedCardData : item)));
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

    const CardDatacheckBoxHandler = async () => {
        const payload = {
            // create a payload for submitting form
        };

        try {
            await uploadSomeData({ payload: payload });
            console.log("API Hit for Card Data Random Order");

            // show some toast or snackbar message for success

            // Success, so close the modal
        } catch (error) {
            console.error('Error while adding form data', error);
        } finally {
            // in case if loader used, stop it here
        }
    };

    const checkBoxHandler = async () => {
        const payload = {
            // create a payload for submitting form
        };

        try {
            await uploadSomeData({ payload: payload });
            console.log("API Hit for Random Order");

            // show some toast or snackbar message for success

            // Success, so close the modal
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
            setCarousalData((prevData) => prevData.filter(item => item.id !== carouselItemToDelete));

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

    const handleCardDeleteItem = () => {
        if (cardDataItemToDelete) {
            setIsCardData((prevData) => prevData.filter(item => item.id !== cardDataItemToDelete));

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
    const [value, setValue] = useState(0);

    const handleChange = (event:any, newValue:any) => {
      setValue(newValue);
    };
    const customTheme = createTheme({
        components: {
          MuiTabs: {
            styleOverrides: {
              indicator: {
                backgroundColor: '#FF7222', // Change this to your desired indicator color
            
              },
              
            },
          },
         
        },
      });
    const previewSection: React.ReactNode = isPreviewVisible ? (
        <Grid className={styles.heroMain}>
            <Container>
                <Grid container alignContent="center" >
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6} height="100%">
                        <PreviewCarouselItem carousalData={carousalData} />
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    ) : isCardDataPreview ? (
        <Grid className={styles.heroMain}>
            <Container>
                <PreviewCardDataItem cardDataMain={isCardData} />
            </Container>
        </Grid>
    ) : null;

    return (
        <>
            {previewSection}

    <Container>
    <ThemeProvider theme={customTheme}>
        
        <Tabs value={value} onChange={handleChange} style={{padding:15}}>
            <Tab label="Banner Data" sx={{
            '&.Mui-selected': {color: '#FF7222',},
          }}/>
            <Tab label="Card Data" sx={{
            '&.Mui-selected': {color: '#FF7222',},
          }}/>
        </Tabs>
      </ThemeProvider>
      <TabPanel value={value} index={0}>
        <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item xs="auto">
                                <h2>Banner Carousel</h2>
                            </Grid>
                            <Grid item xs="auto">
                                <Button className="secondary-btn" onClick={handlePreview}>
                                    {isPreviewVisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid className={styles.bannerCarousal}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button variant="contained" className='primary-btn' color="success" onClick={() => setIsCarouselFormOpen(true)}>
                                        Add Item
                                    </Button>
                                    <ModalWrapper open={isCarouselFormOpen} onClose={() => setIsCarouselFormOpen(false)}>
                                        <AddCarousalData onClose={() => setIsCarouselFormOpen(false)} onAddData={handleAddData} />
                                    </ModalWrapper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container justifyContent="flex-end">
                                        <FormControlLabel onClick={checkBoxHandler} control={<Checkbox />} label="Random Order" />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid>
                                <CarousalAdded carousalData={carousalData} checkboxState={checkboxState} onEditData={handleEditData} onDeleteItem={handleOpenCarouselDeleteModal} />
                                <ModalWrapper open={Boolean(carouselItemToDelete)} onClose={handleCloseCarouselDeleteModal}>
                                    <div>
                                        <p>Are you sure you want to delete this item?</p>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Button className='primary-btn' onClick={handleDeleteItem}>Delete</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button className='secondary-btn' onClick={handleCloseCarouselDeleteModal}>Cancel</Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ModalWrapper>
                            </Grid>
                        </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid item xs={12}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item xs="auto">
                                <h2>Card Carousel</h2>
                            </Grid>
                            <Grid item xs="auto">
                                <Button className="secondary-btn" onClick={handleCardDataPreview}>
                                    {isCardDataPreview ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid className={styles.bannerCarousal}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button variant="contained" className='primary-btn' color="success" onClick={cardDataModalHandler}>
                                        Add Item
                                    </Button>
                                    <ModalWrapper open={isCardDataFormOpen} onClose={() => setIsCardDataFormOpen(false)}>
                                        <AddCardDataForm onClose={() => setIsCardDataFormOpen(false)} onAddData={handleAddCardData} />
                                    </ModalWrapper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container justifyContent="flex-end">
                                        <FormControlLabel onClick={CardDatacheckBoxHandler} control={<Checkbox />} label="Random Order" />
                                    </Grid>
                                </Grid>

                                <Grid xs={12}>
                                    <CardDataAdded cardAddedData={isCardData} checkboxState={checkboxCardDataState} onEditData={handleEditCardData} onDeleteItem={handleOpenCardDataDeleteModal} />

                                    <ModalWrapper open={Boolean(cardDataItemToDelete)} onClose={handleCloseCardDataDeleteModal}>
                                        <div>
                                            <p>Are you sure you want to delete this item?</p>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Button className='primary-btn' onClick={handleCardDeleteItem}>Delete</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button className='secondary-btn' onClick={handleCloseCardDataDeleteModal}>Cancel</Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </ModalWrapper>
                                </Grid>
                            </Grid>

                            <Grid>
                            </Grid>
                        </Grid>
        </Grid>
      </TabPanel>
    </Container>
        </>
    );
};

export default TopCarousal;
