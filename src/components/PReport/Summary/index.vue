<template>
  <div style="min-height: calc(67vh)">
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div id="container" class="card-body">
            <div>
              <Doughnut :data="data" :options="options" />
            </div>
            <div>
              <div
                v-for="(item, index) in data.labels"
                :key="index"
                class="second"
              >
                <span
                  :style="[
                    'backgroundColor:' +
                      data.datasets[0].backgroundColor[index],
                  ]"
                  class="dot"
                ></span>
                %{{ data.datasets[0].data[index] }}
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <div class="row rightBox">
              <div class="col-lg-4">
                <img
                  src="../../../assets/image/coins.png"
                  class="icon"
                  style="width: 30px"
                />
                <span style="margin-left: 20px; font-size: 16px">Nakit</span>
              </div>
              <div class="col-lg-4"></div>
              <div class="col-lg-4" style="text-align: end">
                {{ formatPrice(report.summary.nakit) }}
              </div>
            </div>
            <div class="row rightBox">
              <div class="col-lg-4">
                <img
                  src="../../../assets/image/credit-card.png"
                  class="icon"
                  style="width: 30px"
                />
                <span style="margin-left: 20px; font-size: 16px">Kart</span>
              </div>
              <div class="col-lg-4"></div>
              <div class="col-lg-4" style="text-align: end">
                {{ formatPrice(report.summary.kredi_karti) }}
              </div>
            </div>
            <div class="row rightBox">
              <div class="col-lg-4">
                <img
                  src="../../../assets/image/more.png"
                  class="icon"
                  style="width: 30px"
                />
                <span style="margin-left: 20px; font-size: 16px">Diğer</span>
              </div>
              <div class="col-lg-4"></div>
              <div class="col-lg-4" style="text-align: end">
                {{ formatPrice(report.summary.diger) }}
              </div>
            </div>
            <div class="row" style="padding-top: 10px">
              <div class="col-lg-4">
                <span style="font-size: 18px">Toplam</span>
              </div>
              <div class="col-lg-4"></div>
              <div
                class="col-lg-4"
                style="text-align: end; color: #f2125b; font-weight: bold"
              >
                {{
                  formatPrice(
                    Number(report.summary.diger) +
                      Number(report.summary.nakit) +
                      Number(report.summary.kredi_karti)
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="margin-top: 20px">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <div style="float: left">
              <img src="../../../assets/image/bill-icon.png" class="icon" />
            </div>
            <div style="margin-left: 70px">
              <h5 class="card-title title">Adisyonlar</h5>
              <p class="card-text text">{{ report.summary.adisyonlar }} Adet</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <div style="float: left">
              <img src="../../../assets/image/cashier.png" class="icon" />
            </div>
            <div style="margin-left: 70px">
              <h5 class="card-title title">Kasa</h5>
              <p class="card-text text">
                {{ formatPrice(report.summary.kasa) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <div style="float: left">
              <img src="../../../assets/image/bar-chart.png" class="icon" />
            </div>
            <div style="margin-left: 70px">
              <h5 class="card-title title">Ortalama Kazanç</h5>
              <p class="card-text text">
                {{ formatPrice(report.summary.kazanc) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="margin-top: 20px">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <div style="float: left">
              <img src="../../../assets/image/bill-icon.png" class="icon" />
            </div>
            <div style="margin-left: 70px">
              <h5 class="card-title title">Toplam İndirim</h5>
              <p class="card-text text">
                {{ formatPrice(report.summary.toplam_indirim) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <div style="float: left">
              <img src="../../../assets/image/cashier.png" class="icon" />
            </div>
            <div style="margin-left: 70px">
              <h5 class="card-title title">Cari İşlemleri</h5>
              <p class="card-text text">
                {{ formatPrice(report.summary.cariler) }}
              </p>
            </div>
          </div>
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
import { getSummary, report } from "../../../store/report";
import formatPrice from "../../../utils/formatPrice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);
const refresh = () => {
  getSummary();
};
const data = {
  labels: ["Eti Karam Çikolata", "Doritos Nacho", "Tadelle Kingsize", "Nohut"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};
const total = ref();
onMounted(() => {
  getSummary();
  total.value = parseInt(report.summary.diger);
});
</script>
<style lang="scss" scoped>
#container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
#container > div {
  width: 50%;
  height: 200px;
}
.second {
  margin-top: 10px;
}
.title {
  color: #f2125b !important;
}
.text {
  font-weight: bold;
}
.icon {
  width: 60px;
  opacity: 0.3;
}

.card {
  border-radius: 15px;
  border-style: none;
  height: 100%;
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

.dot {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
.rightBox {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
</style>
