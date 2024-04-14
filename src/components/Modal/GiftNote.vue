<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore } from "../../store/modal";
import { giftCartProduct } from "../../store/table-detail";
import { ref } from "vue"

const handleClose = () => {
    modalStore.giftNote = false;
}

const exclude_note = ref("");

const sendGift = () => {
    giftCartProduct(exclude_note.value);
    handleClose();
}
</script>

<template>
    <Modal :is-opened="modalStore.giftNote" :handle-close="handleClose" title="İkram Notu">
        <div class="px-2">
            <textarea type="text" placeholder="Lütfen Bir İkram Nedeni Giriniz.." class="form-control"
                v-model="exclude_note" rows="6" />
            <button class="w-100" @click="sendGift"> Kaydet </button>
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