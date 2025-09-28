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

const selectedItem = ref(null);

const isSelected = (item) => selectedItem.value?.id === item.id;

const selectItem = (item) => {
  selectedItem.value = isSelected(item) ? null : item;
};

const addSelectedToCart = () => {
  if (!selectedItem.value) return;
  const item = { ...selectedItem.value };

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

const openCustomizeModal = (item) => {
  if (item.features?.length) setAddedProductFeatures(item.features);
  tableDetailStore.selectedProductOnFeature = item;
  setFeatureListModal(true);
};

// Dış tıklamada kart seçimini temizle
const handleClickOutside = (event: MouseEvent) => {
  const cards = document.querySelectorAll(".product-card");
  let clickedInside = false;
  cards.forEach((card) => {
    if (card.contains(event.target as Node)) clickedInside = true;
  });
  if (!clickedInside) selectedItem.value = null;
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
  <div class="product-grid" v-if="product.length > 0">
    <div
        class="product-card"
        v-for="item in product"
        :key="item.id"
        @click.stop="selectItem(item)"
    >
      <img :src="item.image" alt="Ürün" class="product-image" />

      <div class="product-info">
        <div class="product-name">{{ item.name }}</div>
        <div class="product-price">
          <span v-if="packageRoute">{{ formatPrice(item.package_price) }}</span>
          <span v-else-if="fastSell">{{ formatPrice(item.fast_price) }}</span>
          <span v-else>{{ formatPrice(item.price) }}</span>
        </div>
      </div>

      <div v-if="isSelected(item)" class="action-buttons">
        <button class="add-button" @click.stop="addSelectedToCart">
          Ekle
        </button>
        <button class="customize-button" @click.stop="openCustomizeModal(item)">
          Özelleştir
        </button>
      </div>
    </div>
  </div>

  <!-- Categories -->
  <div class="orders gap-2 mt-4" v-if="tableDetailStore.showParent">
    <div
        class="order-card"
        style="height: 214px"
        v-for="item in tableDetailStore.categories[tableDetailStore.selectedIndex]?.children_recursive"
        :key="item.id"
        @click="submit(item)"
    >
      <div class="cursor-pointer">{{ item.name }}</div>
    </div>
  </div>

  <div class="orders gap-2 mt-4" v-if="tableDetailStore.showSubCategory">
    <div
        class="order-card"
        style="height: 214px"
        v-for="item in tableDetailStore.subCategory"
        :key="item.id"
        @click="submit(item)"
    >
      <div class="cursor-pointer">{{ item.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  padding: 1rem;
}

.product-card {
  flex: 0 0 200px; // varsayılan genişlik
  min-height: 230px;
  background-color: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }
}

/* Responsive */
@media (max-width: 992px) {
  .product-card {
    flex: 0 0 150px; // tablet için
  }
}

@media (max-width: 576px) {
  .product-card {
    flex: 0 0 150px; // tablet için

  }
}

.product-image {
  width: 100%;
  height: 100px;
  object-fit: contain;
  margin-bottom: 12px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.product-price {
  font-size: 14px;
  font-weight: 500;
  color: #e7004d;
  margin-bottom: 10px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: auto;
  width: 100%;
}

.add-button,
.customize-button {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button {
  background-color: #30d760;
  color: #fff;
  &:hover {
    background-color: #1fde74;
  }
}

.customize-button {
  background-color: #e7004d;
  color: #fff;
  &:hover {
    background-color: #e13a71;
  }
}

/* Responsive */
@media (max-width: 992px) {
  .product-card {
    width: 45vw;
  }
}

@media (max-width: 576px) {
  .product-card {
    width: 90vw;
  }
}
</style>
