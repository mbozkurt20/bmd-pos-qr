<template>
  <div
    class="content"
    style="border-top-right-radius: 12px; border-bottom-right-radius: 12px"
  >
    <div class="content-top">
      <div class="content-top-left d-flex">
        <!-- <div class="content-title d-flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
            <ellipse cx="256" cy="128" rx="192" ry="80" fill="none" stroke="currentColor" stroke-linecap="round"
                     stroke-miterlimit="10" stroke-width="32"/>
            <path d="M448 214c0 44.18-86 80-192 80S64 258.18 64 214M448 300c0 44.18-86 80-192 80S64 344.18 64 300"
                  fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>
            <path d="M64 127.24v257.52C64 428.52 150 464 256 464s192-35.48 192-79.24V127.24" fill="none"
                  stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>
          </svg>
          Ödeme Al
        </div> -->
        <div class="d-flex">
          <!-- <div class="switch-container" @click="switchValue = !switchValue">
            <div class="switch">
              <input type="checkbox" v-model="switchValue">
              <span class="switch-slider"></span>
            </div>
            <div class="switch-right">
              <div class="switch-label">GMP3</div>
              <div class="switch-state">{{ switchValue ? 'Açık' : 'Kapalı' }}</div>
            </div>
          </div> -->
          <div class="switch-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M336 208v-95a80 80 0 00-160 0v95"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <rect
                x="96"
                y="208"
                width="320"
                height="272"
                rx="48"
                ry="48"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
            </svg>
            <div class="switch-right">
              <div class="switch-label">Adisyon</div>
              <div class="switch-state">Kapalı</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-top-right d-flex">
        <Prices
          :left="formatPrice(getTotalCart)"
          :payed="formatPrice(payedTotal)"
        />
        <router-link
          :to="`/tables/${tableDetailStore.table.id}`"
          class="orders-close"
        >
          <ion-icon style="font-size: 25px" name="close-outline" />
        </router-link>
      </div>
    </div>
    <div class="bill mt-4">
      <div class="bill-top d-flex">
        <div class="bill-top-price d-flex">
          <button
            @click="billStore.amount = Number(item)"
            class="bill-top-price-item"
            v-for="item in prices"
          >
            ₺{{ item }}
          </button>
        </div>
        <button v-if="getTotalCart >= 0" @click="allPay" class="button-pink">
          Kalanı Öde {{ formatPrice(getTotalCart) }}
        </button>
      </div>
      <Payments />
    </div>
    <div class="bill-calc mt-auto">
      <div class="row">
        <PaymentMethods :items="paymentMethods.slice(0, 5)" />
        <div class="col-lg-6">
          <div class="input-wrapper">
            <div class="input-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#DC1862"
                height="18px"
                class="ionicon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 01-.09-22.63L303.58 272H170a16 16 0 010-32h133.58l-52.32-52.73A16 16 0 11274 164.73l79.39 80a16 16 0 010 22.54l-79.39 80a16 16 0 01-22.65.09z"
                />
              </svg>
              {{ getSelectedMethodName() }}
            </div>
            <div class="input-price">
              {{ formatPrice(billStore.amount) }}
            </div>
          </div>
          <Calculator />
        </div>
        <PaymentMethods :items="paymentMethods.slice(5)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  billStore,
  paymentMethods,
  getSelectedMethodName,
  setBillingCart,
  setPayAllAmount,
} from "../../store/bill";
import Calculator from "./Calculator.vue";
import PaymentMethods from "./PaymentMethods.vue";
import Prices from "./Prices.vue";
import Payments from "./Payments/index.vue";
import formatPrice from "../../utils/formatPrice";

const switchValue = ref(true);

import {
  addPayment,
  calculatePayedTotal,
  getCartTotal,
  tableDetailStore,
  itemAbsolutePrice,
  getProductPaidTotalFromPayments,
} from "../../store/table-detail";

const payedTotal = computed(() => {
  return calculatePayedTotal();
});

const getTotalCart = computed(() => {
  let selectedCartItem = tableDetailStore.selectedCartItems[0];
  if (selectedCartItem) {
    if (
      selectedCartItem.divideQuantity &&
      selectedCartItem.divideQuantity > 0
    ) {
      return (
        Number(
          (itemAbsolutePrice(selectedCartItem) -
            (getProductPaidTotalFromPayments(selectedCartItem.id) %
              itemAbsolutePrice(selectedCartItem, true))) /
            selectedCartItem.quantity
        ) * selectedCartItem.divideQuantity
      );
    }
    return (
      itemAbsolutePrice(selectedCartItem) -
      (getProductPaidTotalFromPayments(selectedCartItem.id) %
        itemAbsolutePrice(selectedCartItem, true))
    );
  }

  if (getCartTotal() == payedTotal.value) {
    return 0;
  }

  if (billStore.productAmount > 0) {
    return billStore.productAmount;
  }

  return getCartTotal() - payedTotal.value;
});

const allPay = () => {
  setPayAllAmount(getTotalCart.value);
};

const prices = [5, 10, 20, 50, 100, 200];

const billItems = [
  {
    label: "Nakit",
    price: 25,
  },
  {
    label: "Nakit",
    price: 25,
  },
];
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 0;
}

.basket-items {
  width: 32%;

  &-top {
    .d-flex {
      button {
        border-radius: 100%;
        width: 35px;
        height: 35px;
        justify-content: center;
      }
    }
  }

  &-order .basket-item-price {
    color: rgb(109, 41, 12);
  }
}

.return-button {
  border-radius: 35px;
  text-transform: none;
  background: #eee;
  border: 0;
}
</style>

<style lang="scss" scoped>
.switch-container {
  display: flex;
  align-items: center;
  border: 2px solid #7777774e;
  border-radius: 8px;
  gap: 8px;
  cursor: pointer;
  padding: 2px 6px;
  color: #777;
}

.switch-container svg {
  height: 18px;
}

.switch-label {
  margin-right: 10px;
}

.switch-right {
  flex-direction: column;
  display: flex;
}

.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 15px;
}

.switch-label {
  font-size: 14px;
  font-weight: 600;
}

.switch-state {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #a1a1a1;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 20px;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .switch-slider {
  background-color: #08ab10;
}

input:focus + .switch-slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .switch-slider:before {
  -webkit-transform: translateX(15px);
  -ms-transform: translateX(15px);
  transform: translateX(15px);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px;
  height: 60px;
  border: 4px solid #504f4f72;
  border-radius: 45px;
  background: #fff;
  color: #000;
}

.input-left {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.input-price {
  font-size: 24px;
  font-weight: 600;
}
</style>

<style src="./PBill.scss" lang="scss"></style>
