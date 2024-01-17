import React from 'react';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, colors } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/pipelLogo.png';
import carouselMenu from '../../assets/icons/carouselMenu.svg';
import postMenu from '../../assets/icons/postMenu.svg';

export default function LeftMenu() {
  const location = useLocation();

  const isActive = (targetUrl: string) => {
    return location.pathname === targetUrl;
  };

  return (
    <>
      <Grid item display={'flex'} justifyContent={'center'} spacing={2} padding={3}>
        <img src={Logo} alt="logo" width={200} />
      </Grid>
      <List>
        <ListItem key='פוסטים' disablePadding component={Link} to="/home/carousel" className={isActive('/home/carousel') ? 'active' : 'menuItem'}>
          <ListItemButton style={{ textAlign: 'right', color: '#5D5D5D' }}>
            <ListItemIcon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1H2C1.44772 1 1 1.44772 1 2V6C1 6.55228 1.44772 7 2 7H6C6.55228 7 7 6.55228 7 6V2C7 1.44772 6.55228 1 6 1Z" stroke="#5D5D5D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 1H12C11.4477 1 11 1.44772 11 2V6C11 6.55228 11.4477 7 12 7H16C16.5523 7 17 6.55228 17 6V2C17 1.44772 16.5523 1 16 1Z" stroke="#5D5D5D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 11H2C1.44772 11 1 11.4477 1 12V16C1 16.5523 1.44772 17 2 17H6C6.55228 17 7 16.5523 7 16V12C7 11.4477 6.55228 11 6 11Z" stroke="#5D5D5D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 11H12C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17H16C16.5523 17 17 16.5523 17 16V12C17 11.4477 16.5523 11 16 11Z" stroke="#5D5D5D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </ListItemIcon>
            <ListItemText primary='פוסטים' />
          </ListItemButton>
        </ListItem>
        <ListItem key='קרוסלה' disablePadding component={Link} to="/home/post" className={isActive('/home/post') ? 'active' : 'menuItem'}>
          <ListItemButton style={{ textAlign: 'right', color: '#5D5D5D' }}>
            <ListItemIcon>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 8V11C17 11.7956 16.6839 12.5587 16.1213 13.1213C15.5587 13.6839 14.7956 14 14 14H5L1 18V5C1 4.20435 1.31607 3.44129 1.87868 2.87868C2.44129 2.31607 3.20435 2 4 2H11" stroke="#5D5D5D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 1H18V5" stroke="#5D5D5D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13 6L18 1" stroke="#5D5D5D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </ListItemIcon>
            <ListItemText primary='קרוסלה' />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
