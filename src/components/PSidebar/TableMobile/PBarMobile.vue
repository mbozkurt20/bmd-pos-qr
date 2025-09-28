<template>
  <div class="mobile-sidebar" :class="sidebarClass">
    <h1 v-if="mainTitle" class="mobile-sidebar-main-title">
      {{ mainTitle }}
    </h1>

    <button
        class="mobile-sidebar-item"
        v-for="(item, index) in navItems"
        :key="item.id"
        :class="{ 'mobile-sidebar-item-active': selectedIndex === index }"
        @click="handleClick(index, item)"
    >
      <div
          class="mobile-sidebar-item-icon"
          v-if="item.icon"
          v-html="item.icon"
      ></div>
      {{ item.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

const props = defineProps(['colSize', 'navItems', 'mainTitle','selectedIndex']);
const emit = defineEmits(['clickSidebarItem']);


const sidebarClass = computed(() => {
  return `col-lg-${props.colSize}`;
});

const handleClick = (index, item) => {
  emit('clickSidebarItem', {
    index,
    item
  });
}

</script>

<style src="./PBarMobile.scss" lang="scss"/>