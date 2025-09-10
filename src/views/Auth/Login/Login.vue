<template>
  <div class="container">
    <div class="row">
      <!-- Sol taraf: Başlık -->
      <div class="col-12 col-md-6">
        <h1 class="loginH1">Hesabınızda oturum açın</h1>
      </div>

      <!-- Sağ taraf: Form -->
      <div class="col-12 col-md-6">
        <div class="login">
          <div class="login-form">
            <h5 class="login-form-title text-dark">Restaurant Girişi</h5>
          </div>

          <div class="login-form">
            <input
                type="number"
                class="login-input"
                v-model="code"
                maxlength="6"
                placeholder="Restaurant Kodunuz"
                @keyup.enter="LoginAttack"
            />
          </div>

          <div class="login-form">
            <input
                type="password"
                class="login-input"
                v-model="password"
                placeholder="Şifreniz"
                @keyup.enter="LoginAttack"
            />
          </div>

          <div class="login-form">
            <button class="login-form-loginBtn" @click="LoginAttack">
              Oturum Aç
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./Login.scss" lang="scss" scoped/>
<script lang="ts">
import axios from "axios";
import router from "../../../router/index";
import PFooter from "../../../components/Footer/Footer.vue";
import PHeader from "../../../components/Header/PHeader/PHeader.vue";
import Forget from "../Forget.vue";
import {setLoading} from "../../../store/app";
import {toast} from "vue3-toastify";

export default {
  components: {
    PHeader,
    PFooter,
  },
  data() {
    return {
      users: [],
      showPassword: false,
      code: "",
      password: "",
      message: "ssdasd",
    };
  },

  methods: {
    LoginAttack() {
      if (!(this.code && this.password)) {
        return toast('Lütfen Bilgilerinizi Giriniz!',{
          "theme": "dark",
          "type": "warning",
          "pauseOnFocusLoss": false
        })
      }

      setLoading(true);

      axios({
        method: "POST",
        url: "v2/login",
        data: {
          code: this.code,
          password: this.password,
        },
      }).then(async (response) => {
            if (response.data.success === true) {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("domain", response.data.user.tenant.domain);
              localStorage.setItem("userData", JSON.stringify(response.data.user));
              this.login();

              toast('Giriş Başarılı',{
                "theme": "dark",
                "type": "success",
                "pauseOnFocusLoss": false
              })

              setTimeout(() => {
                const user = this.users[0];
                console.log({user: user})
                localStorage.setItem("user", JSON.stringify(user));
                router.push({ name: "Index" });
              },1000)

              setLoading(false);
            }
          }).catch((err) => {
            console.log({error: err})
            toast(err.response.data.message,{
              "theme": "dark",
              "type": "error",
              "pauseOnFocusLoss": false
            })
            setLoading(false);
          });
    },

    login() {
      axios({
        method: "POST",
        data: {
          domain: localStorage.getItem("domain") ?? null,
        },
        url: "v2/auth/information",
        headers: {
          Authorization: localStorage.getItem("token") || null,
        },
      }).then(({data}) => {
        if (data.success === true) {
          this.users = data.users;
          console.log({users: this.users})
        }
      }).catch(err => {
        console.log({mb: err})
      });
    }
  },
};
</script>
