<template>
<LoginBaseLayout>
      <template #default>
  <form @submit.prevent="login">
    <div class="wrapper">
      <div class="container main">
        <div class="row">
          <div class="col-md-6 side-image" style="  caret-color: transparent;">
                
          </div>
          <div class="col-md-6 right">
            <div class="input-box">
              <header>Login</header>
              <div class="input-field">
                <input
                  @keyup.enter="login"
                  v-model="email"
                  type="email"
                  class="input"
                  id="email"
                  required=""
                  autocomplete="off"
                />
                <label for="email">Email</label>
              </div>
              <div class="input-field">
                <input
                  @keyup.enter="login"
                  v-model="password"
                  type="password"
                  class="input"
                  id="pass"
                  required=""
                />
                <label for="pass">Password</label>
              </div>
              <div class="input-field">
                <input type="submit" class="submit" value="Login" />
              </div>
              <div class="signin"   @click.prevent="navigateTo('/sign-up')">
                <span
                  >New user? <a href="#" >Create new account</a></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
      </template>
</LoginBaseLayout>

  <!-- <form @submit.prevent ="login">
 <div class="login-container" style="">
    <img class="robotDogLogo" src="../assets/robotDog.jpg" />
    <h1>Login</h1>
    <div class="login">
      <input @keyup.enter="login" type="text" v-model="username" placeholder="Enter user name" />
      <input @keyup.enter="login" type="password" v-model="password" placeholder="Enter Password" />
      <button>Login</button>
   <span @click="$router.push('/sign-up')" class="sign-up-link">new user/sign up account</span>
    </div>
  </div>
</form> -->
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginBaseLayout from "../templates/LoginBaseLayout.vue"

const email = ref("");
const password = ref("");

const router = useRouter();

const navigateTo = async (routePath) => {
  await router.push(routePath);
};

const login = async () => {
  let obj = {
    email: email.value,
    password: password.value,
  };

  if (email.value.trim() == "" || password.value.trim() == "") {
    alert("Please insert valid username & password!");
    return;
  } else {
    try {
      const result = await axios.post("login", obj);
      console.log(result);
      if (result.status === 200) {
      console.log(result.data)
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("username", result.data.user[1]);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${result.data.token}`; // Update axios header with new token
        router.push({ name: "GasDetect" });
      }
    } catch (err) {
     if (err.response && err.response.status === 401) {
      alert("Invalid username & password!");
    } else {
      console.log("Error", err);
    }
    }
  }
};
</script>

<style>
 @import '../styles/Authentication.css';
</style>