import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { CardDataJson } from '../../../../interfaces';
import styles from "./preview-card-data.module.scss";
import EastIcon from '@mui/icons-material/East';

interface CardDataAdded {
    cardDataMain: CardDataJson[];
}

const PreviewCardDataItem: React.FC<CardDataAdded> = ({ cardDataMain }) => {
    return (
        <>
            <Swiper loop={true} navigation={true} modules={[Navigation]} className="mySwiper" style={{ width: '100%' }} slidesPerView={3} spaceBetween={20}>
                {cardDataMain.map((item: CardDataJson) => (
                    <SwiperSlide key={item.id}>
                        <div className={styles.previewMain}>
                            <div className={styles.previewContent}>
                                <div className={styles.previewBody}>
                                    <div>
                                        <h5>{item.title}</h5>
                                    </div>
                                    <div className={styles.previewBtn}>
                                        <a href={item.action}>
                                            <EastIcon />
                                        </a>
                                    </div>
                                </div>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default PreviewCardDataItem;
