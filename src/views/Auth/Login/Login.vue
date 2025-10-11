<script lang="ts">
import axios from "axios";
import PFooter from "../../../components/Footer/Footer.vue";
import PHeader from "../../../components/Header/PHeader/PHeader.vue";
import { setLoading } from "../../../store/app";
import { toast } from "vue3-toastify";
import router from "@/router";

export default {
  name: 'Login',
  components: { PHeader, PFooter },

  data() {
    return {
      users: [],
      code: "",
      table: null
    };
  },
  mounted() {
    localStorage.clear();

    this.LoginAttack()

  },
  methods: {
    orderC() {
      return router.push({ path: `/tables/${localStorage.getItem("table")}` });
    },
    menu() {
      return router.push({ path: `/menu` });
    },

    async LoginAttack() {
      const pathSegments = window.location.pathname.split('/')

      const restaurantCode = pathSegments[2]
      const table = pathSegments[4]

      try {
        setLoading(true);
        const response = await axios.post("v2/restaurant-menu", { code: restaurantCode });
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("restaurantCode", restaurantCode);
          localStorage.setItem("table", table);
          localStorage.setItem("domain", response.data.user.tenant.domain);
          localStorage.setItem("userData", JSON.stringify(response.data.user));

          this.table = localStorage.getItem('table')
          await this.login();
          toast("Hoşgeldiniz...", {
            theme: "dark",
            type: "success",
            pauseOnFocusLoss: false,
          });
        }
      } catch (err: any) {
        console.error({ error: err });
        toast(err.response?.data?.message || "Hata oluştu", {
          theme: "dark",
          type: "error",
          pauseOnFocusLoss: false,
        });
      } finally {
        setLoading(false);
      }
    },
    async login() {
      try {
        const { data } = await axios.post(
            "v2/auth/information",
            { domain: localStorage.getItem("domain") ?? null },
            { headers: { Authorization: localStorage.getItem("token") || null } }
        );
        if (data.success) {
          this.users = data.users;
          console.log({ users: this.users });
        }
      } catch (err) {
        console.error({ mb: err });
      }
    },
  },
};
</script>

<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(to bottom right, #dcfce7, #bbf7d0); color: #1f2937; font-family: sans-serif;">

    <!-- Card -->
    <div style=" box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-radius: 2rem; padding: 2.5rem; width: 90%; max-width: 450px; text-align: center; margin-bottom: 2rem;">
      <h1 style="font-size: 2rem; font-weight: bold; color: #16a34a; animation: pulse 2s infinite;">Hoşgeldiniz 👋</h1>
      <p style="color: #4b5563; font-size: 1.125rem; margin-top: 0.5rem;">Lütfen devam etmek için bir seçenek seçin</p>

      <!-- Buttons -->
      <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 2rem;">
        <button @click="menu()"
                style="padding: 0.75rem 2rem; border-radius: 1rem; background-color: #22c55e; color: white; font-size: 1.125rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
          🍽 Menüye Göz At
        </button>

        <button @click="orderC()"
                style="padding: 0.75rem 2rem; border-radius: 1rem; background-color: white; color: #16a34a; font-size: 1.125rem; font-weight: 600; border: 2px solid #16a34a; cursor: pointer; transition: all 0.3s; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
          🛒  {{table}} | Sipariş Ver
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Eğer Tailwind yoksa alternatif sade CSS için */
</style>
