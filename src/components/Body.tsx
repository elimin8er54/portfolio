import React from "react";
import NotFound from "./body/NotFound";
import Home from "./body/Home";
import Game from "./body/Game";
import About from "./body/About";
import Sample from "./body/Sample";
import styles from "../styles.scss";
import { Route, Switch } from "react-router-dom";

const Body = () => {
  /**
   * This componenet will be used to swap out other componenets as we add them
   * This is used so that we can swap the body without rerendering the header and footer
   *
   */
  return (
    <main className={styles.body}>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/sample" component={Sample} />
        <Route exact path="/" component={Home} />
        <Route exact path="/*" component={NotFound} />
      </Switch>
    </main>
  );
};

export default Body;
