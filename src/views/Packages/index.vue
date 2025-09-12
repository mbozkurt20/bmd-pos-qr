<template>
  <PosLayout
    type="packages"
    :nav-items="getBasketNavItems"
    :is-show-move-button="true"
  >
    <POrder :order-items="tableDetailStore.products" />
    <CreateNoteModal />
    <PaymentMethodModal type="packages" />
    <CustomerListModal />
    <CustomerCreateModal />
    <GiftNoteModal />
  </PosLayout>
</template>

<script setup lang="ts">
import PosLayout from "../../layouts/Pos.vue";
import POrder from "../../components/POrder/POrder.vue";
import CreateNoteModal from "../../components/Modal/CreateNote.vue";
import PaymentMethodModal from "../../components/Modal/PaymentMethod.vue";
import CustomerListModal from "../../components/Modal/CustomerList.vue";
import CustomerCreateModal from "../../components/Modal/CustomerCreate.vue";
import GiftNoteModal from "../../components/Modal/GiftNote.vue";
import { appStore } from "../../store/app";
import { onMounted, ref, watch } from "vue";
import {
  setCustomer,
  tableDetailStore,
  setIsDivide,
  interactSelectedCartProduct,
  setWillMoveTableId,
  setStateTable,
  setIsReturn,
  setIsCatering,
  changeTableStatus,
  checkCustomer,
} from "../../store/table-detail";
import {
  setCreateNoteModal,
  setReservationModal,
  setGiftNoteModal,
} from "../../store/modal";
import { computed } from "vue";
import tableDetailNavItems from "../../constants/table-detail-nav-items";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();
let excludedNavItems = ["Taşı"];
if (!route.params.id) {
  excludedNavItems.push("Yazdır");
}

excludedNavItems.forEach((navItemTitle) => {
  const index = tableDetailNavItems.indexOf(
    tableDetailNavItems.find((a) => a.label == navItemTitle)
  );
  if (index > -1) {
    tableDetailNavItems.splice(index, 1);
  }
});

const getBasketNavItems = computed(() => {
  if (tableDetailStore.selectedCartItems.length > 0) {
    const result = [];
    result.push({
      label: " ",
      icon: "add-outline",
      onClick: () => {
        setIsDivide(true);
        interactSelectedCartProduct("decrement");
      },
    });
    result.push({
      label: " ",
      icon: "remove-outline",
      onClick: () => {
        setIsDivide(true);
        interactSelectedCartProduct("increment");
      },
    });

    if (!tableDetailStore.isCatering && !tableDetailStore.isReturn) {
      result.push({
        label: "İkram",
        icon: "gift",
        onClick: () => {
          setGiftNoteModal(true);
        },
      });
    }

    result.push({
      label: "Kaldır",
      icon: "trash-outline",
      onClick: () => {
        interactSelectedCartProduct("remove");
      },
    });

    if (
      tableDetailStore.isCatering ||
      tableDetailStore.isDivide ||
      tableDetailStore.isReturn
    ) {
      result.push({
        label: "İptal",
        icon: "close-outline",
        onClick: () => {
          interactSelectedCartProduct("clear");
          setIsCatering(false);
          setIsReturn(false);
          setIsDivide(false);
        },
      });
    }
    return result;
  } else {
    if (Object.keys(tableDetailStore.table).length) {
      const table = tableDetailStore.table;
      if (table.status === 0) {
        return [
          {
            label: "İptal",
            icon: "close-circle-outline",
            onClick: () => {
              router.push("/tables");
            },
          },
          {
            label: "Not Ekle",
            icon: "copy-outline",
            onClick: () => {
              setCreateNoteModal(true);
            },
          },
          {
            label: "Rezerve",
            icon: "notifications-outline",
            onClick: () => {
              setReservationModal(true);
            },
          },
        ];
      } else {
        return [...tableDetailNavItems];
      }
    } else {
      return [];
    }
  }
});

watch(
  () => appStore.caller,
  () => {
    checkCustomer();
  }
);
</script>
