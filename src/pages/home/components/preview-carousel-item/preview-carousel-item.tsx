import { Button, Grid } from '@mui/material';
import React from 'react';
import styles from "./preview-carousel-item.module.scss";
import { HeroCard } from '../../../../interfaces/heroCard';
import emptyState from '../../../../assets/images/emptyState.svg';
import { Link as RouterLink } from 'react-router-dom'
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { width } from '@mui/system';
interface CarousalAddedProps {
    carousalData: HeroCard[];
}

const PreviewCarouselItem: React.FC<CarousalAddedProps> = ({ carousalData }) => {
    // Display only the first item
    const firstItem = carousalData.length > 0 ? carousalData : null;
    console.log('test',carousalData)
    return (
        <>
            <Grid container justifyContent="center">
            <Swiper loop={true} navigation={true} modules={[Navigation]} className="mySwiper" style={{width:'100%'}}>
                    { carousalData.map((item: HeroCard, index: number) => (
                        <SwiperSlide>
            <div className={styles.previewMain} style={{ backgroundImage: `url(${item.image})` }}>
                            <div className={styles.previewContent}>
                                <div className={styles.previewBody}>
                                    <h5>{item.title}</h5>
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

export default PreviewCarouselItem;
