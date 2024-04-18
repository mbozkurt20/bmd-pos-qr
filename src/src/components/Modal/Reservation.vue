<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore } from "../../store/modal";
import { setReservation } from "../../store/table-detail";
import { reactive } from "vue"

const reservation = reactive({ customer: "", phone: "" })

const handleClose = () => {
    modalStore.reservation = false;
}

const saveReservation = () => {
    setReservation(reservation.customer + " - " + reservation.phone)
    modalStore.reservation = false;
}

</script>

<template>
    <Modal :is-opened="modalStore.reservation" :handle-close="handleClose" title="Rezervasyon">
        <div class="px-2">
            <input type="text" name="name" v-model="reservation.customer" placeholder="Müşteri Adı"
                class="form-control mb-3">
            <input type="text" name="phone" v-model="reservation.phone" placeholder="Telefone" class="form-control mb-3">
            <button class="w-100" @click="saveReservation"> Kaydet </button>
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