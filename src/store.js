import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
//import createSagaMiddleware from "redux-saga";

//const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    //applyMiddleware(sagaMiddleware, historyMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

//sagaMiddleware.run(translation);

window.store = store;
export default store;
