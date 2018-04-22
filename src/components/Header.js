import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { login, logout, sortParamsChange, currentPageChange } from "../ac";
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
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import AddTaskDialog from "./AddTaskDialog";

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
  },
  sortParamsSelect: {
    width: "150px",
    marginLeft: "10px"
  },
  pageSelect: {
    width: "50px",
    marginLeft: "10px",
    marginRight: "10px"
  },
  addTaskBtn: {
    marginLeft: "30px"
  }
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddTaskDialogOpen: false,
      isDialogOpen: false,
      username: "",
      password: "",
      errorMessage: ""
    };
  }

  handleAddTaskClick = ev => {
    this.setState({ isAddTaskDialogOpen: true });
  };

  handleAddTaskDialogClose = ev => {
    this.setState({ isAddTaskDialogOpen: false });
  };

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
      login();
      this.setState({
        isDialogOpen: false,
        username: "",
        password: "",
        errorMessage: ""
      });
    }
  };

  handleSortParamsChange = ev => {
    const { sortParamsChange } = this.props;
    sortParamsChange(ev.target.value);
  };

  handleCurrentPageChange = ev => {
    const { currentPageChange } = this.props;
    currentPageChange(ev.target.value);
  };

  render() {
    const {
      classes,
      isLogin,
      sortParam,
      totalTasksCount,
      currentPage
    } = this.props;
    const {
      isAddTaskDialogOpen,
      isDialogOpen,
      username,
      password,
      errorMessage
    } = this.state;
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
    const getPages = () => {
      const arr = [];
      for (let i = 1; i <= totalTasksCount; i++) {
        arr.push(<MenuItem value={i}> {i} </MenuItem>);
      }
      return arr;
    };
    return (
      <Fragment>
        <AddTaskDialog
          isOpen={isAddTaskDialogOpen}
          onClose={this.handleAddTaskDialogClose}
        />
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
                <Button
                  variant="raised"
                  color="primary"
                  className={classes.addTaskBtn}
                  onClick={this.handleAddTaskClick}
                >
                  Add Task
                </Button>
              </Typography>

              <Typography
                variant="body2"
                color="inherit"
                className={classes.flex}
              >
                Sort by:
                <Select
                  value={sortParam}
                  className={classes.sortParamsSelect}
                  onChange={this.handleSortParamsChange}
                >
                  <MenuItem value={0}>
                    Username ↑
                  </MenuItem>
                  <MenuItem value={1}>
                    Username ↓
                  </MenuItem>
                  <MenuItem value={2}>
                    Email ↑
                  </MenuItem>
                  <MenuItem value={3}>
                    Email ↓
                  </MenuItem>
                  <MenuItem value={4}>
                    Status ↑
                  </MenuItem>
                  <MenuItem value={5}>
                    Status ↓
                  </MenuItem>
                </Select>
              </Typography>

              <Typography
                variant="body2"
                color="inherit"
                className={classes.flex}
              >
                Page:
                <Select
                  value={currentPage}
                  className={classes.pageSelect}
                  onChange={this.handleCurrentPageChange}
                >
                  {getPages()}
                </Select>
                from {totalTasksCount}
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
  logout: PropTypes.func.isRequired,
  sortParamsChange: PropTypes.func.isRequired,
  currentPageChange: PropTypes.func.isRequired,
  sortParam: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalTasksCount: PropTypes.number.isRequired
};

export default compose(
  connect(
    state => ({
      isLogin: state.login,
      sortParam: state.tastsVisibleParams.sort,
      currentPage: state.tastsVisibleParams.page,
      totalTasksCount: state.totalTasksCount
    }),
    { login, logout, sortParamsChange, currentPageChange }
  ),
  withStyles(styles)
)(Header);
