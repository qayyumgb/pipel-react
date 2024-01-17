import React from "react";
import { CardDataJson } from "../../../../interfaces";
import styles from "./preview-card-data.module.scss";
import WestIcon from "@mui/icons-material/West";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton } from "@mui/material";

interface CardDataAdded {
  cardDataMain: CardDataJson[];
  selectedItemId: string | null;
  onClose: () => void;
}

const PreviewCardDataItem: React.FC<CardDataAdded> = ({
  cardDataMain,
  selectedItemId,
  onClose,
}) => {
  const selectedItem = cardDataMain.find((item) => item.id === selectedItemId);
  return (
    <>
      {selectedItem && (
        <div className={styles.previewContainer}>
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
            <IconButton
              onClick={onClose}
              aria-label="close"
              style={{ padding: "5px", background: "#E5E7EB" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <div className={styles.previewItems}>
            <div key={selectedItem.id} className={styles.previewMain}>
              <div className={styles.previewContent}>
                <div className={styles.previewBody}>
                  <div>
                    <h5>{selectedItem.title}</h5>
                  </div>
                  <div className={styles.previewBtn}>
                    <a href={selectedItem.action}>
                      <WestIcon />
                    </a>
                  </div>
                </div>
                <p>{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewCardDataItem;
