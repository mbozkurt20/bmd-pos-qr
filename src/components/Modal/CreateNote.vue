<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore } from "../../store/modal";
import { tableDetailStore } from "../../store/table-detail";


const handleClose = () => {
  modalStore.createNote = false;
  console.log({tableDetailStore:tableDetailStore})
}
 </script>

<template>
  <Modal :is-opened="modalStore.createNote" :handle-close="handleClose"  title="Not">
        <div class="px-2">
            <textarea placeholder="Not girin" class="form-control" v-model="tableDetailStore.table.note" rows="6" />
            <button class="w-100 button-custom " @click="handleClose"> Kaydet </button>
        </div>
  </Modal>
</template>

<style scoped lang="scss">
textarea {
  background: transparent;
  padding: 12px;
  outline: none;
  color: black;
  border-radius: 12px;
  margin-bottom: 20px;
}
</style>