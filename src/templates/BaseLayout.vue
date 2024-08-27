<template>
  <el-container>
    <el-header>
      <div class="common-layout">
        <nav class="navbar navbar-expand-lg fixed-top">
          <div class="container-fluid">
            <a class="navbar-brand me-auto">GTMS</a>

            <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">GTMS</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <!-- justify-content-center -->
                <ul
                  class="navbar-nav flex-grow-1 pe-3"
                  style="padding-left: 20px"
                >
                  <li class="nav-item">
                    <a
                      :class="{
                        'nav-link mx-lg-2': true,
                        active: currentRoute === '/camController',
                      }"
                      aria-current="page"
                      href="#"
                      @click.prevent="navigateTo('/camController')"
                    >
                      Cam controller
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      :class="{
                        'nav-link mx-lg-2': true,
                        active: currentRoute === '/gas-detect',
                      }"
                      href="#"
                      @click.prevent="navigateTo('/gas-detect')"
                    >
                      Gas Detect
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      :class="{
                        'nav-link mx-lg-2': true,
                        active: currentRoute === '/thermal-detect',
                      }"
                      href="#"
                      @click.prevent="navigateTo('/thermal-detect')"
                    >
                      Thermal Defect
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a href="#" class="login-button" @click.prevent="logout"
              >Logout</a
            >
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
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
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const route = useRoute();
const currentRoute = ref(route.path); // sync with the actual route path

const navigateTo = async (routePath) => {
  await router.push(routePath);
};

watch(route, (newRoute) => {
  currentRoute.value = newRoute.path; // update currentRoute whenever the route changes
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  router.push('/'); // Redirect to login page after logout
};
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