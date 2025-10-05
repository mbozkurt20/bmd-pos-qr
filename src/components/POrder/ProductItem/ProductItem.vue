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
        :class="{ selected: isSelected(item) }"
    >
      <!-- Sol: Görsel -->
      <div class="product-image-container">
        <img :src="item.image" alt="Ürün" class="product-image" />
      </div>

      <!-- Sağ: Bilgiler -->
      <div class="product-details">
        <div class="product-name">{{ item.name }}</div>
        <div class="product-price">
          <span v-if="packageRoute">{{ formatPrice(item.package_price) }}</span>
          <span v-else-if="fastSell">{{ formatPrice(item.fast_price) }}</span>
          <span v-else>{{ formatPrice(item.price) }}</span>
        </div>

        <div v-if="isSelected(item)" class="action-buttons">
          <button class="add-button" @click.stop="addSelectedToCart">Ekle</button>
          <button class="customize-button" @click.stop="openCustomizeModal(item)">
            Özelleştir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Grid düzeni */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 16px;
}

/* Kart görünümü */
.product-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease;
  min-height: 120px;
  padding: 8px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.12);
  }

  &.selected {
    border: 2px solid #e7004d;
  }
}

/* Görsel alanı */
.product-image-container {
  flex: 0 0 90px; /* Görsel genişliği */
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f8f8f8;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

/* Sağ taraf */
.product-details {
  flex: 1;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.product-name {
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
  line-height: 1.3;
}

.product-price {
  font-size: 14px;
  font-weight: 500;
  color: #e7004d;
  margin-bottom: 8px;
}

.action-buttons {
  display: flex;
  gap: 6px;
  margin-top: 4px;
}

.add-button,
.customize-button {
  flex: 1;
  padding: 5px 0;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-button {
  background-color: #30d760;
  color: #fff;
  &:hover {
    background-color: #28c156;
  }
}

.customize-button {
  background-color: #e7004d;
  color: #fff;
  &:hover {
    background-color: #c90044;
  }
}

/* Responsive */
@media (max-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  .product-card {
    min-height: 110px;
  }
  .product-image-container {
    flex: 0 0 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  .product-card {
    flex-direction: row;
    width: 100%;
  }
  .product-image-container {
    flex: 0 0 70px;
    height: 70px;
  }
  .product-details {
    padding: 6px 10px;
  }
  .product-name {
    font-size: 14px;
  }
  .product-price {
    font-size: 13px;
  }
}
</style>
