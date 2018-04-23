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
  },
  previewBlock: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  previewImg: {
    width: "200px",
    marginRight: "10px"
  },
  previewContent: {
    width: "200px"
  }
};

class AddTaskDialog extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      username: "",
      email: "",
      text: "",
      img: "",
      showPreview: false
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
    if (!saveTaskError) {
      onClose();
    }
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

  handlePreviewClick = ev => {
    this.setState({ showPreview: !this.state.showPreview });
  };

  previewImgRef = el => {
    const { img } = this.state;
    if (!el || !img) return;
    const reader = new FileReader();
    reader.onload = function() {
      el.src = reader.result;
    };
    reader.readAsDataURL(img);
  };

  render() {
    const { classes, isOpen, onClose, saveTaskError } = this.props;
    const { username, email, text, img, showPreview } = this.state;

    const editForm = (
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
          <Button variant="raised" component="span" className={classes.button}>
            Upload immage
          </Button>

        </label>
        <div className={classes.errorMesage}>
          {saveTaskError ? `Error in fields: ${saveTaskError}!` : ""}
        </div>
      </DialogContent>
    );

    const previewBlock = (
      <DialogContent className={classes.previewBlock}>
        <div className={classes.previewImg}>
          <img width="200" ref={this.previewImgRef} />
        </div>
        <div className={classes.previewContent}>
          <Typography variant="subheading" className={classes.propertyTitle}>
            Username: {username}
          </Typography>
          <Typography variant="subheading" className={classes.propertyTitle}>
            Email: {email}
          </Typography>
          <Typography variant="subheading" className={classes.propertyTitle}>
            Text: {text}
          </Typography>
        </div>
      </DialogContent>
    );
    return (
      <Dialog
        open={isOpen}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        {showPreview ? previewBlock : editForm}
        <DialogActions>
          <Button
            onClick={this.handlePreviewClick}
            color="secondary"
            disabled={!(username && email && text && img)}
          >
            {showPreview ? "Edit" : "Preview"}
          </Button>
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
