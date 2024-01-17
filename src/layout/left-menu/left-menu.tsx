import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/pipelLogo.png';
import carouselMenu from '../../assets/icons/carouselMenu.svg'
import postMenu from '../../assets/icons/postMenu.svg'
export default function LeftMenu() {
  return (
    <>
     <Grid item display={'flex'} justifyContent={'center'} spacing={2} padding={3}>
     <img src={Logo} alt="logo" width={200} />
     </Grid>
    <List>
      <ListItem key='פוסטים'  disablePadding component={Link} to="/home/carousel" >
        <ListItemButton style={{textAlign:'right',color:'#5D5D5D'}} >
          <ListItemIcon>
            <img src={carouselMenu} alt="" />
          </ListItemIcon>
          <ListItemText primary='פוסטים' />
        </ListItemButton>
      </ListItem>
      <ListItem key='קרוסלה' disablePadding component={Link} to="/home/post" >
        <ListItemButton style={{textAlign:'right',color:'#5D5D5D'}}>
          <ListItemIcon>
            <img src={postMenu} alt="" />
          </ListItemIcon>
          <ListItemText primary='קרוסלה' />
        </ListItemButton>
      </ListItem>
  </List>
    </>
    
  )
}
