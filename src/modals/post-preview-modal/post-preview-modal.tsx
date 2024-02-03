import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./post-preview.module.scss";
import ModalWrapper from "../../common/modal";

interface postPreviewModalProps {
  id: string;
  title: string;
  action: string;
  order: number;
  onClose: () => void;
  description: string;
  isPreViewOpen: boolean;
}

export const PostPreviewModal: React.FC<postPreviewModalProps> = ({
  id,
  title,
  action,
  order,
  onClose,
  description,
  isPreViewOpen,
}) => {
  return (
    <ModalWrapper open={isPreViewOpen} onClose={onClose} maxWidth="437px">
      {id && (
        <Grid container justifyContent="center">
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

            <div className={styles.previewContent}>
              <div className={styles.previewBody}>
                {/* Display item title */}
                <h5>{title}</h5>

                {/* Description */}
                {description && <p>{description}</p>}

                {/* Preview Button */}
                <div className={styles.previewBtn}>
                  <Button
                    className={styles.previewButton}
                    component={RouterLink}
                    to={action}
                  >
                    <WestIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      )}
    </ModalWrapper>
  );
};
