import { Container, Grid } from '@mui/material';
import { useState, FC, useEffect } from 'react';
import { HeroCard } from '../../interfaces';
import { AddItemModal } from '../../modals/add-item-modal/add-item-modal';
import { Header, MainTabs } from '../../shared';
import PreviewCarouselItem from '../home/components/preview-carousel-item/preview-carousel-item';
import { CarouselList } from './carousel-list/carousel-list';
import styles from './carousel.module.scss';
import { DUMMY_CAROUSEL_DATA, DUMMY_CAROUSEL_DATA_HEBREW } from './data';
import { useCarousel } from './hooks';
import { useAppSelector } from '../../redux';

export const Carousel: FC = () => {
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const [isCarouselFormOpen, setIsCarouselFormOpen] = useState(false);
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const [carousalData, setCarousalData] =
    useState<HeroCard[]>(DUMMY_CAROUSEL_DATA);

  const [previewCarouselItem, setPreviewCarouselItem] = useState<string | null>(
    null
  );
  const [isRandomOrderActive, setRandomOrderActive] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<HeroCard | undefined>(
    undefined
  );
  useEffect(() => {
    setCarousalData(
      currentLanguage === 'EN'
        ? DUMMY_CAROUSEL_DATA
        : DUMMY_CAROUSEL_DATA_HEBREW
    );
  }, [currentLanguage]);
  const {
    checkBoxHandler,
    handleEditData,
    handleOpenCarouselDeleteModal,
    handleAddData,
  } = useCarousel({
    setRandomOrderActive: setRandomOrderActive,
    setCarousalData: setCarousalData,
    isRandomOrderActive,
  });

  const onPreviewIconClick = (itemId: string) => {
    setPreviewCarouselItem(itemId);
    setIsPreviewModal(true);
  };

  const onUpdateIconClick = (item: HeroCard) => {
    setEditingItem(item);
    setIsCarouselFormOpen(true);
  };

  const onDeleteItem = (itemId: string) => {
    setCarousalData(carousalData.filter((item) => item.id != itemId));
  };
  const onAddButtonClick = () => {
    setEditingItem(undefined);
    setIsCarouselFormOpen(true);
  };

  const handleSubmission = (formData: HeroCard) => {
    if (editingItem) {
      const updatedData: HeroCard = {
        ...editingItem,
        ...formData,
      };

      setCarousalData((prevData) => {
        const updatedIndex = prevData.findIndex(
          (item) => item.id === updatedData.id
        );
        if (updatedIndex !== -1) {
          const newData = [...prevData];
          newData[updatedIndex] = updatedData;
          return newData;
        }
        return prevData;
      });
    } else {
      handleAddData(formData);
    }
    setIsCarouselFormOpen(false);
    setEditingItem(undefined);
  };

  return (
    <>
      <Container>
        <Grid item xs={12} className={styles.listWrapper}>
          <Header
            checkBoxHandler={checkBoxHandler}
            onAddButtonClick={onAddButtonClick}
            isRandomOrderActive={isRandomOrderActive}
          />
          <MainTabs />
          <Grid className={styles.mainScroll}>
            <CarouselList
              carousalData={carousalData}
              onUpdateIconClick={onUpdateIconClick}
              onPreviewCarousel={onPreviewIconClick}
              onDeleteItem={onDeleteItem}
            />

            {isPreviewModal && (
              <PreviewCarouselItem
                carousalData={carousalData}
                onClose={() => {
                  setIsPreviewModal(false);
                  setPreviewCarouselItem(null);
                }}
                selectedItemId={previewCarouselItem}
                isShow={isPreviewModal}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      {isCarouselFormOpen && (
        <AddItemModal
          isOpen={true}
          closeModal={() => {
            setIsCarouselFormOpen(false);
            setEditingItem(undefined);
          }}
          onSubmit={handleSubmission}
          editMode={!!editingItem}
          initialData={editingItem}
          onUpdateData={handleEditData}
        />
      )}
    </>
  );
};
