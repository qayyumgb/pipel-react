import {
  Container,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ReactElement, useState } from "react";
import flag1 from "../../assets/images/isreal.png";
import flag2 from "../../assets/images/usFlag.png";
import { HeroCard } from "../../interfaces";
import { AddItemModal } from "../../modals/add-item-modal/add-item-modal";
import PreviewCarouselItem from "../home/components/preview-carousel-item/preview-carousel-item";
import CarouselList from "./carousel-list/carousel-list";
import styles from "./carousel.module.scss";
import { Header } from "./components";
import { DUMMY_CAROUSEL_DATA } from "./data";
import { useCarousel } from "./hooks";

export function Carousel(): ReactElement {
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
  const [langauage, setLangauage] = useState("HE");

  const handleLanguage = (event: any) => {
    setLangauage(event);
    console.log(langauage);
  };
  const customTheme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            display: "none",
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
          <Header
            checkBoxHandler={checkBoxHandler}
            onAddButtonClick={onAddButtonClick}
            isRandomOrderActive={isRandomOrderActive}
          />

          <ThemeProvider theme={customTheme}>
            <Tabs value={0} className={styles.tabWrapper}>
              <Tab
                className={`${styles.tabCustom} ${
                  isLanguageSelected("HE") ? styles.activeTab : ""
                }`}
                onClick={() => handleLanguage("HE")}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1">עִברִית</Typography>
                    <img src={flag1} alt="flag" className={styles.tabIcon} />
                  </div>
                }
              />

              <Tab
                className={`${styles.tabCustom} ${
                  isLanguageSelected("EN") ? styles.activeTab : ""
                }`}
                onClick={() => handleLanguage("EN")}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1">אנגלית</Typography>
                    <img src={flag2} alt="flag" className={styles.tabIcon} />
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
}
