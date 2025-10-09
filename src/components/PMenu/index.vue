<script setup>
import ProductsTable from "../../components/PDataTable/ProductsTable.vue";
import { fetchMenu } from "../../store/menu";

fetchMenu();
</script>

<template>
  <ProductsTable />
</template>

<style scoped lang="scss">
</style>
