import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { editTask } from "../ac";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Checkbox from "material-ui/Checkbox";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

const styles = {
  root: {
    display: "flex",
    width: "900px",
    height: "240px",
    margin: "20px"
  },
  taskContent: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "space-arround",
    width: "100%",
    height: "100%",
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  propertyBlock: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  },
  propertyTitle: {
    width: "20%"
  },
  checkBox: {
    width: "24px",
    height: "24px"
  },
  btn: {
    marginLeft: "10px"
  },
  editPropertiesBlock: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%"
  }
};

class Task extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      isEditable: false,
      editableText: "",
      editableStatus: false
    };
    this.state = { ...this.defaultState };
  }

  handleEditButtonClick = ev => {
    const { id, status, text, editTask } = this.props;
    this.setState(state => {
      if (state.isEditable) {
        editTask({
          id,
          text: state.editableText,
          status: +!!state.editableStatus
        });

        //return this.defaultState;
      } else {
        return {
          isEditable: true,
          editableText: text,
          editableStatus: status
        };
      }
    });
  };

  handleEditButtonCancel = () => {
    this.setState(this.defaultState);
  };

  handleStatusChange = ev => {
    this.setState({ editableStatus: ev.target.checked });
  };

  handleTextEdit = ev => {
    this.setState({ editableText: ev.target.value });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      isEditable: false,
      editableText: "",
      editableStatus: false
    };
  }

  render() {
    const { classes, isLogin, status, username, email, text, img } = this.props;
    const { isEditable, editableText, editableStatus } = this.state;
    const renderControls = (
      <div className={classes.editPropertiesBlock}>
        {isEditable &&
          <Button
            className={classes.btn}
            variant="raised"
            color="primary"
            onClick={this.handleEditButtonCancel}
          >
            Cancel
          </Button>}
        <Button
          className={classes.btn}
          variant="raised"
          color="primary"
          onClick={this.handleEditButtonClick}
        >
          {isEditable ? "Save" : "Edit"}
        </Button>
      </div>
    );
    return (
      <Paper className={classes.root}>
        <img src={img} />
        <div className={classes.taskContent}>
          <div className={classes.propertyBlock}>
            <Typography variant="subheading" className={classes.propertyTitle}>
              Status:
            </Typography>
            <Checkbox
              checked={isEditable ? editableStatus : status}
              disabled={!isEditable}
              color="default"
              className={classes.checkBox}
              onChange={this.handleStatusChange}
            />
          </div>
          <div className={classes.propertyBlock}>
            <Typography variant="subheading" className={classes.propertyTitle}>
              Username:
            </Typography>
            <Typography variant="body2">
              {username}
            </Typography>
          </div>
          <div className={classes.propertyBlock}>
            <Typography variant="subheading" className={classes.propertyTitle}>
              Email:
            </Typography>
            <Typography variant="body2">
              {email}
            </Typography>
          </div>
          <div className={classes.propertyBlock}>
            <Typography variant="subheading" className={classes.propertyTitle}>
              Text:
            </Typography>
            {isEditable
              ? <TextField
                  margin="normal"
                  style={{ width: "80%" }}
                  value={editableText}
                  onChange={this.handleTextEdit}
                />
              : <Typography variant="body2">
                  {text}
                </Typography>}

          </div>
          {isLogin && renderControls}
        </div>
      </Paper>
    );
  }
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string,
  editTask: PropTypes.func.isRequired
};

export default connect(
  state => ({
    isLogin: state.login
  }),
  { editTask }
)(withStyles(styles)(Task));
