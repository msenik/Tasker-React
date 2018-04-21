import React, { Component } from "react";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Header isLogin={false} />
        </div>
      </Provider>
    );
  }
}

export default App;
