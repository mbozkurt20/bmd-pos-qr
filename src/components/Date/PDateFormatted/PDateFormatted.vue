<template>
    <div class="date-title py-3 px-1">
        {{ formattedDate }}
    </div>
</template>
<style scoped lang="scss">
@media (max-width: 1024px) {
  .date-title {
    font-size: 1rem !important;
  }
}
</style>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const formattedDate = ref('');

onMounted(() => {
    fetchFormattedDate();
});

const fetchFormattedDate = () => {
      const currentDate = new Date();

      const day = currentDate.getDate();
      const monthIndex = currentDate.getMonth();
      const dayIndex = currentDate.getDay();

      const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
      const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

      const formattedDateString = `${day} ${monthNames[monthIndex]} ${dayNames[dayIndex]}`;

      formattedDate.value = formattedDateString;
    };
</script>