import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";
import { FadeTransform } from "react-animation-components";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }
  return (
    <div className={styles.container}>
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Grid container spacing={3} justify='center'>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.infected)}
          >
            <CardContent>
              <Typography gutterBottom>Total Cases</Typography>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={confirmed.value}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography>{new Date(lastUpdate).toDateString()}</Typography>
              <Typography variant='body2'>
                Number of Cases of Covid-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.recovered)}
          >
            <CardContent>
              <Typography gutterBottom>Recovered</Typography>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={recovered.value}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography>{new Date(lastUpdate).toDateString()}</Typography>
              <Typography variant='body2'>
                Number of recoveries from Covid-19
              </Typography>
            </CardContent>
          </Grid>
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.death)}
          >
            {" "}
            <CardContent>
              <Typography gutterBottom>Deaths</Typography>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={deaths.value}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography>{new Date(lastUpdate).toDateString()}</Typography>
              <Typography variant='body2'>
                Number of deaths caused by Covid-19
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </FadeTransform>
    </div>
  );
};

export default Cards;
