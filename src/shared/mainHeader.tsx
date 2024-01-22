import AddIcon from "@mui/icons-material/Add";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Button, Grid } from "@mui/material";
import React from "react";
import styles from "../pages/post/post.module.scss";
interface HeaderProps {
  checkBoxHandler: () => void;
  onAddButtonClick: () => void;
  isRandomOrderActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  checkBoxHandler,
  onAddButtonClick,
  isRandomOrderActive,
}) => {
  return (
    <Grid
      container
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Grid item xs={6}>
        <h4 className={styles.heading}>ניהול קרוסלה</h4>
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"end"} gap={1}>
        <Button
          onClick={checkBoxHandler}
          className={`secondary-btn btn-round ${
            isRandomOrderActive ? "randomBtn" : ""
          }`}
          variant="outlined"
          startIcon={<ShuffleIcon className={styles.tabMargin} />}
          color="success"
        >
          סדר אקראי
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon className={styles.tabMargin} />}
          className="primary-btn btn-round"
          color="success"
          onClick={onAddButtonClick}
        >
          הוסף פריט
        </Button>
      </Grid>
    </Grid>
  );
};
