import { Button, Grid, IconButton } from "@mui/material";
import React from "react";
import styles from "./preview-carousel-item.module.scss";
import { HeroCard } from "../../../../interfaces/heroCard";
import { Link as RouterLink } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import CloseIcon from "@mui/icons-material/Close";

interface CarousalAddedProps {
  carousalData: HeroCard[];
  onClose: () => void;
}

const PreviewCarouselItem: React.FC<CarousalAddedProps> = ({
  carousalData,
  onClose,
}) => {
  // Display only the first item
  const firstItem = carousalData.length > 0 ? carousalData : null;
  console.log("test", carousalData);

  return (
    <>
      <Grid container justifyContent="center">
        {carousalData.map((item: HeroCard, index: number) => (
          <div key={index} style={{width: '100%'}}>
            <Grid
              className={styles.modalHeader}
              item
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
                Preview Item
              </h2>
              <IconButton
                onClick={onClose}
                aria-label="close"
                style={{ padding: "5px", background: "#E5E7EB" }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <div
              className={styles.previewMain}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className={styles.previewContent}>
                <div className={styles.previewBody}>
                  <h5>{item.title}</h5>
                  <div className={styles.previewBtn}>
                    <Button
                      className={styles.previewButton}
                      component={RouterLink}
                      to={item.action}
                    >
                      <WestIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Grid>
    </>
  );
};

export default PreviewCarouselItem;