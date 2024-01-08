import React, { MouseEvent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../assets/images/pipelLogo.png';
import flag1 from '../assets/images/isreal.png';
import flag2 from '../assets/images/usFlag.png';
import styles from './navbar.module.scss';

type FlagType = 'HE' | 'EN';

function TopNavbar() {
    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const [currentFlag, setCurrentFlag] = useState<FlagType>('EN');

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleFlagClick = (flag: FlagType) => {
        document.body.setAttribute('dir', flag === 'HE' ? 'rtl' : 'ltr');
        setCurrentFlag(flag);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" className={styles.topNavbar}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={Logo} alt="logo" width={200} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <img
                                src={flag1}
                                width={50}
                                onClick={() => handleFlagClick('HE')}
                                style={{ cursor: 'pointer' }}
                                alt="HE"
                            />
                            <img
                                src={flag2}
                                width={50}
                                onClick={() => handleFlagClick('EN')}
                                style={{ cursor: 'pointer' }}
                                alt="Flag 2"
                            />
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mx: 4 }}>
                        <img
                            src={currentFlag === 'HE' ? flag1 : flag2}
                            width={50}
                            onClick={() => handleFlagClick(currentFlag === 'HE' ? 'EN' : 'HE')}
                            style={{ cursor: 'pointer' }}
                            alt="Current Flag"
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default TopNavbar;