import { Chart } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

const thresholdPlugin = {
  id: 'thresholdPlugin',
  beforeDraw: (chart) => {
    const { ctx, chartArea: { left, right }, scales: { y } } = chart;

    ctx.save();

    const yThreshold = y.getPixelForValue(chart.options.lineAt);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.moveTo(left, yThreshold);
    ctx.lineTo(right, yThreshold);
    ctx.stroke();

    ctx.restore();
  }
};

export const createChart = (chartRef, chartInstance, datasets, threshold = null) => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext("2d");
    if (ctx) {
      Chart.register(zoomPlugin, thresholdPlugin);
      chartInstance?.destroy();
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          datasets: datasets,
        },
        options: {
          lineAt: threshold,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            zoom: {
              pan: {
                enabled: true,
              },
              zoom: {
                wheel: {
                  enabled: true,
                  speed: 0.1,
                },
                drag: {
                  enabled: true,
                  modifierKey: "ctrl",
                },
                mode: "xy",
              },
            },
          },
        },
      });
    }
  }
  return chartInstance;
};


export const updateChartData = (chartInstance, labels, data, datasetIndex = 0) => {
  if (chartInstance) {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[datasetIndex].data = data;
    chartInstance.update();
  }
};

const zoomFunctions = {
  reset: (chartInstance) => {
    if (chartInstance && typeof chartInstance.resetZoom === 'function') {
      chartInstance.resetZoom();
    }
  },

  in: (chartInstance) => {
    if (chartInstance && typeof chartInstance.zoom === 'function') {
      chartInstance.zoom(1.1);
    }
  },

  out: (chartInstance) => {
    if (chartInstance && typeof chartInstance.zoom === 'function') {
      chartInstance.zoom(0.9);
    }
  }
};

// Create a function to attach the zoom functions to a specific chart instance
export const zoom = (chartInstance) => {
  return {
    zoom: {
      reset: () => zoomFunctions.reset(chartInstance),
      in: () => zoomFunctions.in(chartInstance),
      out: () => zoomFunctions.out(chartInstance)
    }
  };
};


// scales: {
//   x: {
//     type: 'time',
//     time: {
//       unit: 'second',
//       tooltipFormat: 'MMM D, h:mm:ss a',
//       displayFormats: {
//         second: 'h:mm:ss a',
//         minute: 'h:mm a',
//         hour: 'MMM D, hA',
//       },
//     },
//     title: {
//       display: true,
//       text: 'Time',
//     },
//   },
//   y: {
//     title: {
//       display: true,
//       text: 'Value',
//     },
//   },
// },



// if (chartMQ2.value) {
  //   const ctx = chartMQ2.value.getContext("2d");
  //   if (ctx) {
  //     MQ2ChartInstance?.destroy();
  //     MQ2ChartInstance = new Chart(ctx, {
  //       type: "line",
  //       data: {
  //         datasets: [
  //           {
  //             label: "MQ2",
  //             data: [],
  //             fill: true,
  //             backgroundColor: "rgba(255, 99, 132, 0.2)", // Pink
  //             borderColor: "rgb(255, 99, 132)",
  //             pointBackgroundColor: "rgb(255, 99, 132)",
  //             pointBorderColor: "#fff",
  //             pointHoverBackgroundColor: "#fff",
  //             pointHoverBorderColor: "rgb(255, 99, 132)",
  //           },
  //           {
  //             label: "MQ3",
  //             data: [],
  //             fill: true,
  //             backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue
  //             borderColor: "rgb(54, 162, 235)",
  //             pointBackgroundColor: "rgb(54, 162, 235)",
  //             pointBorderColor: "#fff",
  //             pointHoverBackgroundColor: "#fff",
  //             pointHoverBorderColor: "rgb(54, 162, 235)",
  //           },
  //           {
  //             label: "MQ5",
  //             data: [],
  //             fill: true,
  //             backgroundColor: "rgba(75, 192, 192, 0.2)", // Teal
  //             borderColor: "rgb(75, 192, 192)",
  //             pointBackgroundColor: "rgb(75, 192, 192)",
  //             pointBorderColor: "#fff",
  //             pointHoverBackgroundColor: "#fff",
  //             pointHoverBorderColor: "rgb(75, 192, 192)",
  //           },
  //           {
  //             label: "MQ9",
  //             data: [],
  //             fill: true,
  //             backgroundColor: "rgba(255, 206, 86, 0.2)", // Yellow
  //             borderColor: "rgb(255, 206, 86)",
  //             pointBackgroundColor: "rgb(255, 206, 86)",
  //             pointBorderColor: "#fff",
  //             pointHoverBackgroundColor: "#fff",
  //             pointHoverBorderColor: "rgb(255, 206, 86)",
  //           },
  //         ],
  //       },
  //       options: {
  //         plugins: {
  //           zoom: {
  //             pan: {
  //               enabled: true,
  //             },
  //             zoom: {
  //               wheel: {
  //                 enabled: true,
  //                 speed: 0.1,
  //               },
  //               drag: {
  //                 enabled: true,
  //                 modifierKey: "ctrl",
  //               },
  //             },
  //             mode: "xy",
  //           },
  //         },
  //       },
  //     });
  //   }
  // }

//   if (chartTempHumi.value) {
//     const ctx = chartTempHumi.value.getContext("2d");
//     if (ctx) {
//       tempChartInstance?.destroy();
//       tempChartInstance = new Chart(ctx, {
//         type: "line",
//         data: {
//           labels: ["1 July", "2 July", "3 July", "4 July", "5 July", "7 July"],
//           datasets: [
//             {
//               label: "temperature",
//               data: [70, 30, 50, 40, 60, 32],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//     }
//   }
//   Chart.register(zoomPlugin);
// 