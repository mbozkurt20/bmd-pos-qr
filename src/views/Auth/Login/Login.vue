<script lang="ts">
import axios from "axios";

import PFooter from "../../../components/Footer/Footer.vue";
import PHeader from "../../../components/Header/PHeader/PHeader.vue";
import {useRoute} from 'vue-router'

import {setLoading} from "../../../store/app";
import {toast} from "vue3-toastify";
import router from "@/router";

export default {
  components: {
    PHeader,
    PFooter,
  },
  data() {
    return {
      route: useRoute(),

      users: [],
      code: "",
    };
  },
  mounted() {
    // Component mount edildiğinde LoginAttack otomatik çalışsın
    this.LoginAttack();
  },
  methods: {
    LoginAttack() {
      const restaurantCode = this.route.params.restaurantId
      const table = this.route.params.tableId

      console.log({restaurantCode});
      console.log({table});

      axios({
        method: "POST",
        url: "v2/restaurant-menu",
        data: {
          code: restaurantCode,
        },
      }).then(async (response) => {

        setLoading(true);

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("restaurantCode", this.route.params.restaurantId);
          localStorage.setItem("table",  this.route.params.tableId);
          localStorage.setItem("domain", response.data.user.tenant.domain);
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          this.login();

          toast('Hoşgeldiniz...', {
            "theme": "dark",
            "type": "success",
            "pauseOnFocusLoss": false
          })

          console.log(response.data.user.tenant.domain)
          console.log(response.data.user)

          setLoading(false);

          return router.push({ path: `/tables/${table}` });
        }
      }).catch((err) => {
        console.log({error: err})
        toast(err.response.data.message, {
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

<template>
  <div>Yükleniyor</div>
</template>