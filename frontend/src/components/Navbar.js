import { useEffect, useState } from 'react';
import {
  Toolbar,
  AppBar,
  Box,
  Container,
  Link,
  IconButton,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PageLogo from './PageLogo';
import PageTitle from './PageTitle';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '../features/api/authSlice';
import { stringAvatar } from './AvatarGenerator';
import { navbar_pages } from '../utils/navbarPages';
import { checkTokenExpiration, checkAdminRole } from '../features/api/authSlice';
import NotificationsIcon from '@mui/icons-material/Notifications';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user?.emailAddress);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const user_logged_pages = [
    { name: 'Profile', link: `/profile/${user}`, icon: <AccountCircleIcon /> },
    { name: 'Rentals', link: `/rentals/${user}`, icon: <ScheduleIcon /> },
  ];

  if (isAdmin) {
    user_logged_pages.push({ name: 'Admin Rentals', link: '/adminrentals', icon: <NotificationsIcon /> });
  }

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    dispatch(checkTokenExpiration());
    dispatch(checkAdminRole());
  }, [location, dispatch]); // Trigger the effect whenever the location changes

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

  const handleLogout = () => {
    dispatch(clearCredentials());
    handleCloseUserMenu();
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: (webTheme) => webTheme.palette.primary.main }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PageLogo sx={{ pr: 1, display: { xs: 'none', md: 'flex' } }} />
          <PageTitle
            sx={{
              pr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              {navbar_pages.map((page) => (
                <MenuItem key={page.name} onClick={() => navigate(page.link)}>
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PageLogo sx={{ pr: 1, display: { xs: 'flex', md: 'none' } }} />
          <PageTitle
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navbar_pages.map((page) => (
              <Link key={page.name} href={page.link} mx={1}>
                {page.name}
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, pr: 1 }}>
            {token ? (
              <Tooltip title={user.emailAddress}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...stringAvatar(user)} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Sing In">
                <IconButton onClick={() => navigate('/signin')} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
            )}
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
              {token
                ? [
                    user_logged_pages.map((page) => (
                      <MenuItem key={page.name} onClick={() => navigate(page.link)}>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        {page.name}
                      </MenuItem>
                    )),
                    <Divider key="divider" />,
                    <MenuItem key="logout" onClick={handleLogout}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      Logout
                    </MenuItem>,
                  ]
                : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
