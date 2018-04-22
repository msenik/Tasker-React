import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../store";
import Header from "./Header";
import TaskList from "./TaskList";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{ height: "100%" }}>
          <Header />
          <TaskList />
        </div>
      </Provider>
    );
  }
}

export default App;
