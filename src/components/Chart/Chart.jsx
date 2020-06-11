import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar, defaults } from "react-chartjs-2";
import styles from "./Chart.module.css";

defaults.global.defaultColor = "green";
console.log(defaults);

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    //console.log(dailyData);
    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        scaleFontColor: "red",

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
            borderColor: ["red"],
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
        legend: {
          labels: {
            fontColor: "white",
          },
        },
        title: {
          display: true,
          fontColor: "white",
          text: "Global Cases of Covid-19",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "white",
              },
              gridLines: {
                //color: "white",
                zeroLineColor: "white",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "white",
              },
              gridLines: {
                //color: "white",
                zeroLineColor: "white",
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
            label: "People",
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
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};
//Chart.defaults.global.defaultFontColor = "red";
export default Chart;
