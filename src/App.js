import React, { Component, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import DarkModeToggle from "react-dark-mode-toggle";

import { fetchData } from "./api";
import { Toolbar, Typography } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import coronaImage1 from "./images/image.png";
import coronaImage2 from "./images/image2.png";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";

const DarkModeToggler = () => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? "#212121" : "#EEEEEE";
  const mainSecondaryColor = darkState ? "#EEEEEE" : "#212121";
  const imagesrc = darkState ? coronaImage2 : coronaImage1;

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
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar className={styles.appbar} position='static'>
        <Toolbar>
          <div className={styles.flexboxcontainer}>
            <img src={imagesrc} className={styles.image} alt='COVID-19' />

            <DarkModeToggle checked={darkState} onChange={handleThemeChange} />
          </div>

          {/* <Switch checked={darkState} onChange={handleThemeChange} /> */}
        </Toolbar>
        <App darkState={darkState} />
      </AppBar>
    </ThemeProvider>
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
