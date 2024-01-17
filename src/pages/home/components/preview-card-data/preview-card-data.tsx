import React from "react";
import { CardDataJson } from "../../../../interfaces";
import styles from "./preview-card-data.module.scss";
import WestIcon from "@mui/icons-material/West";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton } from "@mui/material";

interface CardDataAdded {
  cardDataMain: CardDataJson[];
  onClose: () => void;
}

const PreviewCardDataItem: React.FC<CardDataAdded> = ({
  cardDataMain,
  onClose,
}) => {
  return (
    <>
      <div className={styles.previewContainer}>
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
        <div className={styles.previewItems}>
        {cardDataMain.map((item: CardDataJson) => (
          <div key={item.id} className={styles.previewMain}>
            <div className={styles.previewContent}>
              <div className={styles.previewBody}>
                <div>
                  <h5>{item.title}</h5>
                </div>
                <div className={styles.previewBtn}>
                  <a href={item.action}>
                    <WestIcon />
                  </a>
                </div>
              </div>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
};

export default PreviewCardDataItem;
