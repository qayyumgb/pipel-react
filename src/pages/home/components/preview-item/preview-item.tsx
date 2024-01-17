import React from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./preview-item.module.scss";

interface CommonPreviewItemProps {
    id: string;
    title: string;
    action: string;
    order: number;
}

interface PreviewItemProps extends CommonPreviewItemProps {
    onClose: () => void;
    description?: string;
    image?: string;
}

const PreviewItem: React.FC<PreviewItemProps> = ({
    id,
    title,
    action,
    description,
    image,
    onClose,
}) => {
    return (
        <>
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
                        <div
                            className={styles.previewMain}
                            style={{ backgroundImage: image ? `url(${image})` : "none", height: "360px" }}
                        >
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
                    </div>
                </Grid>
            )}
        </>
    );
};

export default PreviewItem;
