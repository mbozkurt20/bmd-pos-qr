<script setup>
import { ref } from "vue"
import { Stocks } from "../../store/stocks";

const dataSearch = ref("")

const filteredData = () => {
    let checkName = (stock) => stock.name.toLowerCase().includes(dataSearch.value.toLowerCase())
    let checkCode = (stock) => stock.code.toLowerCase().includes(dataSearch.value.toLowerCase())
    return Stocks.critical.filter(stock => checkName(stock) || checkCode(stock))
}
</script>

<template>
    <div>
        <div class="table-nav">
            <div class="table-title">Kritik Stoklar</div>
            <div class="table-search">
                <div class="position-relative">
                    <ion-icon class="search-icon md hydrated" role="img" name="search-outline"></ion-icon>
                    <input type="text" placeholder="Ara.." v-model="dataSearch" name="customer-search"
                        class="customer-search-input form-control form-control-sm rounded-5 border-2 small"
                        autocomplete="off">
                </div>
            </div>
        </div>
        <div class="table-responsive mt-2 small" style="max-height: 50vh;overflow: overlay;">
            <table class="table bg-transparent">
                <thead>
                    <tr>
                        <th>Stok Kodu</th>
                        <th>Stok Adı</th>
                        <th>Kategori Adı</th>
                        <th>Miktar</th>
                    </tr>
                </thead>
                <tbody v-if="filteredData().length > 0">
                    <tr v-for="stock in filteredData()">
                        <td>{{ stock.code }}</td>
                        <td>{{ stock.name }}</td>
                        <td>{{ stock.category.name }}</td>
                        <td>{{ stock.amount }}</td>
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