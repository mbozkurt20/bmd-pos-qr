<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore } from "../../store/modal";
import { tableDetailStore, addToCartProduct, setAddedProductFeatures } from "../../store/table-detail";
import { ref } from "vue";
import {useRoute} from "vue-router";
const route = useRoute();
const packageRoute = ref(route.fullPath.split("/")[1] === "packages");
const fastSell = ref(route.fullPath.split("/")[1] === "fast-sell");
const portion = ref("1");
const quantity = ref(1);
const selectedFeature = ref(null)

const handleClose = () => {
  tableDetailStore.selectedProductOnFeature = null
  modalStore.featureList = false;
  portion.value = "1";
  setAddedProductFeatures([]);
}



const toggleFeature = (feature) => {
  selectedFeature.value = feature.id

  const updated = tableDetailStore.addedProductFeatures.map(f => ({
    ...f,
    selected: f.id === feature.id
  }))

  setAddedProductFeatures(updated)
}

const onFeatureSelect = () => {
  let product = tableDetailStore.selectedProductOnFeature
  console.log({product:product})
  let sendProduct = {
    ...product,
    updated_at: new Date().toString(),
    portion: portion.value,
    selectedFeatureId: selectedFeature.value,
    quantity: quantity.value ?? 1,
  }

  if (packageRoute.value && product.package_price) {
    sendProduct.price = product.package_price
  } else if (fastSell.value && product.fast_price) {
    sendProduct.price = product.fast_price
  }

  quantity.value = 1
  const audio = new Audio('/dot.mp3');
  audio.play();
  addToCartProduct(sendProduct);
  handleClose()

  selectedFeature.value  = null
}

const setQuantity = (type) => {
  if (type == '+') {
    quantity.value++
  } else if (type == '-' && quantity.value != 1) {
    quantity.value--
  }
}

</script>

<template>
  <Modal :is-opened="modalStore.featureList" :handle-close="handleClose" :width="'920px'"
         :title="tableDetailStore.selectedProductOnFeature?.name">
    <div class="row px-3">
      <div class="col-lg-4">
        <div class="border p-4 rounded-3 h-100">
          <!-- Quantity -->
          <input type="number" v-model="quantity" class="form-control lead fs-5 mb-3 rounded-3 text-center"
                 style="border-color: #ccc;" />
          <div class="d-flex align-items-center justify-content-between">
            <div class="btn btn-danger opacity-75 text-center w-100 py-3" @click="setQuantity('-')">
              <ion-icon name="remove-circle-outline"></ion-icon>
            </div>
            <div class="btn btn-success opacity-75 text-center w-100 py-3" @click="setQuantity('+')">
              <ion-icon name="add-outline"></ion-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="border p-4 rounded-3">
          <!-- Portion -->
          <div class="d-flex flex-row justify-content-start align-items-center gap-3">
            <div class="w-100">
              <div class="features">
                <div class="d-flex align-items-center flex-wrap gap-3 w-100">
                  <div>
                    <input type="radio" name="portion_05" @click="portion = portion == '0.5' ? '1' : '0.5'" value="0.5"
                           class="btn-check" id="portion_05" autocomplete="off">
                    <label class="btn" :class="{ 'active': portion == '0.5' }" for="portion_05">
                      <div class="d-flex flex-column gap-1 justify-content-center align-items-center">
                        <span class="fw-medium">Yarım</span>
                        <span class="small" style="color: #ed144a;">1/2</span>
                      </div>
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="portion_1" @click="portion = portion == '1' ? '1' : '1'" value="1"
                           class="btn-check" id="portion_1" autocomplete="off">
                    <label class="btn" :class="{ 'active': portion == '1' }" for="portion_15">
                      <div class="d-flex flex-column gap-1 justify-content-center align-items-center">
                        <span class="fw-medium">1 Porsiyon</span>
                        <span class="small" style="color: #ed144a;">x1</span>
                      </div>
                    </label>
                  </div>

                  <div>
                    <input type="radio" name="portion_15" @click="portion = portion == '1.5' ? '1' : '1.5'" value="1.5"
                           class="btn-check" id="portion_15" autocomplete="off">
                    <label class="btn" :class="{ 'active': portion == '1.5' }" for="portion_15">
                      <div class="d-flex flex-column gap-1 justify-content-center align-items-center">
                        <span class="fw-medium">1.5 Porsiyon</span>
                        <span class="small" style="color: #ed144a;">x1.5</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Features -->
          <div class="d-flex flex-row justify-content-start align-items-center mt-3">
            <div
                class="features"
                v-for="feature in tableDetailStore.addedProductFeatures"
                :key="feature.id"
            >
              <input
                  type="radio"
                  class="btn-check"
                  name="feature_group"
                  :id="'feature_' + feature.id"
                  autocomplete="off"
                  :checked="selectedFeature === feature.id"
                  @click="toggleFeature(feature)"
              />

              <label
                  class="btn"
                  :for="'feature_' + feature.id"
                  :class="{ active: selectedFeature === feature.id }"
              >
                <div class="d-flex flex-column align-items-center gap-1">
                  <span class="fw-medium">{{ feature.name }}</span>
                  <span class="small text-danger">₺{{ feature.price }}</span>
                </div>
              </label>
            </div>

          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <button @click="onFeatureSelect" class="btn-custom w-100 text-center py-3">Ekle</button>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
label.btn {
  border: 1px solid #dee2e6 !important;
  width: 130px;
  aspect-ratio: 1.125 / 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f8f9fa;
  color: #212529;
  border-radius: 10px;
  transition: all 0.2s ease;
}

/* Hover */
label.btn:hover {
  border-color: #30d760 !important;
  background-color: #fff0f4;
}

/* Aktif */
label.btn.active {
  border-color: #30d760 !important;
  background-color: #30d760;
  color: #ffffff;
  box-shadow: 0 6px 14px rgba(237, 20, 74, 0.35);
  transform: scale(1.03);
}

/* Aktif fiyat rengi */
label.btn.active .small {
  color: #ffe3ea !important;
}

/* Normal fiyat */
label .small {
  color: #30d760;
  font-weight: 500;
}

</style>
