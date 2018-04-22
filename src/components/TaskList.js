import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { CircularProgress } from "material-ui/Progress";
import Task from "./Task";

const styles = {
  root: {
    height: "calc(100% - 64px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center "
  },
  TasksContainer: {
    height: "calc(100% - 64px)",
    overflow: "auto"
  }
};

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, tasks } = this.props;
    if (tasks.length === 0) {
      return <div className={classes.root}><CircularProgress /></div>;
    }
    const getTasks = () => {
      return tasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          status={task.status}
          username={task.username}
          email={task.email}
          text={task.text}
          img={task.image_path}
        />
      ));
    };

    return (
      <div className={classes.root}>
        <div className={classes.TasksContainer}>
          {getTasks()}
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  tasks: PropTypes.object.isRequired,
  totalTasksCount: PropTypes.number.isRequired
};

export default connect(state => ({
  isLogin: state.login,
  tasks: state.tasks,
  totalTasksCount: state.totalTasksCount
}))(withStyles(styles)(TaskList));
