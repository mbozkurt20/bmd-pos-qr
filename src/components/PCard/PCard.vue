<template>
  <button class="btn-sm btn btn-custom float-end mb-2 rounded text-white" @click="clearLocalStorage(1)">Menü Yenile</button>

  <div class="card2">
    <div class="card-items">
      <div class="card-item" v-for="item in cards" :key="item.slug">
        <router-link :to="item.slug">
          <div class="card-image">
            <img :src="item.icon" alt=""/>
          </div>
          <div class="card-title">
            {{ item.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import axios from "axios";
import {onMounted, ref} from "vue";

import Pusher from "pusher-js";
import {toast} from "vue3-toastify";

const cards = ref([]);

const clearLocalStorage = (status) => {
  localStorage.removeItem('modules');

  if (status){
    toast.success('Yenilendi')
  }
}

onMounted(() => {
  let mod = localStorage.getItem('modules')
  mod = JSON.parse(mod)

  if (!mod){
    axios({
      url: "api/v2/modules",
      method: "GET",
      params: {
        domain: localStorage.getItem("domain"),
        tenantId: JSON.parse(localStorage.getItem('userData')).tenant.id
      }
    }).then((res) => {
      cards.value = res.data.modules.map(item => ({
        name: item.module.name,
        icon: item.module.icon,
        slug: "/" + item.module.slug
      }));

      localStorage.setItem('modules', JSON.stringify(res.data.modules))
    }).catch((err) => {
      console.log({ err });
    });
  }else {
    cards.value = mod.map(item => ({
      name: item.module.name,
      icon: item.module.icon,
      slug: "/" + item.module.slug
    }));
  }

  Pusher.logToConsole = true;

  const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER
  });

  const channel = pusher.subscribe("module-channel");

  channel.bind("module-event", function (data) {
    cards.value = data.map(item => ({
      name: item.module.name,
      icon: item.module.icon,
      slug: "/" + item.module.slug
    }));

    clearLocalStorage();
  });
});
</script>

<style src="./PCard.scss" lang="scss" scoped/>
