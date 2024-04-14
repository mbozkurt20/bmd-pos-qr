<script setup>
import { ref, onMounted } from "vue";
import { getCouriers, report } from "../../../store/report";
import formatPrice from "../../../utils/formatPrice";
const dataSearch = ref("");

const filteredData = () => {
  return report.couriers?.filter((courier) =>
    courier.name.toLowerCase().includes(dataSearch.value.toLowerCase())
  );
};
onMounted(() => {
  getCouriers();
});
</script>

<template>
  <div class="mt-2">
    <div class="table-nav">
      <div class="table-title">Kurye Raporları</div>
      <div class="d-flex gap-3">
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
            <th>Kurye Adı</th>
            <th>Telefon</th>
            <th>Nakit</th>
            <th>Kredi Kartı</th>
            <th>Diğer</th>
          </tr>
        </thead>
        <tbody v-if="report.couriers.length > 0">
          <tr v-for="courier in filteredData()">
            <td>{{ courier.name }}</td>
            <td>{{ courier.phone }}</td>
            <td>{{ formatPrice(courier.nakit) }}</td>
            <td>{{ formatPrice(courier.kredi_karti) }}</td>
            <td>{{ formatPrice(courier.diger) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped src="../../PDataTable/PDataTable.scss"></style>
<style scoped></style>
