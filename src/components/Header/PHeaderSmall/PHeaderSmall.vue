<template>
    <header class="header">
        <div class="header-row">
            <div class="header-left d-flex">
                <div v-if="user && user.type != 3" role="button" class="btn btn-icon btn-sm rounded shadow text-white"
                     style="background-color: #e3406f;" @click="backButton">
                    <ion-icon style="font-size: 22px;top:2.5px;position:relative;" name="arrow-back-outline"></ion-icon>
                </div>
                <div class="header-logo">
                  <h4 class="text-white mt-2">{{userData ? userData.name : ''}} Menü</h4>
                </div>
            </div>
            <div class="header-right d-flex">
                <PHeaderState profileState="false" />
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon"
                   viewBox="0 0 512 512">
                <path
                    d="M320 176v-40a40 40 0 00-40-40H88a40 40 0 00-40 40v240a40 40 0 0040 40h192a40 40 0 0040-40v-40M384 176l80 80-80 80M191 256h273"
                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="32" />
              </svg>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import PHeaderState from "../PHeaderState/PHeaderState.vue"
import { device } from "../../../main";
import { useRouter } from 'vue-router';

const table = localStorage.getItem('table');
const router = useRouter();
const user = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null
const userData =  JSON.parse(localStorage.getItem('userData'))
const backButton = () => {
  router.back();
}
</script>

<style src="./PHeaderSmall.scss" lang="scss" scoped/>