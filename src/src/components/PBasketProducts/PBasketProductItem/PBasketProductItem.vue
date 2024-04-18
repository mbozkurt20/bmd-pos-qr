<script setup lang="ts">
import { ref } from "vue";

import ActiveCard from "./status-cards/ActiveCard.vue";
import ReviseCard from "./status-cards/ReviseCard.vue";
import EmptyCard from "./status-cards/EmptyCard.vue";
import ProcessingCard from "./status-cards/ProcessingCard.vue";
import {
  tableDetailStore,
  setWillMoveTableId,
} from "../../../store/table-detail";
import { computed } from "vue";
import { appStore } from "../../../store/app";
import { onLongPress } from "@vueuse/core";
import router from "../../../router";

const props = defineProps(["table"]);
const startTime = ref(0);
const pressTimer = ref(null);

const startPress = () => {
  startTime.value = Date.now();
  pressTimer.value = setTimeout(() => {
    if (
      !(
        tableDetailStore.willMoveTableId === null &&
        tableDetailStore.isDivide === false
      )
    ) {
      tableDetailStore.willMoveTableId = null;
      tableDetailStore.isDivide = false;
    } else if (props.table.status != 3 && props.table.status != 2) {
      setWillMoveTableId(props.table.id);
    }
  }, 500);
};

const endPress = () => {
  clearTimeout(pressTimer.value);
  const pressDuration = Date.now() - startTime.value;
  if (pressDuration < 500) {
    router.push(`/tables/${props.table.id}`);
  }
};

const cancelPress = () => {
  clearTimeout(pressTimer.value);
  startTime.value = 0;
};
</script>

<template>
  <div
    v-if="appStore.currentEmployer === null"
    @mousedown="startPress"
    @touchstart="startPress"
    @mouseup="endPress"
    @touchend="endPress"
    @mouseleave="cancelPress"
    @touchcancel="cancelPress"
    style="cursor: pointer"
  >
    <ActiveCard :table="table" v-if="table.status === 1" />
    <ReviseCard :table="table" v-if="table.status === 2" />
    <ProcessingCard :table="table" v-if="table.status === 3" />
  </div>
  <template v-else>
    <ActiveCard :table="table" v-if="table.status === 1" />
    <router-link :to="`/tables/${table.id}`">
      <ReviseCard :table="table" v-if="table.status === 2" />
    </router-link>
    <ProcessingCard :table="table" v-if="table.status === 3" />
  </template>
  <EmptyCard
    :table="table"
    v-if="table.status === 0"
    :isClickable="
      tableDetailStore.willMoveTableId === null &&
      tableDetailStore.isDivide === false
    "
  />
</template>
<style src="./PBasketProductItem.scss" lang="scss"></style>
