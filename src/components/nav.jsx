import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import bitquizLogo from "../assets/logos.png"
import avatar from "../assets/avatar.png"

import { Link } from 'react-router-dom';


const pages = ['Shop', 'Play'];
const settings = ['Profile','Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#361E70"  }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack sx={{ display: {xs: "none", md: "flex"}}}>
          <img
         src={bitquizLogo}
         style={{height: "140px"}}
         />
          </Stack>
      

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                     <Button
      key={page}
      component={Link} // Link bileşenine dönüştür
      to={`/${page.toLowerCase()}`} // Sayfa adresini belirt
 
    >
      {page}
    </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Stack sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: "center", mr: 12}}>
  <img
    src={bitquizLogo}
    style={{height: "100px"}}
  />
</Stack>

     
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
  {pages.map((page) => (
    <Button
      key={page}
      component={Link} // Link bileşenine dönüştür
      to={`/${page.toLowerCase()}`} // Sayfa adresini belirt
      sx={{ my: 2, color: 'white', display: 'block' }}
    >
      {page}
    </Button>
  ))}
</Box>


<Box sx={{ flexGrow: 0 }}>
  <Tooltip title="Open settings">
    <IconButton component={Link} onClick={handleOpenUserMenu} to="/profile" sx={{ p: 0 }}>
      <Avatar sizes='40px' alt="Remy Sharp" src={avatar} />
    </IconButton>
  </Tooltip>
  <Menu
    sx={{ mt: '45px' }}
    id="menu-appbar"
    anchorEl={anchorElUser}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={Boolean(anchorElUser)}
    onClose={handleCloseUserMenu}
  >
    {settings.map((setting) => (
      <MenuItem key={setting} onClick={handleCloseUserMenu}>
        <Typography textAlign="center">{setting}</Typography>
      </MenuItem>
    ))}
  </Menu>
</Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
