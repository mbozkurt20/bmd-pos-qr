<template>
  <PHeaderSmall />
  <div class="empty">
    <div class="content-row">
      <PSidebar
        :col-size="2"
        :nav-items="navItems"
        @activeIndex="handleActiveMenu"
      />
      <div class="col-lg-10 basket-content">
        <div class="row">
          <div class="col-lg-12">
            <div class="basket-card">
              <PGeneral :contents="dynamicContents[currentIndex]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import PHeaderSmall from "../Header/PHeaderSmall/PHeaderSmall.vue";
import PSidebar from "../Header/PSidebar/PSidebar.vue";
import PGeneral from "./PGeneral.vue";

const userData = JSON.parse(localStorage.getItem('userData'))

const navItems = [
  {
    label: "Sistem",
    key: 0,
    url: "/customers",
    icon: '<ion-icon name="settings-outline"></ion-icon>',
  },
  {
    label: "Uygulamalar",
    key: 1,
    url: "/couriers",
    icon: '<ion-icon name="id-card-outline"></ion-icon>',
  },
  {
    label: "Yazarkasa",
    key: 2,
    url: "/waiters",
    icon: '<ion-icon name="file-tray-stacked-outline"></ion-icon>',
  },
  {
    label: "Cihazlar",
    key: 3,
    url: "/waiters",
    icon: '<ion-icon name="desktop-outline"></ion-icon>',
  },
  {
    label: "Yazıcılar",
    key: 4,
    url: "/waiters",
    icon: '<ion-icon name="print-outline"></ion-icon>',
  },
  {
    label: "Kullanıcılar",
    key: 5,
    url: "/waiters",
    icon: '<ion-icon name="people-outline"></ion-icon>',
  },
  {
    label: "Bakım",
    key: 6,
    url: "/waiters",
    icon: '<ion-icon name="build-outline"></ion-icon>',
  },
];
const dynamicContents = ref([
  {
    cardMargin: true,
    title: "SİSTEM AYARLARI",
    inputs: [
      {
        title: "Kullanıcı",
        description: "Açıklama",
        inputType: "input",
        isReadonly: true,
        inputData: userData ? userData.name : '',
      },
      {
        title: "Gün Sonu Saati",
        description: "Açıklama",
        inputType: "input",
        isReadonly: true,
        inputData: "00:00",
      },
    ],
  },
  {
    title: "UYGULAMALAR",
    cardMargin: false,
    inputs: [
      {
        title: "Logo Yazdırma",
        description: "Logo yazdırmayı etkinleştirir",
        inputType: "switch",
        inputData: false,
        key: "logo_printed",
      },
      {
        title: "Bildirimler",
        description: "Online sipariş bildirimlerini etkinleştirir",
        inputType: "switch",
        inputData: false,
        key: "notification",
      },
      {
        title: "Parçalı Ödemeyi Kaydet",
        description: "Ödeme kaydetme özelliğini etkinleştirir.",
        inputType: "switch",
        inputData: false,
        key: "partial_payment",
      },
      {
        title: "CallerID",
        description: "CallerID entegrasyonunu etkinleştirir.",
        inputType: "switch",
        inputData: false,
        key: "callerId",
      },
      {
        title: "Resim Gösterimi",
        description: "Ürün fotoğraflarının gösterim durumunu belirler.",
        inputType: "switch",
        inputData: false,
        key: "product_image",
      },
      {
        title: "Sipariş Yazdırma",
        description: "Sipariş yazdırma özelliğini etkinleştirir",
        inputType: "switch",
        inputData: false,
        key: "auto_order_printed",
      },
      {
        title: "Adisyon Yazdırma",
        description: "Adisyon yazdırma özelliğini etkinleştirir.",
        inputType: "switch",
        inputData: false,
        key: "auto_table_printed",
      },
      {
        title: "İşlem Sonrası Çıkış",
        description:
          "İşlem sonrasında belirlenen ekrana otomatik olarak dönülmesini sağlar.",
        inputType: "switch",
        inputData: false,
        key: "waiter_logout",
      },
    ],
  },
]);
const currentIndex = ref(0);
const handleActiveMenu = (index) => {
  if (index == 0) {
    currentContent.value = dynamicContents.value[0];
    currentSubContent.value = dynamicContents.value[1];
    currentIndex.value = index;
    return;
  }
  currentContent.value = dynamicContents.value[index + 1];
  currentSubContent.value = dynamicContents.value[index + 2];
  currentIndex.value = index;
};
const currentContent = ref(dynamicContents.value[0]);
const currentSubContent = ref(dynamicContents.value[1]);
</script>

<style scoped>
.header {
  margin-bottom: 0;
}

.row {
  height: calc(100vh - 106px);
}

.sidebar {
  border-radius: 25px 0 0 25px;
}

.basket-content {
  border-radius: 0 25px 25px 0;
  height: 100%;
  background: #ebe6f1;
}
.basket-card {
  border-radius: 12px;
  padding: 2rem;
  color: #000;
  margin: 1rem;
  height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.basket-card::-webkit-scrollbar {
  display: none;
}
</style>
