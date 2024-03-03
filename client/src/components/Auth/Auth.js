import React, { useState , useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Grid,
  Container,
  TextField,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import Icon from './Icon';
import { gapi } from "gapi-script";
import {useDispatch}  from 'react-redux'
import { authenticate , signup , login } from "../../actions/auth";
import {useNavigate} from 'react-router-dom'
export const Auth = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "223322516622-6sp0tulfob3sgd6av04qmtpkr4maghu5.apps.googleusercontent.com",
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const navigate = useNavigate();
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [formData , setFormData] = useState(initialFormData);
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if (isSignUp) {
      dispatch(signup(formData, navigate))
    }
    else {
      dispatch(login(formData, navigate))
    }
  };
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };
  const showPasswordHandler = () => {
    setPasswordShown((prevState) => !prevState);
  };
  const switchModeHandler = () => {
    setIsSignUp((prevState) => !prevState);
    setPasswordShown(false);
  };
  const googleSuccessHandler = async (res) => {
    const result = res?.profileObj       //don't throw error if the object doesn't exist
    const token = res?.tokenId
    dispatch(authenticate(result, token))
    navigate('/')
  }
  const googleFailureHandler = (error) => {
    console.log(error)
    console.log('sign in uncessussful!')
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "SignUp" : "Login"}</Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={changeHandler}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={changeHandler}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={changeHandler}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={changeHandler}
              type={passwordShown ? "text" : "password"}
              handleShowPassword={showPasswordHandler}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={changeHandler}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          <GoogleLogin
            clientId="223322516622-6sp0tulfob3sgd6av04qmtpkr4maghu5.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Login
              </Button>
            )}
            onSuccess={googleSuccessHandler}
            onFailure={googleFailureHandler}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchModeHandler}>
                {isSignUp
                  ? "Already have an account ? Login"
                  : "Don't have an account ? SignUp"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Auth;
