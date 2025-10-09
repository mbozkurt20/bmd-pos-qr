<script setup>
import { ref, computed } from "vue";
import { Menu } from "../../store/menu";
import router from "@/router/index.js";

const search = ref("");
const selectedCategory = ref("all");

// Filtrelenmiş ürün listesi
const filteredProducts = computed(() => {
  return Menu.categories.map(category => ({
    ...category,
    products: category.products.filter(
        p =>
            (selectedCategory.value === "all" || p.category_id === selectedCategory.value) &&
            p.name.toLowerCase().includes(search.value.toLowerCase())
    ),
  }));
});

const table = localStorage.getItem('table') ?? null;

const order = ()  => {
  return router.push({ path: `/tables/${table}` });
}
const rawUserData = localStorage.getItem("userData");
const userData = rawUserData ? JSON.parse(rawUserData) : null;
</script>

<template>
  <section class="menu-container">
    <!-- Başlık -->
    <div class="menu-header">
      <h1>{{userData?.name}} Menü</h1>
      <p class="mt-4"> {{userData.slogan}}</p>

      <button @click="order">Sipariş Ver</button>
    </div>

    <!-- Filtre -->
    <div class="filter-bar">
      <select v-model="selectedCategory">
        <option value="all">Tüm Kategoriler</option>
        <option v-for="cat in Menu.categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
      <input v-model="search" type="text" placeholder="Ürün ara..." />
    </div>

    <p class="text-center mb-4">Kategorilere göre filtreleyin veya ürün arayın</p>

    <!-- Menü Listesi -->
    <div v-for="category in filteredProducts" :key="category.id" class="category-section">
      <div v-if="category.products.length > 0">
        <h2 class="py-4 mt-3">{{ category.name }}</h2>

        <div class="product-grid">
          <div v-for="product in category.products" :key="product.id" class="product-card">
            <div class="product-img">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="details">{{ product.details }}</p>
              <p class="price">₺{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredProducts.every(c => c.products.length === 0)" class="no-products">
      Gösterilecek ürün bulunamadı ☕
    </div>
  </section>
</template>

<style scoped>
/* === GENEL === */
.menu-container {
  background: linear-gradient(to bottom, #000000, #1a1a1a);
  color: #fff;
  font-family: "Raleway", sans-serif;
  min-height: 100vh;
  padding: 60px 20px;
}

/* === BAŞLIK === */
.menu-header {
  text-align: center;
  margin-bottom: 50px;
}
.menu-header h1 {
  font-family: "Oswald", sans-serif;
  font-size: 48px;
  color: #caa76a;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.menu-header p {
  color: #ccc;
  margin-top: 10px;
  font-size: 18px;
}

/* === FİLTRE === */
.filter-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.filter-bar select,
.filter-bar input {
  background: #111;
  color: #caa76a;
  border: 1px solid #caa76a;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 15px;
  outline: none;
  transition: 0.3s;
}
.filter-bar select:hover,
.filter-bar input:focus {
  background: #222;
  box-shadow: 0 0 10px rgba(202, 167, 106, 0.3);
}

/* === KATEGORİ BAŞLIKLARI === */
.category-section h2 {
  color: #caa76a;
  font-size: 24px;
  border-bottom: 2px solid #caa76a;
  margin-bottom: 25px;
  text-transform: uppercase;
}

/* === ÜRÜN GRID === */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
}

/* === KART === */
.product-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(202, 167, 106, 0.3);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(202, 167, 106, 0.25);
  background: rgba(255, 255, 255, 0.08);
}

/* === RESİM === */
.product-img {
  flex-shrink: 0;
  width: 130px;
  height: 130px;
  overflow: hidden;
}
.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.product-card:hover img {
  transform: scale(1.1);
}

/* === BİLGİ === */
.product-info {
  padding: 15px 20px;
  flex: 1;
}
.product-info h3 {
  color: #fff;
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 6px;
}
.product-info .details {
  color: #aaa;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 10px;
}
.product-info .price {
  color: #caa76a;
  font-weight: bold;
  font-size: 17px;
}

/* === ÜRÜN YOKSA === */
.no-products {
  text-align: center;
  color: #888;
  margin-top: 80px;
  font-size: 18px;
}

/* === RESPONSIVE === */
/* === RESPONSIVE === */
@media (max-width: 768px) {
  .menu-header h1 {
    font-size: 36px;
  }

  /* Kart mobilde de yatay kalacak */
  .product-card {
    flex-direction: row; /* column yerine row */
    text-align: left;    /* içerik sola hizalı */
    flex-wrap: wrap;     /* küçük ekranlarda taşmayı önler */
  }

  .product-img {
    width: 120px;   /* daha küçük ekran için uygun boyut */
    height: 120px;  /* aynı oran korunur */
  }

  .product-info {
    padding: 10px 15px;
    flex: 1;
  }

  .product-grid {
    gap: 15px; /* mobilde daha küçük boşluk */
  }
}


</style>

