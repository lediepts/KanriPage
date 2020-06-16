import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import React, { lazy } from "react";
import { GlobalStyle } from "./theme";
import App from "./App";
import NotFound from "./not-found";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import createStoreProvider from "./createStoreProvider";
import { rootReducer } from "./modules";
import DateFnsUtils from "@date-io/date-fns";

const { Provider } = createStoreProvider(rootReducer);

const pages: React.ComponentProps<typeof App>["pages"] = [
  { path: "/", component: () => <Redirect to="/admin" /> },
  { path: "/admin", component: lazy(() => import("./pages/admin")) },
  { path: "/admin/login", component: lazy(() => import("./pages/login")) },
  { path: "/admin/recruit", component: lazy(() => import("./pages/recruit")) },
  { path: "/admin/news", component: lazy(() => import("./pages/news")) },
  { component: NotFound },
];

ReactDOM.render(
  <Provider>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CookiesProvider>
        <GlobalStyle />
        <Router>
          <App pages={pages} />
        </Router>
      </CookiesProvider>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);
