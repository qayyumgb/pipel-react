import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./preview-carousel-item.module.scss";
import { HeroCard } from "../../../../interfaces/heroCard";

interface CarousalAddedProps {
  carousalData: HeroCard[];
  selectedItemId: string | null;
  onClose: () => void;
}

const PreviewCarouselItem: React.FC<CarousalAddedProps> = ({
  carousalData,
  selectedItemId,
  onClose,
}) => {

  const selectedItem = carousalData.find((item) => item.id === selectedItemId);

  return (
    <>
      <Grid container justifyContent="center">
        {selectedItem && (
          <div style={{ width: '100%' }}>
            {/* Modal Header */}
            <Grid
              className={styles.modalHeader}
              item
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
                תצוגה מקדימה
              </h2>
              {/* Close button */}
              <IconButton
                onClick={onClose}
                aria-label="close"
                style={{ padding: "5px", background: "#E5E7EB" }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>

            {/* Main Preview Content */}
            <div
              className={styles.previewMain}
              style={{ backgroundImage: `url(${selectedItem.image})`, height: '360px' }}
            >
              <div className={styles.previewContent}>
                <div className={styles.previewBody}>
                  {/* Display item title */}
                  <h5>{selectedItem.title}</h5>

                  {/* Preview Button */}
                  <div className={styles.previewBtn}>
                    <Button
                      className={styles.previewButton}
                      component={RouterLink}
                      to={selectedItem.action}
                    >
                      <WestIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.carouselDots}>
              <div className={styles.grayDot}></div>
              <div className={styles.orangeDot}></div>
              <div className={styles.grayDot}></div>
              <div className={styles.grayDot}></div>
              <div className={styles.grayDot}></div>
            </div>
          </div>
        )}
      </Grid>
    </>
  );
};

export default PreviewCarouselItem;
