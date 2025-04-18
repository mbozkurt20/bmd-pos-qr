<template>
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

const cards = ref([]);

onMounted(() => {
  axios({
    url: "api/v2/modules",
    method: "GET",
    params: {
      domain: localStorage.getItem("domain"),
      tenantId: JSON.parse(localStorage.getItem('userData')).tenant.id
    }
  }).then((res) => {
    console.log({asf:res.data.modules})
    cards.value = res.data.modules.map(item => ({
      name: item.module.name,
      icon: item.module.icon,
      slug: "/" + item.module.slug
    }));
  }).catch((err) => {
    console.log({ err });
  });


  Pusher.logToConsole = true;

  const pusher = new Pusher('ac293c727687682a5b63', {
    cluster: 'eu'
  });

  const channel = pusher.subscribe("module-channel");

  channel.bind("module-event", function (data) {
    cards.value = data.map(item => ({
      name: item.module.name,
      icon: item.module.icon,
      slug: "/" + item.module.slug
    }));
  });

});
</script>

<style src="./PCard.scss" lang="scss" scoped/>
