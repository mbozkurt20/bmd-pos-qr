<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore } from "../../store/modal";
import { sendSelf, sendPackages, getCartTotal } from "../../store/table-detail";
import { ref, watch } from "vue";
import formatPrice from "../../utils/formatPrice";
import { tableDetailStore } from "../../store/table-detail";
import { useRoute } from "vue-router";
const route = useRoute();

const props = defineProps(["type"]);

const handleClose = () => {
  modalStore.paymentMethod = false;
};

const paymentMethods = [
  { title: "Nakit", id: 0, icon: "wallet" },
  { title: "Kart", id: 1, icon: "card" },
  { title: "Ticket", id: 2, icon: "ticket" },
];

if (props.type === "packages" && route.params.id) {
  let i = setInterval(() => {
    if (tableDetailStore.table.payment_method != undefined) {
      selectedMethod.value = paymentMethods.find(
        (method) => method.title == tableDetailStore.table.payment_method
      );
      clearInterval(i);
    }
  }, 100);
}

const selectedMethod = ref();

const sendMethod = () => {
  if (props.type === "packages") {
    sendPackages(selectedMethod.value.title);
  } else {
    sendSelf(selectedMethod.value.title);
  }
  modalStore.paymentMethod = false;
};
</script>

<template>
  <Modal
    :is-opened="modalStore.paymentMethod"
    :handle-close="handleClose"
    title="Ödeme Yöntemi Seçin"
    icon="wallet"
  >
    <div class="row">
      <div class="col-12 px-4">
        <div class="total">Toplam: {{ formatPrice(getCartTotal()) }}</div>
        <div
          class="d-flex justify-content-between align-items-center gap-3 mb-3"
          role="button"
        >
          <div class="w-100" v-for="method in paymentMethods">
            <div
              class="payment-method"
              :class="{
                active: selectedMethod && selectedMethod.id == method.id,
              }"
              @click="selectedMethod = method"
            >
              <ion-icon :name="method.icon" />
              <span>{{ method.title }}</span>
            </div>
          </div>
        </div>
        <button class="w-100" @click="sendMethod" style="color: black">
          Tamamla
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.total {
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

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
