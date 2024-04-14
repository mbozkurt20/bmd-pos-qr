<template>
  <div>
    <h6 class="content-title">İşlemler</h6>
    <div class="setting">
      <div class="setting-item">
        <div class="left-side">
          <span class="title">Pos Satışı</span>
        </div>
        <div class="right-side">{{ formatPrice(0) }}</div>
      </div>
      <div class="setting-item">
        <div class="left-side">
          <span class="title">Kasaya Giriş</span>
        </div>
        <div class="right-side">{{ formatPrice(report.cash.giris) }}</div>
      </div>
      <div class="setting-item">
        <div class="left-side">
          <span class="title">Kasadan Çıkış</span>
        </div>
        <div class="right-side">{{ formatPrice(report.cash.cikis) }}</div>
      </div>
      <div class="setting-item">
        <div class="left-side">
          <span class="title">Gelen Ödeme</span>
        </div>
        <div class="right-side">{{ formatPrice(0) }}</div>
      </div>
      <div class="setting-item">
        <div class="left-side">
          <span class="title">Yapılan Ödeme</span>
        </div>
        <div class="right-side">{{ formatPrice(0) }}</div>
      </div>
      <div class="setting-item">
        <div class="left-side">
          <span class="title">Toplam</span>
        </div>
        <div class="right-side">
          {{
            formatPrice(Number(report.cash.giris) + Number(report.cash.cikis))
          }}
        </div>
      </div>
    </div>
  </div>
  <div style="margin-top: 10px">
    <h6 class="content-title">Kasa Bilgileri</h6>
    <div class="setting">
      <div class="setting-item">
        <div class="left-side">
          <span class="title">Nakit</span>
        </div>
        <div class="right-side">
          {{ formatPrice(report.cash.nakit) }}
        </div>
      </div>
      <div class="setting-item">
        <div class="left-side">
          <span class="title">Kart</span>
        </div>
        <div class="right-side">{{ formatPrice(report.cash.kredi_karti) }}</div>
      </div>

      <div class="setting-item">
        <div class="left-side">
          <span class="title">Toplam</span>
        </div>
        <div class="right-side">
          {{
            formatPrice(
              Number(report.cash.nakit) + Number(report.cash.kredi_karti)
            )
          }}
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="right-actions">
      <div class="d-flex">
        <button class="button-pink" @click="refresh">Yenile</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUpdated, watch } from "vue";
const { contents } = defineProps(["contents"]);
const flag = ref();
import { getCash, report } from "../../../store/report";
import formatPrice from "../../../utils/formatPrice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const refresh = () => {
  getCash();
};

onMounted(() => {
  getCash();
});
</script>
<style lang="scss" scoped>
.title {
  color: #000 !important;
  font-weight: bold;
}

.right-actions {
  text-align: center;
  padding: 1rem;
  margin-top: 1rem;
  border-top: 3px solid #7777713a;
  display: flex;
  align-items: center;
  justify-content: end;

  button {
    height: 45px;
    margin-left: 10px;
  }
}

.basket-card {
  border-radius: 12px;
  padding: 2rem;
  color: #000;
  margin: 1rem;
}
.content-title {
  color: #dc1862;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #00000011;
  padding: 12px;
}

.setting-item:not(:first-child) {
  margin-top: 12px;
}

.left-side {
  display: flex;
  flex-direction: column;
}
.left-side .title {
  font-size: 18px;
}
.left-side .description {
  font-size: 12px;
  color: grey;
}
.right-side span {
  background-color: white;
  padding: 4px;
  border-radius: 12px;
  font-weight: 500;
}
.switch-container {
  display: flex;
  align-items: center;
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
  width: 50px;
  height: 24px;
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
  background-color: #ed5249 !important;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 20px;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .switch-slider {
  background-color: #28a745 !important;
}

input:focus + .switch-slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .switch-slider:before {
  -webkit-transform: translateX(25px);
  -ms-transform: translateX(25px);
  transform: translateX(25px);
}
</style>
