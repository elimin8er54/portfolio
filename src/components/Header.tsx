import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles.scss";
import GetAppIcon from '@material-ui/icons/GetApp';
import PresistentDrawer from "./wrapper/PersistentDrawer";
import FacebookIcon from "@material-ui/icons/School";
import InstagramIcon from "@material-ui/icons/Github";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const Header = () => {

  return (

    <>

      <header className={styles.header}>

        <div className={styles.headerFlexLeft}>
          <div className={styles.headerFlexLeftInner}>
            <NavLink exact={true} className={styles.buttonelogo} to="/">
              Shaunt Keshishian
            </NavLink>
            <span className={styles.headerIcons}>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/elimin8er54"
              >
                <InstagramIcon fontSize={"large"} />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.credly.com/users/shaunt-keshishian/badges"
              >
                <FacebookIcon fontSize={"large"} />
              </a>

              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/shaunt-keshishian"
              >
                <LinkedInIcon fontSize={"large"} />
              </a>
            </span>
          </div>
        </div>
        <div className={styles.headerFlexRight}>
          <div className={styles.headerFlexRightInner}>
            <NavLink exact={true} activeStyle={{ color: "red" }} className={styles.buttoneheader} to="/">
              Home
            </NavLink>
            <NavLink activeStyle={{ color: "red" }} className={styles.buttoneheader} to="/about">
              About Me
            </NavLink>
            <NavLink activeStyle={{ color: "red" }} className={styles.buttoneheader} to="/game">
              Game
            </NavLink>
            <NavLink activeStyle={{ color: "red" }} className={styles.buttoneheader} to="/sample">
              Sample
            </NavLink>
            <a style={{ display: "flex" }} className={styles.buttoneheader} href={require("../../public/Shaunt-CS-Resume.pdf")} download>
              <div style={{ width: "80%" }}>  Resume </div>    <div style={{ width: "10%", marginTop: "6px", marginRight: "20px" }}>  <GetAppIcon /> </div>
            </a>
          </div>
        </div>
      </header >
      <header className={styles.mobileHeader}>
        < PresistentDrawer />
      </header>
    </>
  );
};

export default Header;
