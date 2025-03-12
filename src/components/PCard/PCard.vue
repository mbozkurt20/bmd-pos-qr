<template>
  <div class="card2">
    <div class="card-items">
      <div class="card-item" v-for="item in cards">
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
import yemeksepeti from "../../assets/image/yemeksepeti.png"
import table from "../../assets/image/dinner-table.png"
import delivery from "../../assets/image/delivery.png"
import basket from "../../assets/image/basket.png"
import card from "../../assets/image/card.png"
import box from "../../assets/image/box.png"
import products from "../../assets/image/burger.png"
import userplus from "../../assets/image/userplus.png"
import statistic from "../../assets/image/statistics.png"
import axios from "axios";
import {ref} from "vue";

const cards = ref([]);

axios({
  url: "api/v2/modules",
  method: "GET",
  params: {
    domain: localStorage.getItem("domain"),
    tenantId : JSON.parse( localStorage.getItem('userData')).tenant.id
  }
}).then((res) => {
  res.data.modules.forEach(item => {
   cards.value.push(item.module)
  })
}).catch((err) => {
  console.log({err: err})
});

// const cards =
//     [
//       {
//         title: 'Masalar',
//         image: table,
//         status: true,
//         url: "/tables",
//         slug: 'tables'
//       },
//       {
//         title: 'Gel-Al',
//         image: basket,
//         status: true,
//         url: "/fast-sell",
//         slug: 'gel_al'
//       },
//       {
//         title: 'Paketler',
//         image: delivery,
//         status: true,
//         url: "/packages",
//         slug: 'packages'
//       },
//       {
//         title: 'Online Siparişler',
//         image: card,
//         status: true,
//         url: "/online",
//         slug: 'online_orders'
//       },
//       {
//         title: 'Stoklar',
//         image: box,
//         url: "/stocks",
//       }, {
//       title: 'Ürünler',
//       image: products,
//       url: "/menu"
//     }, {
//       title: 'Cariler',
//       image: userplus,
//       url: "/currents"
//     }, {
//       title: 'Raporlar',
//       image: statistic,
//       url: "/report"
//     },
//     ]
</script>

<style src="./PCard.scss" lang="scss" scoped/>
