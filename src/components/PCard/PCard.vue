<template>
  <div class="card2">
    <div class="card-items">
      <div class="card-item" v-for="item in cards">
        <router-link :to="item.url">
          <div class="card-image">
            <img :src="item.image" alt="" />
          </div>
          <div class="card-title">
            {{ item.title }}
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

const cards =
    [{
      title: 'Masalar',
      image: table,
      url: "/tables"
    },
      {
        title: 'Gel-Al',
        image: basket,
        url: "/fast-sell"
      },
      {
        title: 'Paketler',
        image: delivery,
        url: "/packages"
      },
      {
        title: 'Online Siparişler',
        image: card,
        url: "/online"
      },
      {
        title: 'Stoklar',
        image: box,
        url: "/stocks"
      }, {
      title: 'Ürünler',
      image: products,
      url: "/menu"
    }, {
      title: 'Cariler',
      image: userplus,
      url: "/currents"
    }, {
      title: 'Raporlar',
      image: statistic,
      url: "/report"
    },
    ]
</script>

<style src="./PCard.scss" lang="scss" scoped />
