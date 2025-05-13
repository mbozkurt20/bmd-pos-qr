<script setup lang="ts">
defineProps([
    'table',
    'payed',
    'left'
])
</script>

<template>
  <div class="d-flex" style="gap: 36px;">
    <div class="content-top-price">
      <div class="content-top-price-title mb-2">Tahsilat Tutarı</div>
      <div class="content-top-price-value"  style="color: #008837">
         {{payed}}
      </div>
    </div>
    <div class="content-top-price">
      <div class="content-top-price-title mb-2">Ödenecek Tutar</div>
      <div class="content-top-price-value content-top-price-value-pink">{{ left }}</div>
    </div>
  </div>
</template>

<style scoped src="./PBill.scss" lang="scss"></style>