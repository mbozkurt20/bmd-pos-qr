<template>
  <div class="basket-items" v-if="!device.mobile">
    <div class="basket-items-top">
      <div class="basket-items-top-title">
        {{ title }}
      </div>
      <div
        @click="setCustomerListModal(true)"
        class="basket-items-order-person"
        v-if="type === 'packages'"
      >
        <ion-icon name="person-add" style="font-size: 17px" />
        {{ getCustomer }}
      </div>
    </div>
    <div class="basket-items-content">
      <div class="basket-items-row">
        <div style="color: black"></div>
        <PBasketItem
          v-for="item in productItems"
          :key="item.id"
          :item="item"
          :type="type"
          :isBillingPage="isBillingPage"
        />

        <!-- <PayedBasketItem
          v-for="item in productItems"
          :key="item.id"
          :item="item"
          :type="type"
          :isBillingPage="isBillingPage"
        /> -->
      </div>
    </div>
    <div class="basket-items-bottom">
      <h6 v-if="type === 'tables'">TOPLAM</h6>

      <!-- span> Masalar sayfası<span/-->
      <button
        @click="onSave()"
        class="btn-custom"
        v-if="tableDetailStore.table.status === 0 ||
          tableDetailStore.table.status === 2">
        KAYDET 1
      </button>

      <!-- span> Masalar sayfası<span/-->
      <button
        @click="updateProductTables()"
        class="btn-custom"
        v-if="tableDetailStore.table.status === 1">
        KAYDET 2
      </button>

      <!-- span> Gel-al sayfası<span/-->
      <button
        :disabled="!getIsAvailableFastSellButton"
        @click="onFastSell()"
        class="btn-custom"
        v-if="tableDetailStore.table.isFastSell !== undefined"
      >
        KAYDET
      </button>

      <!-- span> Paketler sayfası<span/-->
      <button
        :disabled="!getIsAvailableFastSellButton"
        @click="onPackages()"
        class="btn-custom"
        v-if="tableDetailStore.table.isPackages !== undefined"
      >
        KAYDET
      </button>
<!--      v-if="tableDetailStore.table.status === 3"-->
      <button
        @click="takePayment()"
        class="button-green"
        v-if="tableDetailStore.table.status === 1 || tableDetailStore.table.status === 3"
      >
        ÖDEME AL
      </button>
      <div class="basket-total">
        {{ formatPrice(calculateTotalPrice) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import calculateTime from "../../utils/calculateTime";
import formatPrice from "../../utils/formatPrice";
import {
  addProductToTable,
  tableDetailStore,
  calculatePayedTotal,
  getCartTotal,
  sendPackages,
  itemAbsolutePrice,
  updateProductTables,
} from "../../store/table-detail";
import { setPaymentMethodModal, setCustomerListModal } from "../../store/modal";
import PBasketItem from "./PBasketItem.vue";
import PayedBasketItem from "./PayedBasketItem.vue";
import axios from "axios";
import router from "../../router";
import { device } from "../../main";
import { useRoute } from "vue-router";

const props = defineProps(["type", "productItems", "title"]);

const route = useRoute();

const getCustomer = computed(() => {
  if (tableDetailStore.customer === null) {
    return "Müşteri Seç";
  } else {
    return tableDetailStore.customer.name;
  }
});

const isBillingPage = computed(() => {
  return router.currentRoute.value.fullPath.includes("bill");
});

const payedTotal = computed(() => {
  return calculatePayedTotal();
});

const calculateTotalPrice = computed(() => {
  if (isBillingPage.value) {
    return getCartTotal() - payedTotal.value;
  } else {
    let total = props.productItems.reduce((total, item) => {
      const tableRoute = route.fullPath.split("/")[1] == "tables";
      if (tableRoute) {
        return route.params.id
          ? total + itemAbsolutePrice(item)
          : total + Number(item.amount);
      } else {
        return route.params.id
          ? total + itemAbsolutePrice(item)
          : total + itemAbsolutePrice(item);
      }
    }, 0);
    return total;
  }
});

const getIsAvailableFastSellButton = computed(() => getCartTotal() > 0);

const onSave = () => {
  addProductToTable();
};
const onFastSell = () => {
  if (getIsAvailableFastSellButton.value) {
    setPaymentMethodModal(true);
  }
};
const onPackages = () => {
  if (getIsAvailableFastSellButton.value) {
    if (tableDetailStore.customer === null) {
      setCustomerListModal(true);
    } else {
      setPaymentMethodModal(true);
    }
  }
};

const takePayment = () => {
  router.push(`/tables/${tableDetailStore.table.id}/bill`);
};
</script>

<style scoped>
.basket-items-row .basket-item-time {
  color: #777;
  font-size: 0.9rem;
  margin-right: 1rem;
}

.basket-items-row .basket-item-price {
  color: #000;
  font-size: 1.25rem;
}

.basket-items-order-person {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}
</style>

<style src="./PBasketItems.scss" lang="scss" scoped />
