import ReactGA from "react-ga";
import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Cards, Chart, CountryPicker } from "./components";
import NavbarComponent from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";

import styles from "./App.module.css";
import DarkModeToggle from "react-dark-mode-toggle";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import { fetchData } from "./api";
import { Toolbar } from "@material-ui/core";
//import Switch from "@material-ui/core/Switch";
//import coronaImage1 from "./images/image.png";
//import coronaImage2 from "./images/image2.png";
import final1 from "./images/final11.png";
import final2 from "./images/final22.png";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactGA.initialize("UA-169325813-1");
ReactGA.pageview("/homepage");

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const DarkModeToggler = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? "#212121" : "#EEEEEE";
  const mainSecondaryColor = darkState ? "#EEEEEE" : "#212121";
  // const imagesrc = darkState ? coronaImage2 : coronaImage1;
  const imagesrc = darkState ? final2 : final1;
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
    ReactGA.event({
      category: "User",
      action: "Toggle Dark Mode",
    });
  };

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <NavbarComponent />
          <CssBaseline />
          <Route
            exact
            path='/'
            component={AppBar}
            className={styles.appbar}
            position='static'
          >
            {/* <AppBar className={styles.appbar} position='static'> */}
            <Toolbar>
              <div className={styles.flexboxcontainer}>
                <img src={imagesrc} className={styles.image} alt='COVID-19' />
                <DarkModeToggle
                  checked={darkState}
                  onChange={handleThemeChange}
                />
              </div>
              {/* <Switch checked={darkState} onChange={handleThemeChange} /> */}
            </Toolbar>
            <App darkState={darkState} />
          </Route>
          {/* </AppBar> */}
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
            </Switch>
          </section>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      country: "",
      darkState: false,
    };
  }
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    console.log(this.props.darkState);
    return (
      <div className={styles.body}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} darkState={this.props.darkState} />
      </div>
    );
  }
}

export default DarkModeToggler;
