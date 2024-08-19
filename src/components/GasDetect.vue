<template>
  <BaseLayout>
    <el-col :span="24" style="padding-top: 10px">
      <div class="grid-content ep-bg-purple" />
      <el-row :gutter="24">
        <el-col :span="4">
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
        </el-col>
        <el-col :span="4">
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
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="statistic-card">
            <el-statistic :value="highestMq2" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Highest MQ2
                  <el-tooltip
                    effect="dark"
                    content="Air quality status of MQ2"
                    placement="top"
                  >
                    <i
                      v-if="mq2Indicator === 1"
                      class="bi bi-circle-fill"
                      style="padding-left: 6px; color: red"
                    ></i>
                    <i
                      v-else-if="mq2Indicator === 0"
                      class="bi bi-circle-fill"
                      style="padding-left: 6px; color: green"
                    ></i>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>Lowest MQ2</span>
                <span class="green">
                  {{ lowestMq2 }}
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
              <div class="footer-item"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="statistic-card">
            <el-statistic :value="highestMq3" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Highest MQ3
                  <el-tooltip
                    effect="dark"
                    content="Air quality status of MQ3"
                    placement="top"
                  >
                    <i
                      v-if="mq3Indicator === 1"
                      class="bi bi-circle-fill"
                      style="padding-left: 6px; color: red"
                    ></i>
                    <i
                      v-else-if="mq3Indicator === 0"
                      class="bi bi-circle-fill"
                      style="padding-left: 6px; color: green"
                    ></i>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span> Lowest MQ3</span>
                <span class="green">
                  {{ lowestMq3 }}
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
              <div class="footer-item"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="statistic-card">
            <el-statistic :value="highestMq5" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Highest MQ5
                  <el-tooltip
                    effect="dark"
                    content="Air quality status of MQ5"
                    placement="top"
                  >
                    <i
                      v-if="mq5Indicator === 1"
                      class="bi bi-circle-fill"
                      style="padding-left: 6px; color: red"
                    ></i>
                    <i
                      v-else-if="mq5Indicator === 0"
                      class="bi bi-circle-fill"
                      style="padding-left: 6px; color: green"
                    ></i>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>Lowest MQ5</span>
                <span class="green">
                  {{ lowestMq5 }}
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
              <div class="footer-item"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="statistic-card">
            <el-statistic :value="highestMq9" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Highest MQ9
                  <el-tooltip
                    effect="dark"
                    content="Air quality status of MQ9"
                    placement="top"
                  >
                    <i
                      v-if="mq9Indicator === 1"
                      class="bi bi-circle-fill"
                      style="padding-left: 6px; color: red"
                    ></i>
                    <i
                      v-else-if="mq9Indicator === 0"
                      class="bi bi-circle-fill"
                      style="padding-left: 6px; color: green"
                    ></i>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>Lowest MQ9</span>
                <span class="green">
                  {{ lowestMq9 }}
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
              <div class="footer-item"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <!-- <div class="demo-collapse">
      <el-collapse
        v-model="activeNames"
        @change="handleChange"
        style="padding-top: 20px"
      >
        <el-collapse-item title="Real time video" name="1">
          <img
            src="http://192.168.1.102:8000/thermal_feed"
            width="500"
            height="250"
          />
          <img
            src="http://192.168.1.102:8001/video_feed"
            width="500"
            height="250"
          />
        </el-collapse-item>
      </el-collapse>
    </div> -->
    <div style="display: flex">
      <div class="block" style="padding-top: 20px">
        <span class="demonstration"></span>
        <el-date-picker
          v-model="dateSelect"
          type="date"
          :placeholder="todayDate"
          :size="size"
          @click="onSearch"
        />
      </div>
      <!-- <div style="padding-top: 20px; padding-left: 10px">
        <el-button type="primary" :icon="Search" circle />
      </div> -->
    </div>
    <div style="padding-top: 10px">
      <div>
        <el-tabs type="border-card" style="height: 100%">
          <el-tab-pane label="MQ2">
            <div style="display: flex">
              <div style="flex: 5; height: 550px">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq2Zoom.zoom.in()"
                  >
                    <el-icon><Plus /></el-icon>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq2Zoom.zoom.reset()"
                  >
                    reset
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq2Zoom.zoom.out()"
                  >
                    <el-icon><Minus /></el-icon>
                  </button>
                </div>
                <canvas
                  ref="chartMQ2"
                  style="width: 100%"
                  class="chart-frame"
                ></canvas>
              </div>
              <div style="flex: 2">
                <img
                  src="http://192.168.1.102:8001/video_feed"
                  width="500"
                  height="450"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="MQ3">
            <div style="display: flex">
              <div style="flex: 5; height: 550px">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq3Zoom.zoom.in()"
                  >
                    <el-icon><Plus /></el-icon>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq3Zoom.zoom.reset()"
                  >
                    reset
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq3Zoom.zoom.out()"
                  >
                    <el-icon><Minus /></el-icon>
                  </button>
                </div>
                <canvas
                  ref="chartMQ3"
                  style="width: 100%"
                  class="chart-frame"
                ></canvas>
              </div>
              <div style="flex: 2">
                <img
                  src="http://192.168.1.102:8001/video_feed"
                  width="500"
                  height="550"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="MQ5">
            <div style="display: flex">
              <div style="flex: 5; height: 550px">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq5Zoom.zoom.in()"
                  >
                    <el-icon><Plus /></el-icon>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq5Zoom.zoom.reset()"
                  >
                    reset
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq5Zoom.zoom.out()"
                  >
                    <el-icon><Minus /></el-icon>
                  </button>
                </div>
                <canvas
                  ref="chartMQ5"
                  style="width: 100%"
                  class="chart-frame"
                ></canvas>
              </div>
              <div style="flex: 2">
                <img
                  src="http://192.168.1.102:8001/video_feed"
                  width="500"
                  height="550"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="MQ9">
            <div style="display: flex">
              <div style="flex: 5; height: 550px">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq9Zoom.zoom.in()"
                  >
                    <el-icon><Plus /></el-icon>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq9Zoom.zoom.reset()"
                  >
                    reset
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="mq9Zoom.zoom.out()"
                  >
                    <el-icon><Minus /></el-icon>
                  </button>
                </div>
                <canvas
                  ref="chartMQ9"
                  style="width: 100%"
                  class="chart-frame"
                ></canvas>
              </div>
              <div style="flex: 2">
                <img
                  src="http://192.168.1.102:8001/video_feed"
                  width="500"
                  height="550"
                />
              </div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="Temperature">
            <div style="display: flex">
              <div style="flex: 5; height: 550px">
                <div class="btn-group" role="group" aria-label="Basic example">
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
              <div style="flex: 2; padding-top: 55px">
                <img
                  src="http://192.168.1.102:8000/thermal_feed"
                  width="500"
                  height="250"
                  style="padding-bottom: 10px"
                />
                <img
                  src="http://192.168.1.102:8001/video_feed"
                  width="500"
                  height="250"
                />
              </div>
            </div>
          </el-tab-pane> -->
        </el-tabs>
        <!-- <el-row style="padding-top: 5px">
          <div class="grid-content ep-bg-purple" />
          <button @click="resetZoom">reset</button>
          <button @click="inZoom">zoom in</button>
          <button @click="outZoom">zoom out</button>
          <canvas
            ref="chartMQ"
            style="height: 300px; width: 100%"
            class="chart-frame"
          ></canvas>
        </el-row>
        <el-row style="padding-top: 10px">
          <div class="grid-content ep-bg-purple" />
          <canvas
            ref="chartTempHumi"
            style="height: 300px; width: 100%"
            class="chart-frame"
          ></canvas>
        </el-row> -->
      </div>
      <!-- <div style="flex: 1; margin-left: 15px">
        <ag-grid-vue
          :rowData="rowData"
          :columnDefs="colDefs"
          style="height: 100%; width: 100%; padding-left: 10px"
          class="ag-theme-quartz"
        >
        </ag-grid-vue>
      </div> -->
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "../templates/BaseLayout.vue";
import { ref, onMounted, watch } from "vue";
import "chartjs-adapter-luxon";
import axios from "axios";
import dayjs from "dayjs";
import { updateChartData, createChart, zoom } from "../utils/chartJsUtils";
import { sortStatus, avgStatus } from "../utils/sort";
import { Plus, Minus, Calendar, Warning } from "@element-plus/icons-vue";
import { ElNotification } from 'element-plus'

