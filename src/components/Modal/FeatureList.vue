<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore } from "../../store/modal";
import { tableDetailStore, addToCartProduct, setAddedProductFeatures } from "../../store/table-detail";
import { ref } from "vue";

const portion = ref("1");
const quantity = ref(1);

const handleClose = () => {
  tableDetailStore.selectedProductOnFeature = null
  modalStore.featureList = false;
  portion.value = "1";
  setAddedProductFeatures([]);
}

const onFeatureSelect = () => {
  let product = tableDetailStore.selectedProductOnFeature
  let sendProduct = {
    ...product,
    updated_at: new Date().toString(),
    portion: portion.value,
    quantity: quantity.value ?? 1,
  }
  let addedFeatures = tableDetailStore.addedProductFeatures
  if (addedFeatures && addedFeatures.length > 0) {
    addedFeatures = addedFeatures.filter(feature => {
      if (feature.type == 1) {
        let selected = feature.selected
        if (selected) feature.selected = [feature.selected]
        return selected
      } else if (feature.type == 2) {
        let selectedOptionIds = feature.options.filter(option => {
          let selected = option.selected
          delete option.selected
          return selected
        }).map(option => option.id)
        feature.selected = selectedOptionIds
        return selectedOptionIds.length > 0
      }

    })
    if (addedFeatures.length > 0) {
      sendProduct.featureList = JSON.parse(JSON.stringify(addedFeatures))
    }
  }
  quantity.value = 1
  const audio = new Audio('/dot.mp3');
  audio.play();
  addToCartProduct(sendProduct);
  handleClose()
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
          <div class="d-flex flex-row justify-content-start align-items-center gap-3 mt-3">
            <div class="w-100" v-for="(feature, i) in tableDetailStore.addedProductFeatures" :key="i">

              <div class="features" v-if="feature.type == 1">
                <div class="d-flex align-items-center flex-wrap gap-3 w-100">
                  <div v-for="option in feature.options">
                    <input type="radio" :name="'feature_' + feature.id" v-model="feature.selected" :value="option.id"
                      @click="feature.selected = feature.selected == option.id ? null : option.id" class="btn-check"
                      :id="'option_' + option.id" autocomplete="off">
                    <label class="btn" :class="{ 'active': feature.selected == option.id }" :for="'option_' + option.id">
                      <div class="d-flex flex-column gap-1 justify-content-center align-items-center">
                        <span class="fw-medium">{{ option.name }}</span>
                        <span class="small" style="color: #ed144a;">₺{{ option.price }}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div class="features" v-if="feature.type == 2">
                <div class="feature-name mb-2 small">{{ feature.name }}</div>
                <div class="d-flex align-items-center flex-wrap gap-3 w-100">
                  <div v-for="option in feature.options">
                    <input type="checkbox" :name="'feature_' + feature.id" v-model="option.selected" :value="option.id"
                      class="btn-check" :id="'option_' + option.id" autocomplete="off">
                    <label class="btn" :class="{ 'active': option.selected }" :for="'option_' + option.id">
                      <div class="d-flex flex-column gap-1 justify-content-center align-items-center">
                        <span class="fw-medium">{{ option.name }}</span>
                        <span class="small" style="color: #ed144a;">₺{{ option.price }}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <button @click="onFeatureSelect" class="w-100 text-center py-3">Ekle</button>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
label.btn {
  border: 1px solid #ccc !important;
  width: 130px;
  aspect-ratio: 1.125/1;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

label.btn:hover {
  border: 1px solid #ed144a !important;
}

label.btn.active {
  border: 1px solid #ed144a !important;
  background-color: #ed144a;
  color: #fff;
}

label.active .small {
  color: #fff !important;
}
</style>
