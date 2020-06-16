import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Logo from "./logo";
import { useRouter } from "../../hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      "& .MuiIconButton-root": {
        borderRadius: 0,
      },
      "& .MuiAppBar-colorPrimary": {
        backgroundColor: "#d4ad3e",
      },
    },
    logo: {
      height: 70,
      padding: 4,
      cursor: "pointer",
      overflow: "hidden",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      paddingLeft: theme.spacing(2),
    },
    username: {
      margin: theme.spacing(0, 1),
      fontSize: 16,
    },
    userMenuContainer: {
      position: "relative",
    },
    userMenu: {
      position: "absolute",
      top: 70,
      right: 0,
      padding: 4,
      zIndex: 1000,
      background: "#d4ad3e",
      boxShadow: theme.shadows[10],
      borderRadius: 4,
    },
    orange: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

export default function MenuAppBar() {
  const user = useSelector((s) => s.ui.user);
  const classes = useStyles();
  const [cookies, setCookie] = useCookies();
  const [open, setOpen] = React.useState(false);
  const ipadWidth = useMediaQuery("(min-width:1024px)");

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const removeAllCookies = () => {
    Object.keys(cookies).forEach((key) => {
      setCookie(key, "", { path: "/", maxAge: 1 });
    });
  };
  const handleLogout = (e: React.MouseEvent<EventTarget>) => {
    e.stopPropagation();
    // setCookie("__token", "", { path: "/", maxAge: 1 });
    removeAllCookies();
    handleClose();
  };
  const { history } = useRouter();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* {user && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )} */}
          <div
            className={classes.logo}
            onClick={() => {
              history.push("/");
            }}
          >
            {/* <Logo /> */}
            <img
              src="/images/four-seasons.jpg"
              height="62px"
              style={{ width: "auto", borderRadius: 4 }}
            />
          </div>
          <Typography variant="h5" className={classes.title}>
            {ipadWidth && `Admin-console`}
          </Typography>
          {user && (
            <div className={classes.userMenuContainer}>
              {cookies.__token && (
                <IconButton
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  color="inherit"
                >
                  {/* <Avatar
                    alt="Remy Sharp"
                    src="https://thuthuatnhanh.com/wp-content/uploads/2019/10/anh-avatar-soai-ca-superman.jpg"
                  /> */}
                  <Avatar className={classes.orange}>
                    {user.displayName?.substring(0, 1).toUpperCase()}
                  </Avatar>
                  <span className={classes.username}>
                    {user.email || user.id || user._id}
                  </span>
                </IconButton>
              )}
              {open && (
                <div className={classes.userMenu}>
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      right: 0,
                      width: "100vw",
                      height: "100vh",
                    }}
                    onClick={() => {
                      handleClose();
                    }}
                  ></div>
                  <MenuList>
                    {/* <MenuItem
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Account Controls
                    </MenuItem> */}
                    <MenuItem onClick={handleLogout} style={{ width: 160 }}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </div>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
