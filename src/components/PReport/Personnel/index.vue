<script setup>
import { ref, onMounted } from "vue";
import { getPersonnel, report } from "../../../store/report";
import formatPrice from "../../../utils/formatPrice";
import formatDate from "../../../utils/formatDate";
const dataSearch = ref("");

const filteredData = () => {
  return report.personnel?.filter((p) =>
    p.name.toLowerCase().includes(dataSearch.value.toLowerCase())
  );
};

onMounted(() => {
  getPersonnel();
});

const id = ref("" + 1);
const leftZero = ref("0000");
</script>

<template>
  <div class="mt-2">
    <div class="table-nav">
      <div class="table-title">Personeller</div>
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
    <div class="table-responsive" style="min-height: 100px">
      <table class="table bg-transparent">
        <thead>
          <tr>
            <th>Personel Adı</th>
            <th>Tutar</th>
          </tr>
        </thead>
        <tbody v-if="report.personnel.length > 0">
          <tr v-for="(p, index) in filteredData()">
            <td>{{ p.name }}</td>
            <td>{{ formatPrice(p.amount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped src="../../PDataTable/PDataTable.scss"></style>
<style scoped></style>
