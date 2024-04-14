<script setup lang="ts">
import JsonViewer from './Components/json-viewer.vue'
import { ref } from "vue"

const {title, log} = defineProps(['title', 'log']);

const toggleDisplay = ref(false)

</script>
<template>
    <div>
        <div class="text-white  position-fixed shadow-lg rounded logger-container"  :class="{'active': toggleDisplay}">
            <JsonViewer :value="log" :show="toggleDisplay" :title="title" />
            <div role="button" @click="toggleDisplay = !toggleDisplay" class="logger-display-toggle">
                <ion-icon name="eye-off-outline" v-if="toggleDisplay"></ion-icon>
                <ion-icon name="eye-outline" v-else></ion-icon>
            </div>
        </div>
    </div>
</template>

<style>
.logger-container {
    z-index: 99999999;
    bottom: 25px;
    right: 25px;
    transition: width .1s ease;
    background-color: #282c34;
}

.logger-container:not(.active){
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0 !important;
    right: 0 !important;
}

.logger-container.active {
    width: 600px;
    max-height: 800px;
    overflow-y: overlay;
}

.logger-display-toggle{
    color: white;
    position: sticky;
    bottom: 15px;
    margin-right: 15px;
    font-size: 20px;
    display: flex;
    justify-content: flex-end;
}

.logger-container:not(.active) .logger-display-toggle{
    position: relative !important;
    top: 0 !important;
    right: 0 !important;
    margin-right: 0 !important;
}
</style>