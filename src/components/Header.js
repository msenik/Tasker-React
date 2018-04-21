import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { login, logout } from "../ac";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  username: {
    marginRight: "30px"
  },
  errorMesage: {
    color: "red",
    marginTop: "10px",
    fontSize: ".8em"
  }
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      username: "",
      password: "",
      errorMessage: ""
    };
  }

  handleAuthButtonClick = ev => {
    const { isLogin, logout } = this.props;
    if (isLogin) {
      logout();
    } else {
      this.setState(state => ({ isDialogOpen: true }));
    }
  };

  handleDialogClose = () => {
    this.setState(state => ({
      isDialogOpen: false,
      username: "",
      password: "",
      errorMessage: ""
    }));
  };

  handleInputChange = inputName => ev => {
    this.setState({
      [inputName]: ev.target.value
    });
  };

  handleLogin = ev => {
    const { login } = this.props;
    const { username, password } = this.state;
    const errors = [];
    if (username !== "admin") errors.push("Username is invalid");
    if (password != 123) errors.push("Password is invalid");
    if (errors.length > 0) {
      this.setState({ errorMessage: errors.join(", ") });
      ev.preventDefault();
    } else {
      console.log(login);
      login();
      this.setState({
        isDialogOpen: false,
        username: "",
        password: "",
        errorMessage: ""
      });
    }
  };

  render() {
    const { classes, isLogin } = this.props;
    const { isDialogOpen, username, password, errorMessage } = this.state;
    const renderLoginStatus = (
      <Typography variant="body1" color="inherit" className={classes.username}>
        You are loggined as Admin
      </Typography>
    );
    const renderErrorMessage = (
      <DialogContentText className={classes.errorMesage}>
        Error: {errorMessage}!
      </DialogContentText>
    );
    return (
      <Fragment>
        <Dialog
          open={isDialogOpen}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter Username and Password to login.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              label="Username"
              value={username}
              onChange={this.handleInputChange("username")}
            />
            <br />
            <TextField
              required
              id="password"
              label="Password"
              margin="dense"
              type="password"
              value={password}
              onChange={this.handleInputChange("password")}
            />
            {errorMessage && renderErrorMessage}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>

        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Tasks
              </Typography>
              {isLogin && renderLoginStatus}
              <Button color="inherit" onClick={this.handleAuthButtonClick}>
                {isLogin ? "Logout" : "Login"}
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
/*
export default compose(
  connect(
    state => ({
      isLogin: state.login
    }),
    { login, logout }
  ),
  withStyles(styles)
)(Header);
*/
export default connect(
  state => ({
    isLogin: state.login
  }),
  { login, logout }
)(withStyles(styles)(Header));
