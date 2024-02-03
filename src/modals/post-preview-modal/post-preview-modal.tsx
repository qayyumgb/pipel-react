import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./post-preview.module.scss";
import { PostCard } from "../../interfaces/postCard";
import ModalWrapper from "../../common/modal";

interface PostAddedProps {
  isShow: boolean;
  postData: PostCard[];
  selectedItemId: any;
  onClose: () => void;
}

const PreviewPostlItem: React.FC<PostAddedProps> = ({
  isShow,
  postData,
  selectedItemId,
  onClose,
}) => {
  const selectedItem = postData.find((item) => item.id === selectedItemId);

  return (
    <ModalWrapper maxWidth="641px" open={isShow} onClose={onClose}>
      <Grid container justifyContent="center">
        {selectedItem && (
          <div style={{ width: "100%" }}>
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
            <div className={styles.previewContainer}>
              <div className={styles.previewItems}>
                <div
                  className={styles.previewMain}
                  style={{

                    maxHeight: "360px",
                  }}
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
                    <p>{selectedItem.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Grid>
    </ModalWrapper>
  );
};

export default PreviewPostlItem;
