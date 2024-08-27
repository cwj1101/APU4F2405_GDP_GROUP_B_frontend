<template>
  <BaseLayout>
    <template #default>
      <div class="main-div">
        <el-col :span="24" style="padding-top: 10px">
          <div class="grid-content ep-bg-purple" />
          <el-row :gutter="20">
            <!-- <el-col :span="8">
              <div class="statistic-card">
                <el-statistic format="HH:mm:ss" :value="todayTime">
                  <template #title>
                    <div style="display: inline-flex; align-items: center">
                      Today
                      <el-tooltip
                        effect="dark"
                        content="Today Tate and Dime"
                        placement="top"
                      >
                        <el-icon style="margin-left: 4px" :size="12">
                          <Calendar />
                        </el-icon>
                      </el-tooltip>
                    </div>
                  </template>
                </el-statistic>
                <div class="statistic-footer">
                  <div class="footer-item">
                    <span>Date: {{ todayDate }} </span>
                  </div>
                </div>
              </div>
            </el-col> -->
            <el-col :span="12">
              <div class="statistic-card">
                <el-statistic :value="highestTemp">
                  <template #title>
                    <div style="display: inline-flex; align-items: center">
                      Highest Temperature
                      <el-tooltip
                        effect="dark"
                        content="The highest recorded temperature"
                        placement="top"
                      >
                        <el-icon style="margin-left: 4px" :size="12">
                          <Warning />
                        </el-icon>
                      </el-tooltip>
                    </div>
                  </template>
                </el-statistic>
                <div class="statistic-footer">
                  <div class="footer-item">
                    <span>Average Temperature</span>
                    <span class="green">
                      {{ avgTemp }}
                    </span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="statistic-card">
                <el-statistic :value="defectTempCount">
                  <template #title>
                    <div
                      class="cursor-hover"
                      style="
                        display: inline-flex;
                        align-items: center;
                        cursor: pointer;
                      "
                      plain
                      @click="dialogTableVisible = true"
                    >
                      Temperature defect cases
                      <el-tooltip
                        effect="dark"
                        content="Temperature defect cases"
                        placement="top"
                        plain
                      >
                        <el-icon style="margin-left: 4px" :size="12">
                          <Warning />
                        </el-icon>
                      </el-tooltip>
                    </div>
                  </template>
                </el-statistic>
                <div class="statistic-footer">
                  <div class="footer-item">
                    <span>Highest temperature defect</span>
                    <span class="red">
                      {{ defectTempHighest }}
                    </span>
                  </div>
                  <div class="footer-item"></div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <div class="block" style="padding-top: 20px">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="dateSelect"
            type="date"
            :placeholder="todayDate"
          />
        </div>
        <div style="padding-top: 10px">
          <el-tabs type="border-card" style="height: 100%">
            <el-tab-pane label="Temperature">
              <div style="display: flex">
                <div style="flex: 5; height: 550px">
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="tempZoom.zoom.in()"
                    >
                      <el-icon><Plus /></el-icon>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="tempZoom.zoom.reset()"
                    >
                      reset
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="tempZoom.zoom.out()"
                    >
                      <el-icon><Minus /></el-icon>
                    </button>
                  </div>
                  <canvas
                    ref="chartTemp"
                    style="width: 100%"
                    class="chart-frame"
                  ></canvas>
                </div>
                <div style="flex: 2; padding-right:30px; padding-top:50px">
                  <img
                    src="http://192.168.1.102:8001/video_feed"
                    width="500"
                    height="250"
                    style="padding-bottom: 10px"
                  />
                  <img
                    src="http://192.168.1.102:8000/thermal_feed"
                    width="500"
                    height="250"
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </template>
  </BaseLayout>
  <el-dialog
    v-model="dialogTableVisible"
    title="Temperature defect cases"
    width="700"
    draggable
    overflow
  >
    <el-table :data="gridDataTempDefect" height="250px">
      <el-table-column property="timestamp" label="Time" width="300" />
      <el-table-column property="temperature" label="Temperature" />
    </el-table>
  </el-dialog>
</template>

<script setup>
import BaseLayout from "../templates/BaseLayout.vue";
import axios from "axios";
import dayjs from "dayjs";
import { updateChartData, createChart, zoom } from "../utils/chartJsUtils";
import { ref, onMounted, watch } from "vue";
import { sortStatus, avgStatus, sortGreaterEqual } from "../utils/sort";
import { Plus, Minus, Warning, Calendar } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

let tempData = [];
let tempAI = [];
let isFetching = false;
let isFetching2 = false;
let tempZoom = ref(null);

const dateSelect = ref("");
const todayDate = ref(dayjs().format("YYYY-MM-DD"));
let todayTime = ref(null);
let highestTemp = ref(null);
let avgTemp = ref(null);
let defectTemp = ref(null);
let defectTempCount = ref(null);
let defectTempHighest = ref(null);

let dialogTableVisible = ref(false);

let gridDataTempDefect = [];
const chartTemp = ref(null);
let tempChartInstance = null;

