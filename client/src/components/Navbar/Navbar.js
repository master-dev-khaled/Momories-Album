import React, { Fragment, useState, useEffect } from "react";
import { Typography , AppBar, Toolbar, Avatar, Button } from "@material-ui/core";
import {Link, Outlet} from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from './styles'
import memories from "../../images/memories.png"
import { jwtDecode } from "jwt-decode";
import { useNavigate , useLocation} from "react-router-dom";
import { logout } from "../../actions/auth";
const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
    setUser(null)
  }
  useEffect(() => {
        const token = user?.token
        if (token) {
            const decodeToken = jwtDecode(token)
            if (decodeToken.exp*1000 > new Date().getTime()) {
                logoutHandler()
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  return (
    <Fragment>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>
            </div>
            <img className={classes.image} src={memories} alt="icon" height="60" />
            <Toolbar className={classes.toolbar}>
                {user?.result?.name ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logoutHandler} >Logout</Button>
                    </div>
                ): (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
        <main>
            <Outlet />
        </main>
    </Fragment>
  );
}
export default Navbar
