<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getSummary, report } from "../../../store/report";
import formatPrice from "../../../utils/formatPrice";

const refresh = () => {
  getSummary();
};

// Diğer alanları hesapla (diger)
const diger = computed(() => {
  const s = report.summary;
  return (
      Number(s.multinet || 0) +
      Number(s.oda_hesap || 0) +
      Number(s.odenmez || 0) +
      Number(s.sodexo || 0) +
      Number(s.ticket || 0)
  );
});

// Ödeme türleri ve toplamları
const paymentTypes = computed(() => {
  const s = report.summary;
  console.log({s : s})
  const total = Number(s.nakit || 0) + Number(s.kredi_karti || 0) + diger.value;
  return [
    {
      items: [
        { label: "İndirim", value: s.indirim || 0, icon: "../../../assets/image/coins.png" },
        { label: "Nakit Giriş", value: s.cash_giris || 0, icon: "../../../assets/image/credit-card.png" },
        { label: "Nakit Çıkış", value: s.cash_cikis, icon: "../../../assets/image/more.png" },
      ],
    },
    {
      items: [
        { label: "Nakit", value: s.nakit || 0, icon: "https://png.pngtree.com/png-clipart/20230116/original/pngtree-cash-money-isometric-flat-illustration-png-image_8916190.png" },
        { label: "Kredi Kart", value: s.kredi_karti || 0, icon: "https://freesvg.org/img/credit-card-front.png" },
        { label: "Eft/Pos", value: s.eft_pos, icon: "../../../assets/image/more.png" },
        { label: "Multinet", value: s.multinet || 0, icon: "../../../assets/image/coins.png" },
        { label: "Sodexo", value: s.sodexo || 0, icon: "../../../assets/image/credit-card.png" },
        { label: "Ticket", value: s.ticket, icon: "../../../assets/image/more.png" },
      ],
      total
    }
  ];
});

// İstatistik kartları
const stats1 = computed(() => {
  const s = report.summary;
  return [
    { label: "Adisyonlar", value: s.adisyon + " Adet", icon: "https://cms.ikas.com/wp-content/uploads/2025/01/e-adisyon-nedir.webp" },
    { label: "Kasa", value: formatPrice(s.cash?.amount || 0), icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWhE2gErZ6L7lUexRPNOAO4zcWIUjPkI4Gxrr-VeQsMBJYstsiFAA8O02hJBbVh6ikM3c&usqp=CAU" },
    { label: "Ortalama Kazanç", value: formatPrice(s.kazanc || 0), icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN4C7G-NG8oPkib6OQi-g48g9BXQn6bNLH7A&s" },
  ];
});

const stats2 = computed(() => {
  const s = report.summary;
  return [
    { label: "Toplam İndirim", value: formatPrice(s.toplam_indirim || 0), icon: "https://t1.pixers.pics/img-d5043af1/cikartmalar-indirim-yuzde.png?H4sIAAAAAAAAA5VPW26DMBC8DkiEXfDbB8hvjoCMMQmNAcsmTdvT11ZV9af9qFarfc3OaOCxJTM7sG47XIR1mSbvYF58npKOLi0frsJGIK113voKEWu9v7po4x6qk5RNSaH6krV-mvy4mnivbscRkgZIpA3LW2bLxSawa4IeOwHIgSnGO3SUKYXdsJm7z8jT_WmmaI42bNcGS9TahODfh-iybHKD8eFm_sHPUCr-w_-LTv3tlCI2tDic9-ziqMoN_lD66iHD4XwBRkBKkAQ4LavhfGFESkk4HWY5qtHaTnScM2XRmJELMtKec2epIO1LuH4CFgNBzIgBAAA=" },
    { label: "Cari İşlemleri", value: formatPrice(s.cariler || 0), icon: "https://sipay.com.tr/wp-content/uploads/2025/05/sipay-blog-gorselleri-mayis-05-png.webp" },
  ];
});

onMounted(() => {
  getSummary();
});
</script>

<template>
  <div class=" py-3">
    <!-- Ödeme Türleri Kartları -->
    <div class="row">
      <div class="col-12 col-md-6" v-for="(type, index) in paymentTypes" :key="index">
        <div class="card mb-3">
          <div class="card-body">
            <div class="row rightBox" v-for="(item, i) in type.items" :key="i">
              <div class="col-12 col-sm-6 d-flex align-items-center mb-2 mb-sm-0">
                <img :src="item.icon" class="icon" />
                <span class="ms-3 fs-6">{{ item.label }}</span>
              </div>
              <div class="col-12 col-sm-6 text-sm-end">
                {{ formatPrice(item.value) }}
              </div>
            </div>
            <div class="row pt-2" v-if="index > 0">
              <div class="col-12 col-sm-6 fs-5">Toplam</div>
              <div class="col-12 col-sm-6 text-sm-end text-danger fw-bold">
                {{ formatPrice(type.total) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- İstatistik Kartları -->
    <div class="row mt-3">
      <div class="col-12 col-md-4 mb-3" v-for="(stat, index) in stats1" :key="index">
        <div class="card h-100">
          <div class="card-body d-flex align-items-center">
            <img :src="stat.icon" class="icon me-3" />
            <div>
              <h5 class="card-title title mb-1">{{ stat.label }}</h5>
              <p class="card-text text mb-0">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 col-md-4 mb-3" v-for="(stat, index) in stats2" :key="index">
        <div class="card h-100">
          <div class="card-body d-flex align-items-center">
            <img :src="stat.icon" class="icon me-3" />
            <div>
              <h5 class="card-title title mb-1">{{ stat.label }}</h5>
              <p class="card-text text mb-0">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Yenile Butonu -->
    <div class="right-actions mt-3">
      <button class="button-pink" @click="refresh">Yenile</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: #f2125b !important;
}
.text {
  font-weight: bold;
}
.icon {
  width: 50px;
  height: auto;
  opacity: 0.3;
}
.card {
  border-radius: 15px;
  border: none;
}
.right-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 3px solid #7777713a;
  button {
    height: 45px;
  }
}
.rightBox {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
@media (max-width: 576px) {
  .icon {
    width: 40px;
  }
  .fs-6 {
    font-size: 0.9rem;
  }
  .fs-5 {
    font-size: 1rem;
  }
}
</style>
