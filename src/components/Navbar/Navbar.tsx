import * as React from 'react'
import {
    Typography, 
    AppBar, 
    Toolbar,
    IconButton
} from '@material-ui/core';
import { 
    Menu as MenuIcon, 
} from '@material-ui/icons';

const Navbar: React.FC = () => {
    return (
      <AppBar position="sticky" color="secondary">
        <Toolbar>
        <IconButton edge="start" color="primary">
            <MenuIcon />
         </IconButton>
          <Typography variant="h6" noWrap>
            UniTalk
          </Typography>        
        </Toolbar>
      </AppBar>
    )
}

export default Navbar
