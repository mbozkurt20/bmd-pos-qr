<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore } from "../../store/modal";
import { Currents, updateDeport } from "../../store/current";

import { ref } from "vue";

const handleClose = () => {
    modalStore.debtorUpdate = false;
}

const submitDebtorUpdate = () => {
    updateDeport(selectedMethod.value.payment_id, amount.value)
    modalStore.debtorUpdate = false;
    amount.value = null
    selectedMethod.value = null
}

const selectedMethod = ref(null)
const amount = ref(null)

const paymentMethods = [
    { title: "Nakit", payment_id: 1, icon: "wallet" },
    { title: "Kart", payment_id: 2, icon: "card" },
    { title: "Ticket", payment_id: 3, icon: "ticket" }
]

</script>

<template>
    <Modal :is-opened="modalStore.debtorUpdate" :handle-close="handleClose" :title="Currents.selectedCustomer?.name"
        icon="person">
        <div class="row">
            <div class="col-12 px-4">
                <input v-model="amount" type="number" class="form-control mb-3" placeholder="Tutar..">
                <div class="d-flex justify-content-between align-items-center gap-3 mb-3" role="button">
                    <div class="w-100" v-for="method in paymentMethods">
                        <div class="payment-method"
                            :class="{ 'active': selectedMethod && selectedMethod.payment_id == method.payment_id }"
                            @click="selectedMethod = method">
                            <ion-icon :name="method.icon" />
                            <span>{{ method.title }}</span>
                        </div>
                    </div>
                </div>
                <button class="w-100" @click="submitDebtorUpdate"> Kaydet </button>
            </div>
        </div>
    </Modal>
</template>

<style scoped lang="scss">
.payment-method {
    padding: 2rem;
    background: #dadada;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
    color: #7c7d99;
    font-size: 16px;
    border-radius: 7px;
    width: 100%;
    font-weight: 500;
    aspect-ratio: 1/1;
    gap: 0.5rem;
}

.payment-method.active {
    background: #7b7d96 !important;
    color: #fff !important;
}

ion-icon {
    font-size: 40px;
}
</style>