const warningInfo = () => {
  ElNotification({
    title: "Thermal defects",
    message:
      "Thermal defect is detected: " +
      gridDataTempDefect[gridDataTempDefect.length - 1].temperature,
    type: "warning",
  });
};

watch({
  defectTempCount(newVal, oldVal) {
    if (newVal > oldVal) {
      this.warningInfo();
    }
  },
});

const datasetsTemp = [
  {
    label: "temperature",
    data: [],
    fill: true,
    backgroundColor: "rgba(255, 99, 71, 0.2)", // Red-Orange
    borderColor: "rgb(255, 99, 71)",
    pointBackgroundColor: "rgb(255, 99, 71)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(255, 99, 71)",
  },
  {
    label: "AI prediction",
    data: [],
    fill: true,
    backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue
    borderColor: "rgb(54, 162, 235)",
    pointBackgroundColor: "rgb(54, 162, 235)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(54, 162, 235)",
  },
];

const fiveMinInterval = async () => {
  if (isFetching) return;
  isFetching = true;
  try {
    let result;
    if (dateSelect.value) {
      console.log("This is selected date:", dateSelect.value);
      result = await axios.post("fetch-5min-interval", {
        timestamp: dayjs(dateSelect.value).format("YYYY-MM-DD"),
      });
      // console.log("result fetch", result);
    } else {
      result = await axios.post("fetch-5min-interval", {
        // timestamp: "2024-07-30",
        timestamp: todayDate.value,
      });
    }
    console.log("This is interval data: ", result.data);
    tempData = result.data.intervalData.map((item) => {
      const date = new Date(item.timestamp);

      // Ensure the time zone conversion
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      // const seconds = date.getSeconds().toString().padStart(2, "0");

      return {
        ...item,
        timestamp: `${hours}:${minutes}`, // Format the timestamp in HH:MM:SS
      };
    });
  } catch (err) {
    console.error("Error fetching temperature data:", err);
  } finally {
    isFetching = false;
    highestTemp.value = sortStatus(tempData, "temperature", "desc");
    avgTemp.value = avgStatus(tempData, "temperature");
    defectTemp.value = sortGreaterEqual(tempData, "temperature", 30);
    gridDataTempDefect = defectTemp.value.filteredData;
    defectTempCount.value = defectTemp.value.count;
    defectTempHighest.value = defectTemp.value.highestValue;
  }
};

let fetchTempAiTime;
const fetchTempAi = async () => {
  if (isFetching2) return;
  isFetching2 = true;
  try {
    let result;
    if (dateSelect.value) {
      result = await axios.post("fetch-temp-ai", {
        timestamp: dayjs(dateSelect.value).format("YYYY-MM-DD"),
      });
      fetchTempAiTime = dayjs(dateSelect.value).format("YYYY-MM-DD");
      console.log("result fetch", result);
    } else {
      result = await axios.post("fetch-temp-ai", {
        // timestamp: "2024-08-17",
        timestamp: todayDate.value,
      });
      // fetchTempAiTime = "2024-08-17";
      fetchTempAiTime = todayDate.value;
    }

    console.log("before filter ", result.data.temp_ai);
    const newTempAI = result.data.temp_ai
      .filter((item) => {
        // Extract the date part of the timestamp
        const itemDate = new Date(item.timestamp).toISOString().split("T")[0];
        // return itemDate === "2024-07-25";
        return itemDate === fetchTempAiTime;
      })
      .map((item) => {
        const date = new Date(item.timestamp);

        // Ensure the time zone conversion
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        // const seconds = date.getSeconds().toString().padStart(2, "0");

        return {
          ...item,
          timestamp: `${hours}:${minutes}`, // Format the timestamp in HH:MM:SS
        };
      });
    tempAI = newTempAI;
    console.log("Atfer filter AI ", tempAI);
    // updateCharts();
  } catch (error) {
    console.error("Error fetching MQ2 AI:", error);
  } finally {
    isFetching2 = false;
  }
};

