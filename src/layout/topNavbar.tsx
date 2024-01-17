import React, { MouseEvent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import styles from './navbar.module.scss';
import { Grid } from '@mui/material';


function TopNavbar() {
   

    return (
        <Grid position="static" className={styles.topNavbar}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                </Toolbar>
            </Container>
        </Grid>
    );
}
export default TopNavbar;