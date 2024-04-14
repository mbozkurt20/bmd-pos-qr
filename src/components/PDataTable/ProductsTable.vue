<script setup>
import { ref } from "vue";
import { changeMenuStatus, Menu } from "../../store/menu";

const dataSearch = ref("");
const dataFilter = ref("all");

const filteredData = () => {
  return Menu.products.filter(
    (product) =>
      (product.category_id == dataFilter.value || dataFilter.value == "all") &&
      product.name.toLowerCase().includes(dataSearch.value.toLowerCase())
  );
};

const setProductStatus = (product) => {
  if (product.status == 1) {
    product.status = 0;
  } else {
    product.status = 1;
  }
  changeMenuStatus("api/v2/menu/destroy", product.id, product.status);
};
</script>

<template>
  <div class="mt-2" style="padding: 10px">
    <div class="table-nav">
      <div class="table-title">Ürünler</div>
      <div class="d-flex gap-3">
        <div class="table-filter">
          <select
            v-model="dataFilter"
            class="form-control form-control-sm rounded-5 w-100 border-2 px-4"
          >
            <option value="all" selected>Tüm Kategoriler</option>
            <option :value="category.id" v-for="category in Menu.categories">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="table-search">
          <div class="position-relative">
            <ion-icon
              class="search-icon md hydrated"
              role="img"
              name="search-outline"
            ></ion-icon>
            <input
              type="text"
              placeholder="Ara.."
              v-model="dataSearch"
              name="customer-search"
              class="customer-search-input form-control form-control-sm rounded-5 border-2 small"
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive" style="max-height: 100vh">
      <table class="table bg-transparent">
        <thead>
          <tr>
            <th>#</th>
            <th>Ürün Adı</th>
            <th>Ürün Fiyatı</th>
            <th>Durumu</th>
          </tr>
        </thead>
        <tbody v-if="filteredData().length > 0">
          <tr v-for="product in filteredData()">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>₺{{ product.price }}</td>
            <td>
              <div class="form-check form-switch">
                <div class="switch-container">
                  <div class="switch" @click="setProductStatus(product)">
                    <input
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      :checked="product.status"
                    />

                    <span class="switch-slider"></span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4" class="w-100 text-center p-5">
              Gösterilecek Ürün Bulunamadı
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./PDataTable.scss"></style>
<style scoped>
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
