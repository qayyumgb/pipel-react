import { Button, Grid } from '@mui/material';
import React from 'react';
import styles from "./preview-card-data.module.scss";
import { Link as RouterLink } from 'react-router-dom'
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { CardDataJson } from '../../../../interfaces';
interface CardDataAdded {
    cardDataMain: CardDataJson[];
}

const PreviewCardDataItem: React.FC<CardDataAdded> = ({ cardDataMain }) => {
    // Display only the first item
    const firstItem = cardDataMain.length > 0 ? cardDataMain : null;
    console.log('test', cardDataMain)
    return (
        <>
            <Grid container justifyContent="center">
                <Swiper loop={true} navigation={true} modules={[Navigation]} className="mySwiper" style={{ width: '100%' }}>
                    {cardDataMain.map((item: CardDataJson, index: number) => (
                        <SwiperSlide>
                            <div className={styles.previewMain} key={index}>
                                <div className={styles.previewContent}>
                                    <div className={styles.previewBody}>
                                        <div>
                                            <h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className={styles.previewBtn}>
                                            <Button className={styles.previewButton} component={RouterLink} to={item.action}>
                                                <EastIcon />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </Grid>

        </>
    );
};

export default PreviewCardDataItem;
