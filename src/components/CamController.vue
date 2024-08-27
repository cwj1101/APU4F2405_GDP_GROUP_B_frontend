<template>
  <BaseLayout>
    <template #default>
      <!-- Page-specific content goes here -->
      <h1>Welcome {{ username }} !</h1>
      <!-- <el-col :span="24" style="padding-top: 10px">
        <div class="grid-content ep-bg-purple" />
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="statistic-card">
              <el-statistic :value="todayTime">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Today
                    <el-tooltip
                      effect="dark"
                      content="Number of users who logged into the product in one month"
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
          <el-col :span="8">
            <div class="statistic-card">
              <el-statistic :value="70">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Highest Temperature
                    <el-tooltip
                      effect="dark"
                      content="Number of users who logged into the product in one month"
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
                  <span class="red">
                    12%
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="statistic-card">
              <el-statistic :value="32" title="New transactions today">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Lowest Temperature
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>Average Temperature</span>
                  <span class="green">
                    16%
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
      </el-col> -->
      <div style="display: flex; justify-content: space-between; padding-left:200px; padding-right:200px; padding-top:20px">
        <div>
          <img
            src="http://192.168.1.102:8000/thermal_feed"
            width="750"
            height="350"
            style="padding-bottom: 10px; padding-right: 10px"
          />
        </div>
        <div>
          <img
            src="http://192.168.1.102:8001/video_feed"
            width="750"
            height="340"
            style="padding-left:10px"
          />
        </div>
      </div>
      <div class="arrows" style="padding-top:50px">
        <i
          class="arrow-up bi bi-arrow-up-square-fill"
          @mousedown="startControl('up')"
          @mouseup="stopControl"
        ></i>
        <i
          class="arrow-left bi bi-arrow-up-square-fill"
          @mousedown="startControl('left')"
          @mouseup="stopControl"
        ></i>
        <i
          class="center-button bi bi-house-fill"
          @mousedown="startControl('home')"
          @mouseup="stopControl"
        ></i>
        <i
          class="arrow-down bi bi-arrow-up-square-fill"
          @mousedown="startControl('down')"
          @mouseup="stopControl"
        ></i>
        <i
          class="arrow-right bi bi-arrow-up-square-fill"
          @mousedown="startControl('right')"
          @mouseup="stopControl"
        ></i>
      </div>
    </template>
  </BaseLayout>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import BaseLayout from "../templates/BaseLayout.vue";
import axios from "axios";

const username = localStorage.getItem("username");
// const todayDate = ref(dayjs().format("YYYY-MM-DD"));
const todayTime = ref(dayjs().format("HH:mm:ss"));
const direction = ref("");
let controlInterval = null;

const controller = async (dir) => {
  try {
    let result = await axios.post("cam_controller", { control: dir });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const startControl = (dir) => {
  direction.value = dir;
  controller(dir);
  controlInterval = setInterval(() => {
    controller(dir);
  }, 200);
};

const stopControl = () => {
  clearInterval(controlInterval);
};

onMounted(() => {
  setInterval(() => {
    todayTime.value = dayjs().format("HH:mm:ss");
  }, 1000);
});

onUnmounted(() => {
  clearInterval(controlInterval);
});
</script>

<style>
@import "../styles/ElementPlusStatistic.css";

.arrows {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: repeat(3, 80px);
  justify-content: center;
  align-items: center;
  gap: 10px; /* Adjusts the spacing between arrows */
}

.arrows i {
  width: 80px;
  height: 80px;
  font-size: 80px; /* Adjust the icon size */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s, transform 0.2s; /* Smooth transition */
  cursor: pointer; /* Pointer cursor on hover */
}

/* Click effect */

.arrow-up:active {
  transform: scale(0.9); /* Slightly reduce size on click */
}

.arrow-left:active {
  transform: scale(0.9) rotate(-90deg); /* Slightly reduce size on click */
}

.arrow-right:active {
  transform: scale(0.9) rotate(90deg); /* Slightly reduce size on click */
}
.arrow-down:active {
  transform: scale(0.9) rotate(180deg); /* Slightly reduce size on click */
}

.center-button:active {
  transform: scale(0.9); /* Slightly reduce size on click */
}

.arrow-up {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.arrow-left {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  transform: rotate(-90deg); /* Rotate to point left */
}

.arrow-down {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  transform: rotate(180deg); /* Rotate to point down */
}

.arrow-right {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  transform: rotate(90deg); /* Rotate to point right */
}

.center-button {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  /* width: 80px;
  height: 80px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333; 
  color: white;
  border-radius: 10px; 
  border: 2px solid #333;  */
  cursor: pointer;
}
</style>
