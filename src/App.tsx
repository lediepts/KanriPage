/* eslint-disable react-hooks/rules-of-hooks */
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import Layout from "./components/layouts";
import ErrorBoundary from "./ErrorBoundary";
import Helmet from "./Helmet";

type Props = {
  pages: {
    path?: string;
    component: Parameters<typeof React.createElement>[0];
  }[];
};

// export const baseURL = "http://localhost:5000";
export const baseURL = "https://4shp-express.azurewebsites.net";
// export const baseURL = "";

export default function App({ pages = [] }: Props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#d4ad3e",
        contrastText: "#fff",
      },
      secondary: {
        main: "#f44336",
        contrastText: "#fff",
      },
    },
    overrides: {},
  });
  return (
    <ErrorBoundary>
      <Helmet />
      <ThemeProvider theme={theme}>
        <Layout>
          <ErrorBoundary>
            <Switch>
              {pages.map(({ path, component }) => (
                <Route
                  key={path || ""}
                  path={path}
                  exact
                  render={() => (
                    <Suspense fallback={<Loading />}>
                      {React.createElement(component)}
                    </Suspense>
                  )}
                />
              ))}
            </Switch>
          </ErrorBoundary>
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
const Loading = styled.div``;
