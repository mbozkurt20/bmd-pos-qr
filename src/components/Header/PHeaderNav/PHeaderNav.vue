<template>
    <nav class="header-nav">
        <ul class="header-nav-ul">
            <li class="header-nav-ul-item" v-for="item in menuItems" :key="item.url">
                <router-link :to="item.url">{{ item.label }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
const menuItems = [

]
</script>

<style src="./PHeaderNav.scss" lang="scss" scoped></style>