let gasData = [];
let tempAI = [];
let highestTemp = ref(null);
let avgTemp = ref(null);
let highestMq2 = ref(null);
let lowestMq2 = ref(null);
let highestMq3 = ref(null);
let lowestMq3 = ref(null);
let highestMq5 = ref(null);
let lowestMq5 = ref(null);
let highestMq9 = ref(null);
let lowestMq9 = ref(null);

let mq2Indicator = ref(0);
let mq3Indicator = ref(0);
let mq5Indicator = ref(0);
let mq9Indicator = ref(0);
let messageOut;

const warningInfo = () => {
  if (mq2Indicator.value === 1) {
    messageOut = "Combustible gas (MQ-2)";
  } else if (mq3Indicator.value === 1) {
    messageOut = "Alcohol vapor (MQ-3)";
  } else if (mq5Indicator.value === 1) {
    messageOut = "Natural gas (MQ-5)";
  } else if (mq9Indicator.value === 1) {
    messageOut = "Carbon monoxide (MQ-9)";
  }
  ElNotification({
    title: "Gas Detected",
    message: messageOut +" is detected",
    type: "warning",
  });
};

 watch([mq2Indicator, mq3Indicator, mq5Indicator, mq9Indicator], ([mq2, mq3, mq5, mq9]) => {
      if (mq2 === 1 || mq3 === 1 || mq5 === 1 || mq9 === 1) {
        warningInfo();
      }
    });

