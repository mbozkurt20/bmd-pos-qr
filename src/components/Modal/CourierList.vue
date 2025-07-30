<script setup lang="ts">
import Modal from "./index.vue";
import { modalStore, setCourierListModal } from "../../store/modal";
import {
  changeOrderStatusAPI,
  packageStore,
  setCourier,
  setCouriers,
  setHandoveredCourier,
} from "../../store/package";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
const courier = ref("");

watch(courier, (id, _) => {
  setCourier(packageStore.couriers.find((e) => e.id === id));
});
const courierSearch = ref("");
const selectedCourierId = ref("");
const fetchCouriers = () => {
  axios({
    url: "api/v2/courier/list",
    method: "GET",
    params: {
      domain: localStorage.getItem("domain"),
    },
  })
    .then((res) => {
      if (res.data.success) {
        setCouriers(res.data.couriers);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const handleClose = () => {
  modalStore.courierList = false;
};

onMounted(() => {
  fetchCouriers();
});

const onChoose = (id) => {
  sendCourierToSet(id);
  setHandoveredCourier(3);
  changeOrderStatusAPI(3, id);
  setCourierListModal(false);
  handleClose();
};

const sendCourierToSet = (id) => {
  selectedCourierId.value = id;
  setCourier(packageStore.couriers.find((e) => e.id === id));
  handleClose();
  selectedCourierId.value = "";
  courierSearch.value = "";
};
</script>

<template>
  <Modal
    :is-opened="modalStore.courierList"
    :handle-close="handleClose"
    title="Kurye Seç"
  >
    <div class="row">
      <div class="col-12 px-4">
        <div class="position-relative">
          <ion-icon class="search-icon" name="search-outline" />
          <input
            type="text"
            name="courier-search"
            v-model="courierSearch"
            class="courier-search-input form-control rounded-pill"
            autocomplete="off"
          />
        </div>

        <div class="couriers">
          <div
            @click="onChoose(courier.id)"
            class="courier-row cursor-pointer hoverable"
            :class="{ active: selectedCourierId == courier.id }"
            v-for="courier in packageStore.couriers.filter((post) => {
              return post.name
                .toLowerCase()
                .includes(courierSearch?.toLowerCase());
            })"
          >
            <div class="d-flex justify-content-start align-items-center">
              <ion-icon style="font-size: 18px" name="person-outline" />
              <span class="">{{ courier.name }}</span>
            </div>
            <div>{{ courier.phone }}</div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.courier-row {
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #535353;

  &.active {
    background-color: rgb(241 238 247);
  }
}

.courier-row:hover{
  background: #dc1862;
  color: white;
  border-radius: 10px;
}
.couriers {
  height: 320px;
  overflow-y: overlay;
  overflow-x: hidden;
  margin: 1.5rem 0rem;
}

.add-courier-button {
  background-color: rgb(241 238 247);
  color: rgb(99 88 130);
}
.courier-search-input {
  padding-left: 2.25rem;
  font-size: 16px;
}

.search-icon {
  position: absolute;
  left: 0.5rem;
  top: 0.45rem;
  font-size: 1.5rem;
  color: #f2125b;
}
</style>
