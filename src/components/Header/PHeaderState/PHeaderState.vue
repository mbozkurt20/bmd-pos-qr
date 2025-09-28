<template>
  <div class="header-state d-flex">
    <a class="header-state-link d-flex">
      <ion-icon
        style="font-size: 18px"
        :name="headerState[0].icon"
        :style="isOnline ? 'color:green' : 'color:red'"
      ></ion-icon>
      <div class="header-state-texts">
        <div class="header-state-title">{{ headerState[0].label }}</div>
        <div class="header-state-state">
          {{ headerState[0].state }}
        </div>
      </div>
    </a>
    <a class="header-state-link d-flex">
      <ion-icon
        style="font-size: 18px"
        :style="isOnline ? 'color:green' : 'color:red'"
        :name="headerState[1].icon"
      ></ion-icon>
      <div class="header-state-texts">
        <div class="header-state-title">{{ headerState[1].label }}</div>
        <div class="header-state-state">
          {{ headerState[1].state }}
        </div>
      </div>
    </a>
    <a
      class="header-state-link d-flex"
      v-if="headerState[2]"
      :href="headerState[2].url"
      style="cursor: pointer"
    >
      <ion-icon
        style="font-size: 18px; color: #fff"
        :name="headerState[2].icon"
      ></ion-icon>
      <div class="header-state-texts">
        <div class="header-state-title">{{ headerState[2].label }}</div>
        <div class="header-state-state">
          {{ headerState[2].state }}
        </div>
      </div>
    </a>


<!--    <div class="header-state-link d-flex">-->
<!--      <div class="header-state-texts">-->
<!--        <div class="header-state-title">-->
<!--          <button @click="handleLogout" class="btn btn-light">Çıkış Yap</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import router from "../../../router/index.js"; // Router'ı kullanmak için

export default {
  setup() {
    const isOnline = ref(navigator.onLine);

    const updateOnlineStatus = () => {
      isOnline.value = navigator.onLine;
    };

    onMounted(() => {
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
    });

    onUnmounted(() => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    });

    return { isOnline };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('domain');
      localStorage.removeItem('userData');
      localStorage.removeItem('user');

      // Login sayfasına yönlendir
      router.push({ name: 'Login' });
    }
  },
  data() {
    return {
      userData: null,
     headerState: [
       {
         label: "Internet",
         url: "#",
         state: "Online",
         icon: "wifi-outline",
       },
       {
         label: "Server",
         url: "#",
         state: "Online",
         icon: "server-outline",
       },
     ],
    };
  },
  watch() {},
  mounted() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      let user = JSON.parse(userData);
      let empName = localStorage.user
        ? JSON.parse(localStorage.user).name
        : user["name"];

      // this.headerState.push({
      //   label: empName,
      //   url: "/employer-login",
      //   state: user["code"],
      //   icon: "person-outline",
      // });
      this.userData = user;
    }
  },
};
</script>

<style src="./PHeaderState.scss" lang="scss" scoped />
