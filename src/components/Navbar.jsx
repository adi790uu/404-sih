import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { agencysignin } from '../actions/auth';
import * as actionType from '../constants/actionTypes';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [navigate]);
  // console.log('-->>>', user?.email);
  console.log('-->>>', user);

  const handleLogout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/signin');
    setUser(null);
    localStorage.removeItem('profile');
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            404 Help Found.gov.in
          </Typography>

          <Button>
            <Link to="/workersignin">worker Sign In</Link>
          </Button>
          <Button>
            <Link to="/workersignup">worker Sign up</Link>
          </Button>
          <Button>
            <Link to="/signin">user Sign In</Link>
          </Button>

          <Button>
            <Link to="/signup">user Sign up</Link>
          </Button>

          {user && (
            <div>
              {user?.email && (
                <Typography>
                  {user && user?.email
                    ? `Email: ${user?.email}`
                    : 'Not logged in'}
                </Typography>
              )}
              {user?.agencyName && (
                <Typography>
                  {user && user?.agencyName
                    ? `Agency Name: ${user?.agencyName}`
                    : 'Not agency logged in'}
                </Typography>
              )}
            </div>
          )}

          <button onClick={handleLogout}>Logout</button>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
