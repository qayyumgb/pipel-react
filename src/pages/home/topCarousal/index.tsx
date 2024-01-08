import React, { useState } from 'react';
import { Button, Checkbox, Container, FormControlLabel, Grid } from '@mui/material';
// import { useHomeCarouselDataQuery } from '../../../redux/slices/home';
import styles from './index.module.scss';
import ModalWrapper from '../../../common/modal';
import AddCarousalData from './addCarousalForm';
import CarousalAdded from './carousalAddedData';
import { HeroCard } from '../../../interfaces/heroCard';
import { useUploadSomeDataMutation } from '../../../redux/slices/home';


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
                    <Grid container>
                        <Grid item xs={12}>
                            <div className={styles.heroText}>
                                <h1>
                                    Now is the time to invest
                                    <span>
                                        <br /> in tomorrow's innovations
                                    </span>
                                </h1>
                                <p>
                                    It is really simple to invest in startups, businesses, and real estate and to become an actual partner in Israeli success stories
                                </p>

                                <Button className="primary-btn">
                                    I want to invest
                                </Button>

                                <ModalWrapper open={isCarouselFormOpen} onClose={() => setIsCarouselFormOpen(false)}>
                                    <AddCarousalData onClose={() => setIsCarouselFormOpen(false)} onAddData={handleAddData} />
                                </ModalWrapper>
                            </div>
                        </Grid>

                    </Grid>
                </Container>
            </Grid>
            <Container>
                <Grid container>
                    <Grid item xs={6}>
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
