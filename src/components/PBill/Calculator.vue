<script setup lang="ts">
import { clickCalculatorButton } from "../../store/bill";
import {toast} from "vue3-toastify";
import router from "@/router";
const handleButtonClick = (val: any) => {
  clickCalculatorButton(val);
};
</script>

<template>
  <div class="bill-calc-row">
    <button class="bill-calc-item" @click="handleButtonClick('7')">7</button>
    <button class="bill-calc-item" @click="handleButtonClick('8')">8</button>
    <button class="bill-calc-item" @click="handleButtonClick('9')">9</button>
    <button class="bill-calc-item" @click="handleButtonClick('remove')">
      <ion-icon name="arrow-back-outline" />
    </button>
    <button class="bill-calc-item" @click="handleButtonClick('4')">4</button>
    <button class="bill-calc-item" @click="handleButtonClick('5')">5</button>
    <button class="bill-calc-item" @click="handleButtonClick('6')">6</button>
    <button class="bill-calc-item" @click="handleButtonClick('C')">C</button>
    <button class="bill-calc-item" @click="handleButtonClick('1')">1</button>
    <button class="bill-calc-item" @click="handleButtonClick('2')">2</button>
    <button class="bill-calc-item" @click="handleButtonClick('3')">3</button>
    <button
      @click="handleButtonClick('enter')"
      class="bill-calc-item bill-calc-item-enter button-pink py-4">
      Ödeme Yap
    </button>
    <button class="bill-calc-item" @click="handleButtonClick('%')">%</button>
    <button class="bill-calc-item" @click="handleButtonClick('0')">0</button>
    <button class="bill-calc-item" @click="handleButtonClick('.')">.</button>
  </div>
</template>

<style scoped lang="scss">
.button-pink {
  background: #dc1862 !important;
}

.button-pink:hover {
  background: #2ac900 !important;
}
.bill-calc-item:hover {
  background: #dc1862;
}
</style>
