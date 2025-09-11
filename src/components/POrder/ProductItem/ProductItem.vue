<script setup lang="ts">
import formatPrice from "../../../utils/formatPrice";
import {
  addToCartProduct,
  setAddedProductFeatures,
  tableDetailStore,
  setSelectedCategory,
} from "../../../store/table-detail";
import { setFeatureListModal } from "../../../store/modal";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const { product } = defineProps(["product"]);
const route = useRoute();
const packageRoute = ref(route.fullPath.split("/")[1] === "packages");
const fastSell = ref(route.fullPath.split("/")[1] === "fast-sell");

const selectedItem = ref(null); // kısa tıklamada seçilen
const longPressItem = ref(null); // uzun basmada seçilen

const startTime = ref(0);
const pressTimer = ref(null);

const startX = ref(0);
const startY = ref(0);
const moved = ref(false);

const startPress = (item, event) => {
  moved.value = false;
  startTime.value = Date.now();

  if (event.type.startsWith("touch")) {
    const touch = event.touches[0];
    startX.value = touch.clientX;
    startY.value = touch.clientY;
  } else {
    startX.value = event.clientX;
    startY.value = event.clientY;
  }

  pressTimer.value = setTimeout(() => {
    longPressItem.value = item;
    if (item.features?.length) setAddedProductFeatures(item.features);
    tableDetailStore.selectedProductOnFeature = item;
    setFeatureListModal(true);
  }, 500);
};
const movePress = (event) => {
  let x, y;
  if (event.type.startsWith("touch")) {
    const touch = event.touches[0];
    x = touch.clientX;
    y = touch.clientY;
  } else {
    x = event.clientX;
    y = event.clientY;
  }

  const dx = Math.abs(x - startX.value);
  const dy = Math.abs(y - startY.value);

  if (dx > 10 || dy > 10) {
    moved.value = true;
    cancelPress();
  }
};
const endPress = (item) => {
  clearTimeout(pressTimer.value);
  if (moved.value) return; // scroll yaptı, kısa tıklama iptal

  const pressDuration = Date.now() - startTime.value;
  if (pressDuration < 500) {
    selectedItem.value = item;
  }
};

const cancelPress = () => {
  clearTimeout(pressTimer.value);
  startTime.value = 0;
};

const addSelectedToCart = () => {
  if (!selectedItem.value) return;
  const item = selectedItem.value;
  if (packageRoute.value) item.price = item.package_price;
  else if (fastSell.value) item.price = item.fast_price;

  const audio = new Audio("/dot.mp3");
  audio.play();

  addToCartProduct({
    ...item,
    quantity: 1,
    updated_at: new Date().toString(),
    portion: 1,
  });

  selectedItem.value = null;
};

// dış tıklama ile iptal
const handleClickOutside = (event: MouseEvent) => {
  const cards = document.querySelectorAll(".order-card");
  let clickedInside = false;
  cards.forEach((card) => {
    if (card.contains(event.target as Node)) clickedInside = true;
  });
  if (!clickedInside) {
    selectedItem.value = null;
    longPressItem.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const submit = (item) => {
  setSelectedCategory({ id: item.id, label: item.name, url: "/" });
  if (item.children_recursive.length > 0) {
    tableDetailStore.showParent = false;
    tableDetailStore.showSubCategory = true;
    tableDetailStore.subCategory = item.children_recursive;
  } else {
    tableDetailStore.subCategory = [];
    tableDetailStore.showSubCategory = false;
    tableDetailStore.showParent = false;
    tableDetailStore.products = item.products;
  }
};

</script>

<template>
  <div class="orders gap-2 mt-4" v-if="product.length > 0">
    <div
        class="order-card"
        v-for="item in product"
        :key="item.id"
        @mousedown="startPress(item, $event)"
        @touchstart="startPress(item, $event)"
        @mousemove="movePress"
        @touchmove="movePress"
        @mouseup="endPress(item)"
        @touchend="endPress(item)"
        @mouseleave="cancelPress"
        @touchcancel="cancelPress"
    >
      <img :src="item.image" class="order-card-image cursor-pointer" />
      <div class="order-card-name cursor-pointer">{{ item.name }}</div>
      <form class="order-card-info" style="display: flex; align-items: center; gap: 10px;">
        <div class="order-card-price" v-if="packageRoute">{{ formatPrice(item.package_price) }}</div>
        <div class="order-card-price" v-if="fastSell">{{ formatPrice(item.fast_price) }}</div>
        <div class="order-card-price" v-if="!packageRoute && !fastSell">{{ formatPrice(item.price) }}</div>

        <!-- Kısa tıklama Ekle butonu -->
        <button
            v-if="selectedItem === item"
            type="button"
            class="order-card-button"
            @click.stop="addSelectedToCart"
        >
          Ekle
        </button>

        <!-- Uzun basma Feature butonu -->
        <button
            v-if="longPressItem === item"
            type="button"
            class="order-card-button feature-btn"
            @click.stop="() => setFeatureListModal(true)"
        >
          Özellikler
        </button>
      </form>
    </div>
  </div>


  <div class="orders gap-2 mt-4" v-if="tableDetailStore.showParent">
    <div
        class="order-card"
        style="height: 214px"
        v-for="item in tableDetailStore.categories[tableDetailStore.selectedIndex]
        ?.children_recursive"
        :key="item.id"
        @click="submit(item)"
    >
      <div class="cursor-pointer">
        {{ item.name }}
      </div>
    </div>
  </div>
  <div
      class="orders gap-2 mt-4"
      v-if="tableDetailStore.showSubCategory && tableDetailStore.showSubCategory"
  >
    <div
        class="order-card"
        style="height: 214px"
        v-for="item in tableDetailStore.subCategory"
        :key="item.id"
        @click="submit(item)"
    >
      <div class="cursor-pointer">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-card.selected {
  background-color: rgb(222, 223, 222); // hafif mavi arka plan
}
.order-card-button {
  background-color: #cac8c8;
  color: #1a1414;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.order-card-button:hover {
  background-color: #d3d8dd;
}
.feature-btn {
  background-color: #28a745;
}
.feature-btn:hover {
  background-color: #1e7e34;
}
.weather {
  text-align: center;
  color: white;
}

/* İkon */
.weatherIcon {
  padding: 0;
  margin: 0;
  text-align: right;
}

.weatherIcon img {
  width: 4.2vw;
  max-width: 80px;
  min-width: 40px;
}

/* Derece */
.weatherDegree {
  padding: 0;
  margin: 0;
  font-size: 36px;
  position: relative;
}

.weatherDegree span {
  font-size: 22px;
  position: absolute;
}

/* Açıklama */
.weatherDesc {
  font-size: 16px;
  text-transform: capitalize;
  padding: 0;
  margin: 0;
  font-weight: 700;
  text-align: center;
}

/* Tablet için */
@media (max-width: 992px) {
  .weatherIcon img {
    width: 60px;
  }

  .weatherDegree {
    font-size: 28px;
  }

  .weatherDegree span {
    font-size: 18px;
  }

  .weatherDesc {
    font-size: 14px;
  }
}

/* Mobil için */
@media (max-width: 576px) {
  .row {
    flex-direction: column;
    align-items: center;
  }

  .weatherIcon {
    text-align: center;
    margin-bottom: 10px;
  }

  .weatherIcon img {
    width: 50px;
  }

  .weatherDegree {
    font-size: 24px;
  }

  .weatherDegree span {
    font-size: 16px;
  }

  .weatherDesc {
    font-size: 12px;
  }
}

</style>
