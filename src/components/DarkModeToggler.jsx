import React, { useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
//import Switch from "@material-ui/core/Switch";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from "../App.module.css";
import { Toolbar, Typography } from "@material-ui/core";
import coronaImage from "../images/image.png";

const DarkModeToggler = () => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? "#212121" : "#EEEEEE";
  const mainSecondaryColor = darkState ? "#EEEEEE" : "#212121";
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
          <Typography type='title' color='inherit' style={{ flex: 1 }}>
            <div className={styles.flexboxcontainer}>
              <img src={coronaImage} className={styles.image} alt='COVID-19' />
            </div>
          </Typography>
          <DarkModeToggle checked={darkState} onChange={handleThemeChange} />

          {/* <Switch checked={darkState} onChange={handleThemeChange} /> */}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default DarkModeToggler;
