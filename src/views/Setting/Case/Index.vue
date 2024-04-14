<template>
  <PHeaderSmall />
  <div class="empty">
    <div class="content-row">
      <PSidebar :col-size="2" :nav-items="navItems" />
      <div class="col-lg-10 basket-content">
        <div class="row">
          <div class="col-lg-12">
            <div class="basket-card">
              HEY
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PHeaderSmall from '../../../components/Header/PHeaderSmall/PHeaderSmall.vue';
import PSidebar from "../../../components/Header/PSidebar/PSidebar.vue"

const navItems = [
  {
    label: "Sistem",
    key:0,
    url:'/customers',
    icon: '<ion-icon name="people-outline"></ion-icon>'
  },
  {
    label: "Uygulamalar",
    key:0,
    url: '/couriers',
    icon: '<ion-icon name="people-outline"></ion-icon>'
  },
  {
    label: "Garsonlar",
    key:0,
    url: '/waiters',
    icon: '<ion-icon name="people-outline"></ion-icon>'
  }
]
</script>

<style scoped>
.header{
  margin-bottom: 0;
}

.row{
  height: calc(100vh - 106px);
}


.sidebar{
  border-radius: 25px 0 0 25px;
}

.basket-content{
  border-radius: 0 25px 25px 0;
  height: 100%;
  background: #ebe6f1;
}

.basket-card{
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  color: #000;
  margin: 1rem;
}

</style>