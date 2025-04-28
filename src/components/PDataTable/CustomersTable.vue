<script setup>
import {computed, ref} from "vue"
import { Currents } from "../../store/current";

const searchText = ref("")

const filteredData = computed(() => {
  let checkName = (customer) => customer.name.toLowerCase().includes(searchText.value.toLowerCase())
  return Currents.customers.filter(customer => checkName(customer))
})
</script>

<template>
    <div>
        <div class="table-nav">
            <div class="table-title">Müşteriler</div>
            <div class="table-search">
                <div class="position-relative">
                    <ion-icon class="search-icon md hydrated" role="img" name="search-outline"></ion-icon>
                    <input type="text" placeholder="Ara.." v-model="searchText" name="customer-search"
                        class="customer-search-input form-control form-control-sm rounded-5 border-2 small"
                        autocomplete="off">
                </div>
            </div>
        </div>
        <div class="table-responsive mt-2 small" style="max-height: 50vh;overflow: overlay;">
            <table class="table bg-transparent">
                <thead>
                    <tr>
                        <th>Müşteri Adı</th>
                        <th>Telefon Numarası</th>
                        <th>Bakiye</th>
                    </tr>
                </thead>
                <tbody v-if="filteredData.length > 0">
                    <tr v-for="customer in filteredData">
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.phone }}</td>
                        <td>₺{{ customer.amount }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="4" class="w-100 text-center p-5">Gösterilecek Kategori Bulunamadı</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped src="./PDataTable.scss"></style>