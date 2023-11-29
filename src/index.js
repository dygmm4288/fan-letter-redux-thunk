import GlobalStyle from "GlobalStyle";
import store from "modules/store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
);