let isFetching = false;
let isFetching2 = false;
// let timeIntervalId = null;
const todayDate = ref(dayjs().format("YYYY-MM-DD"));
let todayTime = ref(null);
const dateSelect = ref("");

const chartMQ2 = ref(null);
const chartMQ3 = ref(null);
const chartMQ5 = ref(null);
const chartMQ9 = ref(null);
const chartTemp = ref(null);

let MQ2ChartInstance = null;
let MQ3ChartInstance = null;
let MQ5ChartInstance = null;
let MQ9ChartInstance = null;
let tempChartInstance = null;

let mq2Zoom = ref(null);
let mq3Zoom = ref(null);
let mq5Zoom = ref(null);
let mq9Zoom = ref(null);
let tempZoom = ref(null);

const fetchGasData = async () => {
  if (isFetching) return;
  isFetching = true;
  let searchDate;
  try {
    let result;
    if (dateSelect.value) {
      console.log("This is selected date:", dateSelect.value);
      result = await axios.post("fetch-gas-data", {
        timestamp: dayjs(dateSelect.value).format("YYYY-MM-DD"),
      });
      // console.log("result fetch", result);
    } else {
      result = await axios.post("fetch-gas-data", {
        //timestamp: "2024-07-20",
        timestamp: todayDate.value,
      });
    }

    console.log("search date", searchDate);
    console.log("search date output", result.data);
    const newGasData = result.data.gasData
      // .filter((item) => {
      //   // Extract the date part of the timestamp
      //   const itemDate = new Date(item.timestamp).toISOString().split("T")[0];
      //   return itemDate === searchDate;
      //   // return itemDate === todayDate.value;
      // })
      .map((item) => {
        const date = new Date(item.timestamp);

        // Ensure the time zone conversion
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return {
          ...item,
          timestamp: `${hours}:${minutes}:${seconds}`, // Format the timestamp in HH:MM:SS
        };
      });
    searchDate = null;
    gasData = newGasData;
    console.log("Atfer gasData ", gasData);
    updateCharts();
  } catch (error) {
    console.error("Error fetching gas data:", error);
  } finally {
    // console.log("date selected: " ,dateSelect.value);
    isFetching = false;
    highestTemp.value = sortStatus(gasData, "temperature", "desc");
    avgTemp = avgStatus(gasData, "temperature");
    highestMq2.value = sortStatus(gasData, "mq2", "desc");
    lowestMq2.value = sortStatus(gasData, "mq2", "asc");
    highestMq3.value = sortStatus(gasData, "mq3", "desc");
    lowestMq3.value = sortStatus(gasData, "mq3", "asc");
    highestMq5.value = sortStatus(gasData, "mq5", "desc");
    lowestMq5.value = sortStatus(gasData, "mq5", "asc");
    highestMq9.value = sortStatus(gasData, "mq9", "desc");
    lowestMq9.value = sortStatus(gasData, "mq9", "asc");
    // mq2Indicator.value  =
  }
};

const fetchTempAi = async () => {
  if (isFetching2) return;
  isFetching2 = true;
  try {
    let result;
    if (dateSelect.value) {
      result = await axios.post("fetch-temp-ai", {
        timestamp: dayjs(dateSelect.value).format("YYYY-MM-DD"),
      });
      console.log("result fetch", result);
    } else {
      result = await axios.post("fetch-temp-ai", {
        // timestamp: "2024-07-20",
        timestamp: todayDate.value,
      });
    }

    // console.log("before filter ",result.data.temp_ai)
    const newTempAI = result.data.temp_ai
      // .filter((item) => {
      //   // Extract the date part of the timestamp
      //   const itemDate = new Date(item.timestamp).toISOString().split("T")[0];
      //   // return itemDate === "2024-07-25";
      //   return itemDate === todayDate.value;
      // })
      .map((item) => {
        const date = new Date(item.timestamp);

        // Ensure the time zone conversion
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return {
          ...item,
          timestamp: `${hours}:${minutes}:${seconds}`, // Format the timestamp in HH:MM:SS
        };
      });
    tempAI = newTempAI;
    //  console.log("Atfer filter AI ",tempAI)
    updateCharts();
  } catch (error) {
    console.error("Error fetching MQ2 AI:", error);
  } finally {
    isFetching2 = false;
  }
};

