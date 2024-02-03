import { Container, Grid } from "@mui/material";
import {useState, FC } from "react";
import { HeroCard } from "../../interfaces";
import { AddItemModal } from "../../modals/add-item-modal/add-item-modal";
import { Header, MainTabs } from "../../shared";
import PreviewCarouselItem from "../home/components/preview-carousel-item/preview-carousel-item";
import {CarouselList} from "./carousel-list/carousel-list";
import styles from "./carousel.module.scss";
import { DUMMY_CAROUSEL_DATA } from "./data";
import { useCarousel } from "./hooks";

export const Carousel: FC = () => {
  const [isCarouselFormOpen, setIsCarouselFormOpen] = useState(false);
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const [carousalData, setCarousalData] =
    useState<HeroCard[]>(DUMMY_CAROUSEL_DATA);

  const [previewCarouselItem, setPreviewCarouselItem] = useState<string | null>(
    null,
  );
  const [isRandomOrderActive, setRandomOrderActive] = useState<boolean>(false);
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
  };
  const onUpdateIconClick = (item: any) => {
    // setInitialFormObject(item);
    setIsCarouselFormOpen(true);
  };
  const onAddButtonClick = () => {
    // setInitialFormObject(INITIAL_FORM_OBJECT);
    setIsCarouselFormOpen(true);
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
          <Grid>
            <CarouselList
              carousalData={carousalData}
              onEditData={handleEditData}
              onDeleteItem={handleOpenCarouselDeleteModal}
              onUpdateIconClick={onUpdateIconClick}
              onPreviewCarousel={onPreviewIconClick}
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
          isOpen={isCarouselFormOpen}
          closeModal={() => setIsCarouselFormOpen(false)}
          onSubmit={handleAddData}
        />
      )}
    </>
  );
};
