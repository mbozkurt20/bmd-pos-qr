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
              type="number"
              class="login-input"
              v-model="code"
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
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  </div>

  <PFooter></PFooter>
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
        return toast.warning('Lütfen Bilgilerinizi Giriniz!')
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

              toast.success('Giriş Başarılı')

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
            toast.error(err.response.data.message)
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
