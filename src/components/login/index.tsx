/* eslint-disable react-hooks/rules-of-hooks */
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import MoodIcon from "@material-ui/icons/Mood";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../App";
import { useRouter } from "../../hooks";
import { UserAgentApplication } from "msal";
import { config } from "../../util/Config";
import { getUserDetails } from "../../GraphService";
import { random } from "../../util";

interface State {
  user: string;
  password: string;
  showPassword: boolean;
}
export default function index() {
  const [cookies, setCookie] = useCookies();
  const { history } = useRouter();
  const IphoneWidth = useMediaQuery("(max-width:500px)");
  const user = cookies.__token;
  const ip = useSelector((s) => s.ui.ipClient);
  const [values, setValues] = React.useState<State>({
    user: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleLogin = async (azure?: string) => {
    if (!azure) {
      await axios
        .post(baseURL + "/user/login", {
          azure: false,
          ip: ip,
          user: {
            email: values.user,
            password: values.password,
          },
        })
        .then(function (response) {
          if (response.data.login === "success") {
            dispatch({
              type: "UI.User",
              payload: response.data.user,
            });
            dispatch({
              type: "UI.AddMessage",
              payload: {
                key: random(),
                type: "success",
                message: "Login success",
              },
            });
            history.push("/admin");
            setCookie("__token", response.data.token, {
              path: "/",
              maxAge: 60 * 60 * 24,
            });
          } else {
            dispatch({
              type: "UI.AddMessage",
              payload: {
                key: random(),
                type: "error",
                message: "ログインが失敗しました。",
              },
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      //todo
      await login();
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (user) {
      history.push("/admin");
    }
  }, [user, history]);
  const dispatch = useDispatch();
  const classes = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      form: {
        width: `${IphoneWidth ? "90vw" : "700px"}`,
        marginTop: "10vh",
        padding: "50px 30px",
        border: "1px solid #eee",
        boxShadow: theme.shadows[5],
      },
      margin: {
        margin: theme.spacing(1),
      },
      row: {
        width: "100%",
        margin: theme.spacing(3, 1),
      },
      labelInput: {
        fontSize: 24,
        top: -10,
      },
      buttonlogin: {
        margin: "10px auto",
        width: "80%",
        padding: theme.spacing(1),
        fontSize: 24,
      },
      buttonloginAzure: {
        margin: "20px auto",
        width: "80%",
        padding: theme.spacing(1),
        fontSize: 14,
      },
      input: {
        marginTop: "24px !important",
      },
    })
  )();

  const userAgent = new UserAgentApplication({
    auth: {
      clientId: config.appId,
      redirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
    },
  });
  async function getAccessToken(scopes: string[]): Promise<string> {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token
      var silentResult = await userAgent.acquireTokenSilent({
        scopes: scopes,
      });

      return silentResult.accessToken;
    } catch (err) {
      // If a silent request fails, it may be because the user needs
      // to login or grant consent to one or more of the requested scopes
      throw err;
    }
  }
  async function login() {
    try {
      // Login via popup
      await userAgent.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });
      // After login, get the user's profile
      await getUserProfile();
    } catch (err) {
      dispatch({
        type: "UI.AddMessage",
        payload: {
          key: random(),
          type: "error",
          message: "ログインが失敗しました。",
        },
      });
    }
  }

  async function getUserProfile() {
    try {
      var accessToken = await getAccessToken(config.scopes);

      if (accessToken) {
        // Get the user's profile from Graph
        var user = await getUserDetails(accessToken);
        await axios
          .post(baseURL + "/user/login", {
            azure: true,
            ip: ip,
            user: {
              id: user.id,
              displayName: user.displayName,
              email: user.mail,
              givenName: user.givenName,
              surname: user.surname,
            },
          })
          .then(function (response) {
            if (response.data.login === "success") {
              dispatch({
                type: "UI.User",
                payload: response.data.user,
              });
              dispatch({
                type: "UI.AddMessage",
                payload: {
                  key: random(),
                  type: "success",
                  message: "Login success",
                },
              });
              history.push("/admin");
              setCookie("__token", response.data.token, {
                path: "/",
                maxAge: 60 * 60 * 24,
              });
            } else {
              dispatch({
                type: "UI.AddMessage",
                payload: {
                  key: random(),
                  type: "error",
                  message: "アクセスの権限がありません。",
                },
              });
            }
          })
          .catch(function (error) {
            console.log(error);
            dispatch({
              type: "UI.AddMessage",
              payload: {
                key: random(),
                type: "error",
                message: "ログインが失敗しました。",
              },
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getIP() {
    await axios.get("https://api.ipify.org/?format=json").then(function (res) {
      dispatch({
        type: "UI.GETIP",
        payload: res.data.ip,
      });
    });
  }

  useEffect(() => {
    getIP();
  }, []);

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <h2>Welcome to Admin Panel</h2>
        <br />
        {/* <FormControl className={classes.row}>
          <InputLabel htmlFor="userlogin" className={classes.labelInput}>
            User
          </InputLabel>
          <Input
            className={classes.input}
            id="userlogin"
            type="text"
            value={values.user}
            onChange={handleChange("user")}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={classes.row}>
          <InputLabel htmlFor="passwordlogin" className={classes.labelInput}>
            Password
          </InputLabel>
          <Input
            className={classes.input}
            id="passwordlogin"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonlogin}
          startIcon={<MoodIcon />}
          onClick={() => handleLogin()}
        >
          Sign in
        </Button> */}
        <Button
          variant="outlined"
          color="secondary"
          className={classes.buttonloginAzure}
          onClick={() => handleLogin("azure")}
        >
          Sign in with Microsoft Azure Acount
        </Button>
      </form>
    </div>
  );
}
