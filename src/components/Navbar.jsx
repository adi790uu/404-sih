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

const linkCss = {
  textDecoration:'none',
  // backgroundColor:'white',
  color:'white',
  padding:'10px',
  borderRadius:'10px',
  paddingTop:'5px',
  paddingBottom:'5px'
}

const logoutCss ={
  padding:'10px',
  backgroundColor:'red',
  color:'white',
  borderRadius:'12px',
  border:0,
  fontSize:'13px',
  fontWeight:'600',
  marginRight:'30px',
  marginLeft:'30px',
  // paddingTop:'7px',
  // paddingBottom:'7px'
}

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
  // console.log('-->>>', user);

  const handleLogout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/signin');
    setUser(null);
    localStorage.removeItem('profile');
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      {/* <Container maxWidth="xl"> */}
        <Toolbar disableGutters style={{display:'flex', justifyContent:'space-between'}}>
          <div>
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
              marginLeft:'25px'
            }}
          >
            404 Help Found.gov.in
          </Typography>
          </div>
          <div>
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
          </div>
          <div>
          <Button>
            <Link to="/workersignin" style={linkCss}>Worker</Link>
          </Button>
          {/* <Button>
            <Link to="/workersignup" style={linkCss}>worker Sign up</Link>
          </Button> */}
          <Button>
            <Link to="/agencysignin" style={linkCss}>Agency</Link>
          </Button>
          {/* <Button>
            <Link to="/agencysignup" style={linkCss}>Agency Sign up</Link>
          </Button> */}
          <Button>
            <Link to="/signin" style={linkCss}>User</Link>
          </Button>

          {/* <Button>
            <Link to="/signup" style={linkCss}>user Sign up</Link>
          </Button> */}
          <button onClick={handleLogout} style={logoutCss}>Logout</button>
          </div>
          
        </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
export default Navbar;
