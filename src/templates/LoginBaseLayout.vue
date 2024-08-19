<template>
  <el-container>
    <el-header>
      <div class="common-layout">
        <nav class="navbar navbar-expand-lg fixed-top">
          <div class="container-fluid">
            <a class="navbar-brand me-auto">GTMS</a>
                     <!-- <img class="robotDogLogo" src="../assets/gtms_logo.png" /> -->

            <!-- <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                  GTMS
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">

                <ul
                  class="navbar-nav flex-grow-1 pe-3"
                  style="padding-left: 20px"
                >
                  <li class="nav-item">
                    <a
                      class="nav-link mx-lg-2 active"
                      aria-current="page"
                      href="#"
                      >Dashboard</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mx-lg-2" href="#">Gas Detect</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mx-lg-2" href="#">Thermal Defect</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link mx-lg-2" href="#">Pressure & Sound Detect</a>
                  </li>
                </ul>
              </div>
            </div> -->
            <!-- <a href="#" class="login-button">Login</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button> -->
          </div>
        </nav>
      </div>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
</script>
<style>
/* .el-aside {
  background: #545c64;
  color: white;
  height: 100vh;
}
.logo-container {
  padding: 22px;
  background: #434a50;
}

.el-menu {
  border-right: 0 !important;
  caret-color: transparent;
}

.el-main {
  background: #eef1f4;
}

.breadcrumb-container {
  margin-top: 20px;
  margin-bottom: 40px;
}

.robotDogLogo {
  width: 100px;
} */

/* .el-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
} */

 @import '../styles/BaseLayout.css';
</style>