<template>
  <div class="sidebar" :class="sidebarClass">
    <button
        class="sidebar-item"
        v-for="(item, index) in navItems"
        :key="item.key"
        :class="{ 'sidebar-item-active': isSelected(index) }"
        @click="handleClick(item, index)"
    >
      <div class="sidebar-item-icon" v-if="item.icon" v-html="item.icon"></div>
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const props = defineProps(['colSize', 'navItems']);
const emit = defineEmits(['activeProducts','activeIndex'])

const selectedIndex = ref(0);

const sidebarClass = computed(() => {
  return `col-lg-${props.colSize}`;
});

const isSelected = (index) => {
  return selectedIndex.value === index;
};

const handleClick = (item, index) => {
  selectedIndex.value = index;
  emit('activeProducts', item.activeProducts);
  emit('activeIndex',index);
};
</script>

<style src="./PSidebar.scss" lang="scss" />
