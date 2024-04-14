<script setup>

import PHeaderSmall from '../../components/Header/PHeaderSmall/PHeaderSmall.vue';
import PSidebar from "../../components/Header/PSidebar/PSidebar.vue"
import StocksTable from "../../components/PDataTable/StocksTable.vue"
import CriticalStocksTable from "../../components/PDataTable/CriticalStocksTable.vue"
import { fetchStocks, fetchCriticalStocks } from "../../store/stocks";
import { ref  } from "vue"
const activeKey = ref(0)


const navItems = [
    {
        label: "Stoklar",
        key: 0,
        icon: '<ion-icon name="cube-outline"></ion-icon>',
    },
    {
        label: "Kritik Stoklar",
        key: 1,
        icon: '<ion-icon name="pricetags-outline"></ion-icon>',
    },
]

const setActiveKey = (key) => {
    activeKey.value = key
    if(activeKey.value == 0){
        fetchStocks()
    }else{
        fetchCriticalStocks()
    }
}

setActiveKey(0)


</script>

<template>
    <PHeaderSmall />
    <div class="empty">
        <div class="content-row">
            <PSidebar :col-size="2" :nav-items="navItems" @activeIndex="setActiveKey" />
            <div class="col-lg-10 basket-content">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="basket-card">
                            <StocksTable v-if="activeKey == 0" />
                            <CriticalStocksTable v-if="activeKey == 1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    margin-bottom: 0;
}

.row {
    height: calc(100vh - 106px);
}


.sidebar {
    border-radius: 25px 0 0 25px;
}

.basket-content {
    border-radius: 0 25px 25px 0;
    height: 100%;
    background: #ebe6f1;
}
</style>