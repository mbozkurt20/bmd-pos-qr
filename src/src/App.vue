<script setup lang="ts">
import { computed, onMounted, watch, ref, onUnmounted, watchEffect } from "vue";
import AppLoading from "./components/AppLoading.vue";
import { appStore } from "./store/app";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import router from "./router";
const userData = ref(localStorage.getItem("userData"));
import Pusher from "pusher-js";
let user = JSON.parse(userData.value);
const message = ref([]);
const pusher = new Pusher("e312a9f949cef84204fb", {
  cluster: "eu",
  encrypted: true,
});
onUnmounted(() => {
  pusher.unsubscribe("sinerPosSocket_" + user["code"]);
  pusher.disconnect();
});
onMounted(() => {
  if (user) {
    const channel = pusher.subscribe("sinerPosSocket_" + user["code"]);
    channel.bind("callerID", (data) => {
      appStore.caller = data;
    });
  }
});

watch(
  () => appStore.caller,
  () => {
    toast.info("ÇAĞRI: " + appStore.caller.data, {
      onClick: () => {
        router.push(`/packages/new`);
      },
      theme: "light",
      position: "top-center",
      autoClose: 4000,
      dangerouslyHTMLString: true,
    });
  }
);
</script>
<template>
  <app-loading v-if="appStore.loading" />
  <router-view></router-view>
</template>
