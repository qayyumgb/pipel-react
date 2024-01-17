import { Outlet } from "react-router-dom";

import TopNavbar from "./topNavbar";
import LeftMenu from "./left-menu/left-menu";
import { Grid } from "@mui/material";
import styles from "./layout.module.scss";
import { Padding } from "@mui/icons-material";

const Index = () => {
  return (
    <Grid container className={styles.mainContainerWrapper}>
      <Grid item md={3} xs={3} className={styles.leftMenuWrapper}>
        <LeftMenu />
      </Grid>
      <Grid item md={9} xs={3} className={styles.containerWrapper}>
        <TopNavbar />
        <div style={{ paddingTop: 30 }}>
          <Outlet />
        </div>
      </Grid>
    </Grid>
  );
};

export default Index;
