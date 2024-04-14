<template>
  <div class="wrapper">
    <ion-icon
      name="lock-closed-outline"
      style="font-size: 90px; margin-bottom: 50px"
    />

    <div class="value-box">
      <div class="value">
        <input
          class="pass-input"
          type="text"
          name=""
          :value="replaceWithAsterisk(passwordText)"
        />
      </div>
      <button @click="login">
        <ion-icon name="arrow-forward-outline" style="font-size: 22px" />
      </button>
    </div>

    <div class="buttons">
      <div @click="passwordText += '1'" class="button">1</div>
      <div @click="passwordText += '2'" class="button">2</div>
      <div @click="passwordText += '3'" class="button">3</div>
      <div @click="passwordText += '4'" class="button">4</div>
      <div @click="passwordText += '5'" class="button">5</div>
      <div @click="passwordText += '6'" class="button">6</div>
      <div @click="passwordText += '7'" class="button">7</div>
      <div @click="passwordText += '8'" class="button">8</div>
      <div @click="passwordText += '9'" class="button">9</div>
      <div @click="passwordText = ''" class="button">C</div>
      <div @click="passwordText += '0'" class="button">0</div>
      <div
        @click="passwordText = passwordText.slice(0, passwordText.length - 1)"
        class="button"
      >
        <ion-icon name="arrow-back-outline" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100%;
}

.pass-input {
  all: unset;
  width: 100%;
  font-size: 32px !important;
  position: relative;
  top: 5px;
}

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .value-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .value {
      background: #0000002a;
      max-width: 120px;
      width: 100%;
      text-align: center;
      padding: 10px;
      height: 55px;

      border-radius: 12px 0px 0px 12px;

      display: flex;
      align-items: center;
      justify-content: center;

      h1 {
        margin: 0px;
        font-size: 35px;
      }
    }

    button {
      height: 55px;
      background: #0000002a;
      border: none !important;
      border-radius: 0px 12px 12px 0px;

      &:hover {
        border: none !important;
      }
    }
  }

  .buttons {
    max-width: max-content;
    width: 100%;
    display: grid;
    gap: 12px;
    grid-template-columns: auto auto auto;

    margin-top: 40px;

    .button {
      width: 50px;
      height: 50px;
      border: 1px solid white;
      border-radius: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 25px;
    }
  }
}
</style>

<script setup lang="ts">
import axios from "axios";
import router from "../../../router/index";
import { loginEmployer, setLoading } from "../../../store/app";
import { ref, onMounted } from "vue";
import { setEmployers } from "../../../store/app.js";

const passwordText = ref("");
const replaceWithAsterisk = (input) => {
  var result = "";

  for (var i = 0; i < passwordText.value.length; i++) {
    result += "*";
  }

  return result;
};

onMounted(() => {
  localStorage.removeItem("user");
});

const users = ref([]);
setLoading(true);

axios({
  method: "POST",
  data: {
    domain: localStorage.getItem("domain") ?? null,
  },
  url: "v2/auth/information",
  headers: {
    Authorization: localStorage.getItem("token") || null,
  },
}).then(({ data }) => {
  if (data.success === true) {
    data.users.forEach((element) => {
      users.value.push(element);
    });
    setLoading(false);
  }
});

const login = () => {
  let user = users.value.find((user) => user.password == passwordText.value);
  passwordText.value = "";
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    if (user.type == 1) {
      //router.push("/index");
      window.location.href = "/index";
    } else {
      // router.push("/tables");
      window.location.href = "/tables";
    }
  }
};
</script>
