import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Title, Tooltip, Filler, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Title, Legend, Tooltip, Filler, LineController, BarController);

const useStyles = makeStyles({
  chartBody: {
    backgroundColor: 'white',
    borderRadius: '30px',
    border: 'solid 1px grey',
    padding: '3% 3%',
    boxShadow: '0 0 10px 0 rgb(213 213 213 / 28%)'
  },
  selTimeWrap: {
    marginBottom: '20px !important',
    display: 'flex',
    justifyContent: 'end',
    padding: '1%',
    "@media (max-width: 600px)": {
      justifyContent: 'center !important',
    }
  },
  infoItem: {
    marginLeft: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
  infoLabel: {
    color: '#667085',
    fontSize: '12px',
    fontWeight: '500',
  },
  infoVal: {
    color: '#101828',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    fontSize: '22px',
    marginTop: '10px'
  },
  infoTrend: {
    marginTop: '10px',
    color: '#027A48',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    backgroundColor: '#ddf1e5',
    borderRadius: '99px',
    minWidth: '50px'
  },
  trendIcon: {
    fontSize: '14px !important'
  },
  dotRed: {
    color: '#f9623b'
  },
  dotGreen: {
    color: '#31cb9e'
  },
  dotBlue: {
    color: '#2C55EB'
  },
  chartDivider: {
    marginBottom: '20px !important',
    marginTop: '20px !important'
  },
  selTime: {
    padding: '2px',
    border: 'solid 1px #D0D5DD',
    borderRadius: '6px !important'
  },
  borderBtn: {
    fontSize: '10px',
    fontWeight: '500',
    color: '#1D2939',
    borderLeft: 'solid 1px #D0D5DD !important'
  },
  selBtn: {
    fontSize: '10px',
    fontWeight: '500',
    color: '#1D2939',
  }
});



export const options = {
  responsive: true,
  tension: 0.3,
  plugins: {
    legend: {
      position: 'top',
      display: false
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    tooltip: {
      displayColors: false,
      yAlign: 'bottom',
      cornerRadius: 18,
      padding: { left: 20, right: 20, top: 10, bottom: 10 },
      caretPadding: 15,
      bodyFont: { size: 12, weight: 600, family: 'Inter' },
      backgroundColor: function (context) {
        return context.tooltip.dataPoints[0].dataset.label == "data1" ? "#2C55EB" : context.tooltip.dataPoints[0].dataset.backgroundColor;
      },
      callbacks: {
        labelTextColor: function () {
          return '#ffffff';
        },
        label: function (context) {
          let lb = context.dataset.label == "data1" ? "$ " + context.parsed.y : context.parsed.y
          return lb
        },
        title: function () { },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        callback: function (label) {
          let l = this.getLabelForValue(label);
          return l == "" ? null : l;
        }
      }
    },
    lineY: {
      type: 'linear',
      display: true,
      position: 'left',
      suggestedMax: 0.55,
      suggestedMin: 0,
    },
    barY: {
      type: 'linear',
      display: false,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
      suggestedMax: 60,
      gridLines: { color: "#FFFFFF00" }
    },
  },
};

function App() {
  const classes = useStyles();
  const [labelData, setLabelData] = useState([])
  const [backColor, setBackColor] = useState("#2C55EB")

  const data = {
    labels: labelData,
    datasets: [
      {
        type: 'line',
        label: 'data1',
        fill: true,
        borderColor: '#2C55EB',
        backgroundColor: backColor,
        borderWidth: 4,
        tension: 0.2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#FFFFFF',
        pointHoverBorderColor: '#2C55EB',
        pointHoverBorderWidth: 6,
        pointHoverRadius: 8,
        data: labelData.map(() => faker.datatype.number({ min: 400, max: 500 }) / 1000),
        yAxisID: "lineY",
        xAxisId: "x"
      },
      {
        type: 'bar',
        label: 'data2',
        backgroundColor: '#F9623B',
        data: labelData.map(() => faker.datatype.number({ min: 0, max: 15 })), 
        stack: "barStack",
        yAxisID: "barY",
        xAxisId: "x"
      },
      {
        type: 'bar',
        label: 'data3',
        backgroundColor: '#31CB9E',
        data: labelData.map(() => faker.datatype.number({ min: 0, max: 15 })), 
        stack: "barStack",
        yAxisID: "barY",
        xAxisId: "x"
      },
    ],
  };

  useEffect(() => {
    let arr = [];
    for (let i = 10; i < 75; i++) {
      arr.push(i % 10 == 0 ? "0" + (i / 10 - 1) + ":00" : '');
    }
    setLabelData(arr);
    var ctx = document.getElementById('myChart').getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 0, 0, 150);
    gradientFill.addColorStop(0, '#2C55EB80');
    gradientFill.addColorStop(0.5, '#2C55EB80');
    gradientFill.addColorStop(1, '#FFFFFF00');
    setBackColor(gradientFill);
  }, [])

  return (
    <div className="App">
      <Container maxWidth="md" className={classes.chartBody}>
        <Grid container spacing={1}>
          <Grid item md={5}></Grid>
          <Grid item md={2} xs={12} >
            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>Claimed</div>
              <div className={classes.infoVal}>
                <FiberManualRecordIcon className={classes.dotRed} /> 81
              </div>
              <div className={classes.infoTrend}>
                <TrendingUpIcon className={classes.trendIcon} /> 5%
              </div>
            </div>
          </Grid>
          <Grid item md={2} xs={12} >
            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>New holders</div>
              <div className={classes.infoVal}>
                <FiberManualRecordIcon className={classes.dotGreen} /> 12
              </div>
              <div className={classes.infoTrend}>
                <TrendingUpIcon className={classes.trendIcon} /> 15%
              </div>
            </div>
          </Grid>
          <Grid item md={3} xs={12} >
            <div className={classes.infoItem}>
              <div className={classes.infoLabel}>Current Price (BICO/USD)</div>
              <div className={classes.infoVal}>
                <FiberManualRecordIcon className={classes.dotBlue} /> $0.49345
              </div>
              <div className={classes.infoTrend}>
                <TrendingUpIcon className={classes.trendIcon} /> 7%
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider variant="middle" className={classes.chartDivider} />
        <Grid container spacing={1}>
          <Grid item md={12} xs={12} className={classes.selTimeWrap}>
            <ButtonGroup variant="" aria-label="outlined button group" className={classes.selTime} >
              <Button className={classes.selBtn}>6H</Button>
              <Button className={classes.borderBtn}>1D</Button>
              <Button className={classes.borderBtn}>1W</Button>
              <Button className={classes.borderBtn}>1M</Button>
              <Button className={classes.borderBtn}>1Y</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Chart id="myChart" options={options} data={data} />
        </Grid>
      </Container>
    </div>
  );
}

export default App;