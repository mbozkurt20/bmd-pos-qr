<template>
  <div class="basket-items">
    <!-- Üst Başlık -->
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

    <!-- Ürün Listesi -->
    <div class="basket-items-content">
      <div class="basket-items-row">
        <PBasketItem
            v-for="item in productItems"
            :key="item.id"
            :item="item"
            :type="type"
            v-if="productItems.length"
            :isBillingPage="isBillingPage"
        />

        <p style="color: lightslategray;text-align: center;margin-top: 25px" v-else>Adisyon'da Sipariş Bulunmuyor...</p>
      </div>
    </div>

    <!-- Alt Kısım -->
    <div class="order-actions">
      <div class="order-actions__left">
        <button
            @click="onSave()"
            class="btn btn--primary"
            v-if="(tableDetailStore.table.status === 0 || tableDetailStore.table.status === 2) && productItems.length"
        >
          ADİSYONU KAYDET
        </button>

        <button
            @click="updateProductTables()"
            class="btn btn--primary"
            v-if="tableDetailStore.table.status === 1 || tableDetailStore.table.status === 3"
        >
          ADİSYONU GÜNCELLE
        </button>

        <button
            @click="takePayment()"
            class="btn btn--payment"
            v-if="tableDetailStore.table.status === 1 || tableDetailStore.table.status === 3"
        >
          ÖDEME AL
        </button>
      </div>

      <div class="order-actions__totals">
        <div class="total-box">
          TOPLAM <br> {{ formatPrice(calculateTotalPrice) }}
        </div>
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


<style src="./PBasketItems.scss" lang="scss" scoped />
