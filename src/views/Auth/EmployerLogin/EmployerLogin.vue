<template>
  <div style="
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
">
    <div class="wrapper">
      <ion-icon
          name="lock-closed-outline"
          style="font-size: 90px; margin-bottom: 50px"
      />

      <div class="value-box">
        <div class="value">
          <input
              @keyup.enter="login"
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

      <a class="text-white mt-4 border border-white p-1 px-3" href="/">Geri Git</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.wrapper {
  border-radius: 25px;
  width: 90%;
  max-width: 400px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  text-align: center;
}

.icon {
  font-size: 70px;
  margin-bottom: 30px;
  color: white;
}

.value-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 250px;
}

.value {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  text-align: center;
  padding: 10px;
  height: 50px;
  border-radius: 12px 0 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pass-input {
  all: unset;
  font-size: 24px;
  width: 100%;
}

button {
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 0 12px 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}

.button-icon {
  font-size: 22px;
  color: white;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 30px;
  width: 100%;
  max-width: 250px;
}

.button {
  width: 50px;
  height: 50px;
  border: 1px solid white;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
}

.back-link {
  margin-top: 20px;
  color: white;
  text-decoration: none;
  border: 1px solid white;
  padding: 5px 15px;
  border-radius: 5px;
}

@media (max-width: 500px) {
  .wrapper {
    height: auto;
    padding: 15px;
  }

  .icon {
    font-size: 50px;
    margin-bottom: 20px;
  }

  .pass-input {
    font-size: 20px;
  }

  .buttons {
    gap: 8px;
  }

  .button {
    width: 40px;
    height: 40px;
    font-size: 18px;
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
}).catch(err => {
  console.log({mb: err})
});

const login = () => {
  console.log({users: users.va})
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
