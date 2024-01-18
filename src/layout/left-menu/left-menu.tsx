import React from 'react';
import {Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, colors} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import Logo from '../../assets/images/pipelLogo.png';
import carouselMenu from '../../assets/icons/carouselMenu.svg';
import postMenu from '../../assets/icons/postMenu.svg';
import {PostsIcon} from "../../icons/posts-icon";
import {CarouselIcon} from "../../icons/carousel-icon";

export default function LeftMenu() {
    const location = useLocation();

    const isActive = (targetUrl: string) => {
        return location.pathname === targetUrl;
    };

    return (
        <>
            <Grid item display={'flex'} justifyContent={'center'} spacing={2} padding={3}>
                <img src={Logo} alt="logo" width={200}/>
            </Grid>
            <List>
                <ListItem key='פוסטים' disablePadding component={Link} to="/home/carousel"
                          className={isActive('/home/carousel') ? 'active' : 'menuItem'}>
                    <ListItemButton style={{textAlign: 'right', color: '#5D5D5D'}}>
                        <ListItemIcon>
                            <PostsIcon/>
                        </ListItemIcon>
                        <ListItemText primary='קרוסלה'/>
                    </ListItemButton>
                </ListItem>
                <ListItem key='קרוסלה' disablePadding component={Link} to="/home/post"
                          className={isActive('/home/post') ? 'active' : 'menuItem'}>
                    <ListItemButton style={{textAlign: 'right', color: '#5D5D5D'}}>
                        <ListItemIcon>
                            <CarouselIcon/>
                        </ListItemIcon>
                        <ListItemText primary='פוסטים'/>
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );
}
