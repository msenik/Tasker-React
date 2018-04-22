import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "material-ui/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "material-ui/Typography";
import Checkbox from "material-ui/Checkbox";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

const styles = {
  root: {},
  checkBox: {
    width: "24px",
    height: "24px"
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

  handleStatusChange = ev => {
    this.setState({ editableStatus: ev.target.checked });
  };

  render() {
    const { classes, isLogin, status, username, email, text, img } = this.props;
    const { isEditable, editableText, editableStatus } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Checkbox
              checked={isEditable ? editableStatus : status}
              disabled={!isEditable}
              color="default"
              className={classes.checkBox}
              onChange={this.handleStatusChange}
            />
            <Typography className={classes.heading}>
              Expansion Panel 1
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string
};

export default connect(state => ({
  isLogin: state.login
}))(withStyles(styles)(Task));
