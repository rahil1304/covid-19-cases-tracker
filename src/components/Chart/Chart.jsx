import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({
  data: { confirmed, recovered, deaths },
  country,
  darkState,
}) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    //console.log(dailyData);
    fetchAPI();
  }, []);
  const darkorlight = darkState ? "white" : "black";

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        scaleFontColor: "rgba(240, 21, 21, 0.849)",

        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Global Cases",
            borderColor: "#3333ff",
            borderWidth: 3,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            borderWidth: 3,
            fill: false,
            lineTension: 0.1,
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: darkorlight,
          },
        },
        title: {
          display: true,
          fontColor: darkorlight,
          text: "Global Cases of Covid-19",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: darkorlight,
              },
              gridLines: {
                //color: {darkorlight},
                zeroLineColor: darkorlight,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: darkorlight,
              },
              gridLines: {
                //color: {darkorlight},
                zeroLineColor: darkorlight,
              },
            },
          ],
        },
      }}
    />
  ) : null;

  //console.log(confirmed, recovered, deaths);
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Total Cases", "Recovered", "Deaths"],
        datasets: [
          {
            label: "Total Covid-19 Cases",
            display: true,
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "#17e239c4",
              "rgba(240, 21, 21, 0.849)",
            ],

            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: darkorlight,
          },
        },
        title: {
          display: true,
          text: `Current state in ${country}`,
          fontColor: darkorlight,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: darkorlight,
              },
              gridLines: {
                //color: {darkorlight},
                zeroLineColor: darkorlight,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: darkorlight,
              },
              gridLines: {
                //color: {darkorlight},
                zeroLineColor: darkorlight,
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
