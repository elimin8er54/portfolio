import "core-js/es/map";
import "core-js/es/set";
import styles from "./styles.scss";
const ES6Promise = require("es6-promise");
ES6Promise.polyfill();
import React, { Suspense, lazy } from "react";
import Delayed from "./components/wrapper/Delayed";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Header from "./components/Header";
//import Body from "./components/Body";
const Header = lazy(() => import("./components/Header"));
const Body = lazy(() => import("./components/Body"));

import ScrollToTop from "./wrappers/ScrollToTop";
import "./prism.css";
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div></div>}>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/*">
              {/**
               * We Delay the initial millisecond because there is a scss rendering issue
               * Most likely because it gets preproccesed into the JS bundle and there
               * is some kind of order of execution issue
               */}
              <Delayed waitBeforeShow={1}>

                <Header />
                <div className={styles.mainContainer}>
                  <Body />
                </div>

              </Delayed>
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
