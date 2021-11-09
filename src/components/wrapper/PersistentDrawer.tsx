import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import PeopleIcon from "@material-ui/icons/People";
import Gaming from "@material-ui/icons/SportsEsports";
import Chart from "@material-ui/icons/BarChart";
import HouseIcon from "@material-ui/icons/House";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/School";
import InstagramIcon from "@material-ui/icons/Github";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useHistory } from "react-router-dom";
import styles from "../../styles.scss"
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "black",
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);


const PersistentDrawer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (location: string) => {
    history.push(location);
    setAnchorEl(null);
  };
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            /*style={{ margin: "auto", width: "50%", overflow: "initial" }}*/ variant="h6"
            noWrap
          >
            <NavLink exact={true} className={styles.buttonelogo} to="/">
              Shaunt Keshishian
            </NavLink>

            <span className={styles.headerIconsMobile}>

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

          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        onClick={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />

        <>
          <NavLink exact={true} activeStyle={{ color: "red" }} style={{ color: "black", textDecoration: "none" }} to={"/"}>
            <ListItem button key={"Home"}>
              <ListItemIcon>
                <HouseIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </NavLink>
          <NavLink activeStyle={{ color: "red" }} style={{ color: "black", textDecoration: "none" }} to={"/about"}>
            <ListItem button key={"About"}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItem>
          </NavLink>
          <NavLink activeStyle={{ color: "red" }} style={{ color: "black", textDecoration: "none" }} to={"/game"}>
            <ListItem button key={"Game"}>
              <ListItemIcon>
                <Gaming />
              </ListItemIcon>
              <ListItemText primary={"Game"} />
            </ListItem>
          </NavLink>
          <NavLink activeStyle={{ color: "red" }} style={{ color: "black", textDecoration: "none" }} to={"/sample"}>
            <ListItem button key={"Sample"}>
              <ListItemIcon>
                <Chart />
              </ListItemIcon>
              <ListItemText primary={"Sample"} />
            </ListItem>
          </NavLink>
          <a className={styles.buttoneheader} href={require("../../../public/Shaunt-CS-Resume.pdf")} download>
            <ListItem button key={"Resume"}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Resume"} />
            </ListItem>
          </a>

        </>
      </Drawer>
    </div>
  );
};
export default PersistentDrawer;
