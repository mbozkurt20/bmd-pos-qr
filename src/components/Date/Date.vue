<template>
    <div class="home">
      <div class="date">
        <PDateFormatted />
        <PDateTime />
        <PWeather />
      </div>
    </div>
</template>

<script setup lang="ts">
import PDateFormatted from "./PDateFormatted/PDateFormatted.vue"
import PDateTime from "./PDateTime/PDateTime.vue"
import PWeather from "@/components/PWeather/PWeather.vue";
</script>

<style src="./Date.scss" lang="scss" />