const onSearch = () => {
  fetchGasData;
  fetchTempAi;
};
const datasetsMq2 = [
  {
    label: "MQ2",
    data: [],
    fill: true,
    backgroundColor: "rgba(255, 99, 132, 0.2)", // Pink
    borderColor: "rgb(255, 99, 132)",
    pointBackgroundColor: "rgb(255, 99, 132)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(255, 99, 132)",
  },
];

const datasetsMq3 = [
  {
    label: "MQ3",
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

const datasetsMq5 = [
  {
    label: "MQ5",
    data: [],
    fill: true,
    backgroundColor: "rgba(75, 192, 192, 0.2)", // Teal
    borderColor: "rgb(75, 192, 192)",
    pointBackgroundColor: "rgb(75, 192, 192)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(75, 192, 192)",
  },
];

const datasetsMq9 = [
  {
    label: "MQ9",
    data: [],
    fill: true,
    backgroundColor: "rgba(255, 206, 86, 0.2)", // Yellow
    borderColor: "rgb(255, 206, 86)",
    pointBackgroundColor: "rgb(255, 206, 86)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(255, 206, 86)",
  },
];

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

const updateCharts = () => {
  if (MQ2ChartInstance) {
    updateChartData(
      MQ2ChartInstance,
      gasData.map((row) => row.timestamp),
      gasData.map((row) => row.mq2)
    );
    // MQ2ChartInstance.data.labels = gasData.map((row) => row.timestamp);
    // MQ2ChartInstance.data.datasets[0].data = gasData.map((row) => row.mq2);
    // MQ2ChartInstance.update(); // Tell Chart.js to re-render
  }
  if (MQ3ChartInstance) {
    updateChartData(
      MQ3ChartInstance,
      gasData.map((row) => row.timestamp),
      gasData.map((row) => row.mq3)
    );
  }
  if (MQ5ChartInstance) {
    updateChartData(
      MQ5ChartInstance,
      gasData.map((row) => row.timestamp),
      gasData.map((row) => row.mq5)
    );
  }
  if (MQ9ChartInstance) {
    updateChartData(
      MQ9ChartInstance,
      gasData.map((row) => row.timestamp),
      gasData.map((row) => row.mq9)
    );
  }
  if (tempChartInstance) {
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
    const combinedLabels = combineAndSortTimestamps(gasData, tempAI);

    // Align data with combined labels
    const tempData = getDataForTimestamps(
      gasData.map((row) => row.temperature),
      gasData.map((row) => row.timestamp),
      combinedLabels
    );

    const aiData = getDataForTimestamps(
      tempAI.map((row) => row.temperature),
      tempAI.map((row) => row.timestamp),
      combinedLabels
    );

    console.log("this is combmuned labels", combinedLabels);
    console.log("ai data", aiData);
    updateChartData(tempChartInstance, combinedLabels, tempData);
    updateChartData(tempChartInstance, combinedLabels, aiData, 1);
  }
};

onMounted(() => {
  fetchGasData();
  fetchTempAi();
  setInterval(fetchTempAi, 1000);
  setInterval(fetchGasData, 1000);
  setInterval(updateCharts, 1000);
  setInterval(() => {
    todayTime.value = dayjs().format("HH:mm:ss");
    // console.log(typeof(todayTime.value))
  }, 1000);

  if (chartMQ2.value) {
    MQ2ChartInstance = createChart(chartMQ2, MQ2ChartInstance, datasetsMq2);
  } else {
    console.error("chartMQ2 is not defined");
  }

  if (chartMQ3.value) {
    MQ3ChartInstance = createChart(chartMQ3, MQ3ChartInstance, datasetsMq3);
  } else {
    console.error("chartMQ3 is not defined");
  }

  if (chartMQ5.value) {
    MQ5ChartInstance = createChart(chartMQ5, MQ5ChartInstance, datasetsMq5);
  } else {
    console.error("chartMQ5 is not defined");
  }

  if (chartMQ9.value) {
    MQ9ChartInstance = createChart(chartMQ9, MQ9ChartInstance, datasetsMq9);
  } else {
    console.error("chartMQ9 is not defined");
  }

  if (chartTemp.value) {
    tempChartInstance = createChart(
      chartTemp,
      tempChartInstance,
      datasetsTemp,
      35
    );
  } else {
    console.error("chartTemp is not defined");
  }

  mq2Zoom.value = zoom(MQ2ChartInstance);
  mq3Zoom.value = zoom(MQ3ChartInstance);
  mq5Zoom.value = zoom(MQ5ChartInstance);
  mq9Zoom.value = zoom(MQ9ChartInstance);
  tempZoom.value = zoom(tempChartInstance);
});
</script>

<style>
@import "../styles/ElementPlusStatistic.css";

.chart-frame {
  background-color: var(--el-bg-color-overlay);
  /* background-color: #F7F7F7; */
}
.el-tab-pane {
  height: 600px;
  width: 100%;
}
</style>