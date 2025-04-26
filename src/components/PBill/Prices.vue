<script setup lang="ts">
defineProps([
    'payed',
    'left'
])
</script>

<template>
  <div class="d-flex" style="gap: 36px;">
    <div class="content-top-price">
      <div class="content-top-price-title">Tahsilat Tutarı</div>
      <div class="content-top-price-value">
        {{ payed }}
      </div>
    </div>
    <div class="content-top-price">
      <div class="content-top-price-title">Toplam</div>
      <div class="content-top-price-value content-top-price-value-pink">{{ left }}</div>
    </div>
  </div>
</template>
<style scoped src="./PBill.scss" lang="scss"></style>