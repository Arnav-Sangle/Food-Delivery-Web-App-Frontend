import ReactDOM from "react-dom"; // Modified import for React 17
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

// https://www.npmjs.com/package/react-alert
import { Provider as AlertProvider, transitions, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Optional configuration (Copied from https://www.npmjs.com/package/react-alert)
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
};

ReactDOM.render( // Modified for React 17
  <Provider store={store}>
    {/* To connect Store to React app, we use <Provider> */}
    <AlertProvider template={AlertTemplate} {...options}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </AlertProvider>
  </Provider>,
  document.getElementById("root") // Modified for React 17
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
