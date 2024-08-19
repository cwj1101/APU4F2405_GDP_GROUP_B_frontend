<template>
  <LoginBaseLayout>
    <template #default>
      <form @submit.prevent="signUp">
             <div class="wrapper">
      <div class="container main">
        <div class="row">
          <div class="col-md-6 side-image" style="  caret-color: transparent;">
                
          </div>
          <div class="col-md-6 right">
            <div class="input-box">
              <header>Sign up</header>
              <div class="input-field">
                <input
                  @keyup.enter="login"
                  v-model="username"
                  type="text"
                  class="input"
                  id="username"
                  required=""
                  autocomplete="off"
                />
                <label for="username">Username</label>
              </div>
              <div class="input-field">
                <input
                  @keyup.enter="login"
                  v-model="email"
                  type="email"
                  class="input"
                  id="email"
                  required=""
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
                <input
                  @keyup.enter="login"
                  v-model="passwordConfirm"
                  type="password"
                  class="input"
                  id="passVerify"
                  required=""
                />
                <label for="passVerify">Password Confirmation</label>
              </div>
              <div class="input-field">
                <input type="submit" class="submit" value="Sign Up" />
              </div>
              <div class="signin"   @click.prevent="navigateTo('/LoginPage')">
                <span
                  >Existing user? <a href="#" >Login</a></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 



        <!-- <div class="login-container" style="">
          <img class="robotDogLogo" src="../assets/robotDog.jpg" />
          <h1>Sign up</h1>
          <div class="register">
            <input type="text" v-model="userName" placeholder="User Name" />
            <input type="email" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <input
              type="password"
              v-model="passwordConfirm"
              placeholder="Confirm Password"
            />
            <button>Sign up</button>
          </div>
        </div> -->

      </form>
    </template>
  </LoginBaseLayout>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import LoginBaseLayout from "../templates/LoginBaseLayout.vue";

const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const router = useRouter();

const navigateTo = async (routePath) => {
  await router.push(routePath);
};

onMounted(() => {
  const user = localStorage.getItem("user-info");
  console.log(user);
  if (user) {
    router.push({ name: "MainPage" });
  }
});

const signUp = async () => {
 let obj = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

let result = await axios.post("sign-up",obj)
console.log(result)
if (result.status === 200){
  alert("Registration completed")
           router.push({ name: "LoginPage" });
}

  // let key = 0;
  // let obj = {
  //   username: userName.value,
  //   email: email.value,
  //   password: password.value,
  // };

  // if (userName.value.trim() == "" || password.value.trim() == "") {
  //   alert("Please insert valid username & password!");
  //   return;
  // } else {
  //   try {
  //     const result = await axios.get("sign-up");
  //     if (result.status === 200) {
  //       for (let i = 0; i < result.data.userInfo.length; i++) {
  //         if (result.data.userInfo[i].user_name != userName.value) {
  //           key++;
  //           break;
  //         }
  //       }
  //       if (key <= 0) {
  //         alert("Username exist, please insert other username.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error in get sign-up", error);
  //   }

  //   if (
  //     key >= 1 &&
  //     userName.value.trim() !== "" &&
  //     password.value.trim() !== ""
  //   ) {
  //     try {
  //       const result = await axios.post("sign-up", obj);
  //       console.warn(result);

  //       if (result.status === 200) {
  //         alert("Registration complete!");
  //         console.log("result: ", result);
  //         router.push({ name: "LoginPage" });
  //       }
  //     } catch (error) {
  //       console.error("Error occurred during sign-up:", error);
  //     }
  //   }
  // }
};
</script>

<style>
 @import '../styles/Authentication.css';
</style>