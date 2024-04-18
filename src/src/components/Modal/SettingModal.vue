<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore, settingModal } from "../../store/modal";

import { onMounted, ref, watch } from "vue";
import axios from "axios";
const courier = ref("");

const handleClose = () => {
  modalStore.settingModal = false;
};
</script>

<template>
  <Modal
    :is-opened="modalStore.settingModal"
    :handle-close="handleClose"
    title="Ayar Güncelle"
  >
    <div class="px-2">
      <input type="text" class="form-control" />

      <button class="w-100" style="color: black; margin-top: 10px">
        Kaydet
      </button>
    </div>
  </Modal>
</template>

<style scoped lang="scss"></style>
