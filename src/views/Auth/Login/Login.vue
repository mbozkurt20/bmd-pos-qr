<template>
  <PHeader></PHeader>
  <div class="container">
    <div class="content-row">
      <div class="login">
        <div class="login-form center">
          <h5 class="login-form-title">Restaurant Girişi</h5>
          <p class="login-form-desc">
            Tüm Siparişlerinizi tek panelden yönetin.
          </p>
        </div>
        <div class="login-form">
          <input
            type="email"
            class="login-input"
            v-model="email"
            placeholder="E-posta Adresiniz"
          />
        </div>
        <div class="login-form">
          <input
            type="password"
            class="login-input"
            v-model="password"
            placeholder="Şifreniz"
          />
        </div>
        <div class="login-form">
          <button class="login-form-loginBtn" @click="LoginAttack">
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  </div>
  <PFooter></PFooter>
</template>
<style src="./Login.scss" lang="scss" scoped />
<script lang="ts">
import axios from "axios";
import router from "../../../router/index";
import PFooter from "../../../components/Footer/Footer.vue";
import PHeader from "../../../components/Header/PHeader/PHeader.vue";
import Forget from "../Forget.vue";
import { setLoading } from "../../../store/app";

export default {
  components: {
    PHeader,
    PFooter,
  },
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      message: "ssdasd",
    };
  },

  methods: {
    LoginAttack() {
      setLoading(true);

      axios({
        method: "POST",
        url: "v2/login",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then(async (response) => {
          if (response.data.success === true) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("domain", response.data.user.tenant.domain);
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
            await router.push({ name: "Index" });

            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    },
  },
};
</script>
