<template>
    <div class="date-time py-3 text-custom">
        {{ currentTime }}
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
    const currentTime = ref('');

onMounted(() => {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000)
});

const updateCurrentTime = () => {
  const currentDateTime = new Date();
  const hours = currentDateTime.getHours().toString().padStart(2, '0');
  const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');

  const formattedTime = `${hours}:${minutes}`;
  currentTime.value = formattedTime;
};
</script>