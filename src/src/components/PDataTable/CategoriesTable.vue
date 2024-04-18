<script setup>
import { ref } from "vue"
import { Menu } from "../../store/menu";

const dataSearch = ref("")

const filteredData = () => {
    return Menu.categories.filter(category => category.name.toLowerCase().includes(dataSearch.value.toLowerCase()))
}
</script>

<template>
    <div>
        <div class="table-nav">
            <div class="table-title">Kategoriler</div>
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
                        <th>#</th>
                        <th>Kategori Adı</th>
                    </tr>
                </thead>
                <tbody v-if="filteredData().length > 0">
                    <tr v-for="category in filteredData()">
                        <td>{{ category.id }}</td>
                        <td>{{ category.name }}</td>
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