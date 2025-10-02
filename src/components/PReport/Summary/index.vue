<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getSummary, report } from "../../../store/report";
import formatPrice from "../../../utils/formatPrice";

const refresh = () => {
  getSummary();
};

// Diğer alanları hesapla
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
  const total = Number(s.nakit || 0) + Number(s.kredi_karti || 0) + diger.value;
  return [
    {
      items: [
        { label: "İndirim", value: s.indirim || 0, emoji: "💰" },
        { label: "Nakit Giriş", value: s.cash_giris || 0, emoji: "💵" },
        { label: "Nakit Çıkış", value: s.cash_cikis, emoji: "💸" },
      ],
    },
    {
      items: [
        { label: "Nakit", value: s.nakit || 0, emoji: "🤑" },
        { label: "Kredi Kart", value: s.kredi_karti || 0, emoji: "💳" },
        { label: "Eft/Pos", value: s.eft_pos, emoji: "🏧" },
        { label: "Multinet", value: s.multinet || 0, emoji: "🎫" },
        { label: "Sodexo", value: s.sodexo || 0, emoji: "🥪" },
        { label: "Ticket", value: s.ticket, emoji: "🎟️" },
      ],
      total
    }
  ];
});

// İstatistik kartları
const stats1 = computed(() => {
  const s = report.summary;
  return [
    { label: "Adisyonlar", value: s.adisyon + " Adet", emoji: "🧾" },
    { label: "Kasa", value: formatPrice(s.cash?.amount || 0), emoji: "🏦" },
    { label: "Ortalama Kazanç", value: formatPrice(s.kazanc || 0), emoji: "📈" },
  ];
});

const stats2 = computed(() => {
  const s = report.summary;
  return [
    { label: "Toplam İndirim", value: formatPrice(s.toplam_indirim || 0), emoji: "🔖" },
    { label: "Cari İşlemleri", value: formatPrice(s.cariler || 0), emoji: "📊" },
  ];
});

onMounted(() => {
  getSummary();
});
</script>

<template>
  <div class="py-3">
    <!-- Ödeme Türleri Kartları -->
    <div class="row">
      <div class="col-12 col-md-6" v-for="(type, index) in paymentTypes" :key="index">
        <div class="card mb-3">
          <div class="card-body">
            <div class="row rightBox" v-for="(item, i) in type.items" :key="i">
              <div class="col-12 col-sm-6 d-flex align-items-center mb-2 mb-sm-0">
                <span class="emoji fs-2">{{ item.emoji }}</span>
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
            <span class="emoji fs-2 me-3">{{ stat.emoji }}</span>
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
            <span class="emoji fs-2 me-3">{{ stat.emoji }}</span>
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
.emoji {
  display: inline-block;
  width: 50px;
  text-align: center;
  opacity: 0.9;
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
  .emoji {
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
