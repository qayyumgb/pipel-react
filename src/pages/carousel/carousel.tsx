import React, {ReactElement, useState} from 'react';
import {Button, Container, createTheme, Grid, ThemeProvider, Typography,} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddIcon from '@mui/icons-material/Add';
import {HeroCard} from '../../interfaces';
import {useUploadSomeDataMutation} from '../../redux/slices/home';
import flag1 from '../../assets/images/isreal.png';
import flag2 from '../../assets/images/usFlag.png';
import styles from './carousel.module.scss';
import {AddItemModal} from "../../modals/add-item-modal/add-item-modal";
import CarouselList from './carousel-list/carousel-list';
import ModalWrapper from "../../common/modal";
import PreviewCarouselItem from "../home/components/preview-carousel-item/preview-carousel-item";


export function Carousel(): ReactElement {
    const [isCarouselFormOpen, setIsCarouselFormOpen] = useState(false);
    const [carousalData, setCarousalData] = useState<HeroCard[]>([]);

    const [previewCarouselItem, setPreviewCarouselItem] = useState<
        string | null
    >(null);
    const [isRandomOrderActive, setRandomOrderActive] = useState(false)


    const [uploadSomeData] = useUploadSomeDataMutation();

    const handleEditData = (updatedData: HeroCard) => {
        setCarousalData((prevData) =>
            prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
        );

    };

    const handleAddData = (newData: HeroCard) => {
        setCarousalData((prevData) => [...prevData, newData]);
    };

    const checkBoxHandler = async () => {
        const payload = {
            // create a payload for submitting form
        };

        try {
            await uploadSomeData({payload: payload});
            console.log('API Hit for Random Order');

            // show some toast or snackbar message for success
        } catch (error) {
            console.error('Error while adding form data', error);
        } finally {
            // in case if loader used, stop it here
        }

        setRandomOrderActive((prev) => !prev)
    };


    const handleOpenCarouselDeleteModal = (itemId: string) => {
        // setIsDeleteModalOpen(true);
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
        // setInitialFormObject(item);
        setIsCarouselFormOpen(true);
    };
    const onAddButtonClick = () => {
        // setInitialFormObject(INITIAL_FORM_OBJECT);
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
                                startIcon={<ShuffleIcon style={{marginLeft: 10, marginRight: 0}}/>}
                                color="success"
                            >
                                סדר אקראי
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={
                                    <AddIcon style={{marginLeft: 10, marginRight: 0}}/>
                                }
                                className="primary-btn btn-round"
                                color="success"
                                onClick={onAddButtonClick}
                            >
                                הוסף פריט
                            </Button>
                        </Grid>
                    </Grid>

                    <ThemeProvider theme={customTheme}>
                        <Tabs value={0} className={styles.tabWrapper}>
                            <Tab
                                className={`${styles.tabCustom} ${isLanguageSelected('HE') ? styles.activeTab : ''}`}
                                onClick={() => handleLanguage('HE')}
                                label={
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Typography variant="body1">עִברִית</Typography>
                                        <img src={flag1} alt="flag" className={styles.tabIcon}/>
                                    </div>
                                }
                            />

                            <Tab
                                className={`${styles.tabCustom} ${isLanguageSelected('EN') ? styles.activeTab : ''}`}
                                onClick={() => handleLanguage('EN')}
                                label={
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <Typography variant="body1">אנגלית</Typography>
                                        <img src={flag2} alt="flag" className={styles.tabIcon}/>
                                    </div>
                                }
                            />
                        </Tabs>
                    </ThemeProvider>
                    <Grid>
                        <CarouselList
                            carousalData={carousalData}
                            onEditData={handleEditData}
                            onDeleteItem={handleOpenCarouselDeleteModal}
                            onUpdateIconClick={onUpdateIconClick}
                            onPreviewCarousel={onPreviewIconClick}
                        />
                        <ModalWrapper maxWidth='641px' open={Boolean(previewCarouselItem)}
                                      onClose={() => setPreviewCarouselItem(null)}>
                            <PreviewCarouselItem carousalData={carousalData}
                                                 onClose={() => setPreviewCarouselItem(null)}
                                                 selectedItemId={previewCarouselItem}/>

                        </ModalWrapper>
                    </Grid>
                </Grid>
            </Container>
            <AddItemModal isOpen={isCarouselFormOpen} closeModal={() => setIsCarouselFormOpen(false)}/>
        </>
    );
};

