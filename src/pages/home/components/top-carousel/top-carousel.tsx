import React, { useState } from 'react';
import { Button, Checkbox, Container, FormControlLabel, Grid } from '@mui/material';
// import { useHomeCarouselDataQuery } from '../../../redux/slices/home';
import styles from './top-carousel.module.scss';
import ModalWrapper from '../../../../common/modal';
import AddCarousalData from '../add-carousel-form/add-carousel-form';
import CarousalAdded from '../carousel-added-data/carousel-added-data';
import { HeroCard } from '../../../../interfaces/heroCard';
import { useUploadSomeDataMutation } from '../../../../redux/slices/home';
import PreviewCarouselItem from '../preview-carousel-item/preview-carousel-item';


// -----------------------------------------------------------------------------------------------------------------------

const TopCarousal: React.FC = () => {
    const [isCarouselFormOpen, setIsCarouselFormOpen] = useState(false);


    // use data, isLoading and success if needed, isError, error also available, 
    // const { data, isLoading, isSuccess } = useHomeCarouselDataQuery({ refetchOnMountOrArgChange: true });

    const [carousalData, setCarousalData] = useState<HeroCard[]>([]);
    const [checkboxState, setCheckboxState] = useState<{ [key: string]: boolean }>({});

    const [uploadSomeData] = useUploadSomeDataMutation();


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
        }

        try {
            await uploadSomeData({ payload: payload });
            console.log("API Hit for Random Order")

            // show some toast or snackbar message for success

            // Success, so close the modal

        } catch (error) {
            console.log('error while adding form data', error);
        } finally {
            // incase if loader used, stop it here
        }
    }

    return (
        <>
            <Grid className={styles.heroMain}>
                <Container>
                    <Grid container alignContent="center">
                        <Grid item md={6} sm={12}>
                            
                        </Grid>
                        <ModalWrapper open={isCarouselFormOpen} onClose={() => setIsCarouselFormOpen(false)}>
                                    <AddCarousalData onClose={() => setIsCarouselFormOpen(false)} onAddData={handleAddData} />
                                </ModalWrapper>
                        <Grid item md={6} xs={12} sm={12} height="100%">
                            <PreviewCarouselItem carousalData={carousalData} />
                        </Grid>

                    </Grid>
                </Container>
            </Grid>
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <h2>Banner Carousel</h2>
                        <Grid className={styles.bannerCarousal}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button variant="contained" className='primary-btn' color="success" onClick={() => setIsCarouselFormOpen(true)}>
                                        Add Item
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container justifyContent="flex-end">
                                        <FormControlLabel onClick={checkBoxHandler} control={<Checkbox />} label="Random Order" />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <CarousalAdded carousalData={carousalData} checkboxState={checkboxState} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}></Grid>
                </Grid>
            </Container>
        </>
    );
};

export default TopCarousal;