const updateCharts = () => {
  if (tempChartInstance && tempData.length >= 1) {
    const adjustTimestamps = (tempAI, tempData) => {
      // Extract the first timestamp from tempAI
      const firstTimeAI = dayjs(tempAI[0].timestamp, "HH:mm");
      const startTimeData = firstTimeAI.subtract(5, "minute"); // 5 minutes before

      // Adjust timestamps in tempData
      const adjustedTempData = tempData.map((item, index) => {
        const newTime = startTimeData.add(index * 5, "minute"); // Adding 5 minutes for each index
        return {
          ...item,
          timestamp: newTime.format("HH:mm"), // Format as HH:mm
        };
      });

      // Add a null temperature entry for the first timestamp from tempAI
      const adjustedTempAI = [
        {
          temperature: null,
          timestamp: startTimeData.format("HH:mm"),
        },
        ...tempAI.map((item) => ({
          ...item,
          timestamp: dayjs(item.timestamp, "HH:mm").format("HH:mm"),
        })),
      ];

      return { adjustedTempAI, adjustedTempData };
    };

    // Adjust timestamps
    const { adjustedTempAI, adjustedTempData } = adjustTimestamps(
      tempAI,
      tempData
    );

    // Function to combine and sort all unique timestamps
    const combineAndSortTimestamps = (data1, data2) => {
      return [
        ...new Set([
          ...data1.map((row) => row.timestamp),
          ...data2.map((row) => row.timestamp),
        ]),
      ].sort();
    };

    // Function to get data aligned with timestamps
    const getDataForTimestamps = (data, timestamps, combinedLabels) => {
      const dataMap = new Map(timestamps.map((ts, index) => [ts, data[index]]));
      return combinedLabels.map((label) => dataMap.get(label) || null);
    };

    // Combine and sort all unique timestamps
    const combinedLabels = combineAndSortTimestamps(
      adjustedTempData,
      adjustedTempAI
    );

    // Align data with combined labels
    const tempDataSort = getDataForTimestamps(
      adjustedTempData.map((row) => row.temperature),
      adjustedTempData.map((row) => row.timestamp),
      combinedLabels
    );

    const aiData = getDataForTimestamps(
      adjustedTempAI.map((row) => row.temperature),
      adjustedTempAI.map((row) => row.timestamp),
      combinedLabels
    );

    // Update chart data
    updateChartData(tempChartInstance, combinedLabels, tempDataSort);
    updateChartData(tempChartInstance, combinedLabels, aiData, 1);

    console.log("Adjusted TempData:", adjustedTempData);
    console.log("Adjusted TempAI:", adjustedTempAI);
    console.log("Combined Labels:", combinedLabels);
    console.log("TempData Sorted:", tempDataSort);
    console.log("AI Data:", aiData);
  }

  //   if (tempChartInstance) {
  //     const adjustTimestamps = (tempAI, tempData) => {
  //       // Extract the first timestamp from tempAI
  //       const firstTimeAI = dayjs(tempAI[0].timestamp, "HH:mm");
  //       const startTimeData = firstTimeAI.subtract(5, "minute"); // 5 minutes before

  //       // Adjust timestamps in tempData
  //       return tempData.map((item, index) => {
  //         const newTime = startTimeData.add(index * 5, "minute"); // Adding 5 minutes for each index
  //         return {
  //           ...item,
  //           timestamp: newTime.format("HH:mm"), // Format as HH:mm
  //         };
  //       });
  //     };

  //     // Adjust timestamps
  //     const adjustedTempData = adjustTimestamps(tempAI, tempData);

  //     console.log("real time temp",adjustedTempData)

  //     console.log("real time AI",tempAI)

  //     // const combineAndSortTimestamps = (data1, data2) => {
  //     //   return [
  //     //     ...new Set([
  //     //       ...data1.map((row) => row.timestamp),
  //     //       ...data2.map((row) => row.timestamp),
  //     //     ]),
  //     //   ].sort();
  //     // };

  //     // // Function to get data aligned with timestamps
  //     // const getDataForTimestamps = (data, timestamps, combinedLabels) => {
  //     //   const dataMap = new Map(timestamps.map((ts, index) => [ts, data[index]]));
  //     //   return combinedLabels.map((label) => dataMap.get(label) || null);
  //     // };

  //     // // Combine and sort all unique timestamps
  //     // const combinedLabels = combineAndSortTimestamps(tempData, tempAI);

  //     // // Align data with combined labels
  //     // const tempDataSort = getDataForTimestamps(
  //     //   tempData.map((row) => row.temperature),
  //     //   tempData.map((row) => row.timestamp),
  //     //   combinedLabels
  //     // );

  //     // const aiData = getDataForTimestamps(
  //     //   tempAI.map((row) => row.temperature),
  //     //   tempAI.map((row) => row.timestamp),
  //     //   combinedLabels
  //     // );

  //     // // console.log("this is combmuned labels", combinedLabels);
  //     // console.log("ai data", tempAI);
  //     updateChartData(tempChartInstance, adjustedTempData.map((row) => row.timestamp), adjustedTempData.map((row) => row.temperature));
  //     updateChartData(tempChartInstance, adjustedTempData.map((row) => row.timestamp), tempAI.map((row) => row.temperature), 1);
  //   }
};

onMounted(() => {
  fiveMinInterval();
  fetchTempAi();
  setInterval(fetchTempAi, 1000);
  setInterval(fiveMinInterval, 1000);
  setInterval(updateCharts, 1000);

  if (chartTemp.value) {
    tempChartInstance = createChart(
      chartTemp,
      tempChartInstance,
      datasetsTemp,
      30
    );
  } else {
    console.error("tempChart is not defined");
  }

  tempZoom.value = zoom(tempChartInstance);

  setInterval(() => {
    todayTime.value = dayjs().format("HH:mm:ss");
  }, 1000);
});
</script>

<style>
@import "../styles/ElementPlusStatistic.css";

.chart-frame {
  background-color: var(--el-bg-color-overlay);
  /* background-color: #F7F7F7; */
}

.cursor-hover:hover {
  cursor: pointer; /* Changes cursor to a pointer on hover */
  font-weight: bold; /* Makes the text bold */
  color: #00339a; /* Sets text color to black */
  text-decoration: underline; /* Example of additional hover effect */
}

/* .main-div{
    caret-color: transparent;
} */
</style>
