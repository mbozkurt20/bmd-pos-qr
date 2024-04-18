<template>
  <PHeader></PHeader>
  <div class="container">
    <div class="row">
      <div class="col-6">
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
          <div class="login-form">
            <p class="login-form-title">
              15 gün ücretsiz denemek için
              <a class="login-form-reg" href="/register"
                >Hemen tıkla, kaydol!</a
              >
            </p>
          </div>
        </div>
      </div>
      <div class="col-6"></div>
    </div>
  </div>
  <PFooter></PFooter>
</template>

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
      email: "enesceylan23@gmail.com",
      password: "E123456789",
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

<style src="./Login.scss" lang="scss" scoped />
