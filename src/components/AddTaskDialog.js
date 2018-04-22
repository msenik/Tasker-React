import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import { saveTask, unsetSaveTaskErrorFlag } from "../ac";

const styles = {
  button: {
    marginTop: "15px"
  },
  input: {
    display: "none"
  },
  errorMesage: {
    color: "red",
    marginTop: "10px",
    fontSize: ".8em"
  }
};

class AddTaskDialog extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      username: "",
      email: "",
      text: "",
      img: ""
    };
    this.state = this.defaultState;
  }

  handleClose = ev => {
    const { onClose, unsetSaveTaskErrorFlag } = this.props;
    unsetSaveTaskErrorFlag();
    onClose();
  };

  handleSave = ev => {
    const { saveTask, onClose, saveTaskError } = this.props;
    const task = { ...this.state };
    saveTask(task);
  };

  handleInputChange = type => ev => {
    let val = ev.target.value;
    if (type === "img") {
      val = ev.target.files[0];
    }
    this.setState({ [type]: val });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.saveTaskError) {
      return {
        username: "",
        email: "",
        text: "",
        img: ""
      };
    }
  }

  render() {
    const { classes, isOpen, onClose, saveTaskError } = this.props;
    const { username, email, text, img } = this.state;

    return (
      <Dialog
        open={isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter Task properties.
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            margin="dense"
            id="username"
            label="Username"
            value={username}
            onChange={this.handleInputChange("username")}
          />
          <br />
          <TextField
            required
            fullWidth
            id="email"
            label="email"
            margin="dense"
            value={email}
            onChange={this.handleInputChange("email")}
          />
          <TextField
            required
            fullWidth
            id="text"
            label="text"
            margin="dense"
            value={text}
            onChange={this.handleInputChange("text")}
          />
          <input
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            type="file"
            onChange={this.handleInputChange("img")}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="raised"
              component="span"
              className={classes.button}
            >
              Upload immage
            </Button>

          </label>
          <div className={classes.errorMesage}>
            {saveTaskError ? `Error in fields: ${saveTaskError}!` : ""}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddTaskDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  saveTaskError: PropTypes.string.isRequired,
  unsetSaveTaskErrorFlag: PropTypes.func.isRequired
};

export default compose(
  connect(state => ({ saveTaskError: state.saveTaskError }), {
    saveTask,
    unsetSaveTaskErrorFlag
  }),
  withStyles(styles)
)(AddTaskDialog);
