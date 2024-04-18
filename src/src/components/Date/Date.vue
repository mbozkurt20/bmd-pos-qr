<template>
    <div class="home">
            <div class="date">
                <PDateFormatted />
                <PDateTime />
            </div>
    </div>
</template>

<script setup lang="ts">
import PDateFormatted from "./PDateFormatted/PDateFormatted.vue"
import PDateTime from "./PDateTime/PDateTime.vue"
</script>

<style src="./Date.scss" lang="scss" />