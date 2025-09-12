<template>
  <PosLayout
    type="fast-sell"
    :nav-items="getBasketNavItems"
    :is-show-move-button="true"
  >
    <POrder :order-items="tableDetailStore.products" />
    <CreateNote />
    <PaymentMethod />
  </PosLayout>
</template>

<script setup lang="ts">
import PosLayout from "../../layouts/Pos.vue";
import POrder from "../../components/POrder/POrder.vue";
import {
  tableDetailStore,
  interactSelectedCartProduct,
  changeTableStatus,
  updateProductTables,
} from "../../store/table-detail";
import { setCreateNoteModal } from "../../store/modal";
import { computed } from "vue";
import tableDetailNavItems from "../../constants/table-detail-nav-items";
import CreateNote from "../../components/Modal/CreateNote.vue";
import PaymentMethod from "../../components/Modal/PaymentMethod.vue";
import router from "@/router";

const getBasketNavItems = computed(() => {
  if (tableDetailStore.selectedCartItems.length > 0) {
    return [
      {
        label: "Arttır",
        icon: "add-outline",
        onClick: () => {
          interactSelectedCartProduct("increment");
        },
      },
      {
        label: "Azalt",
        icon: "remove-outline",
        onClick: () => {
          interactSelectedCartProduct("decrement");
        },
      },
      {
        label: "Böl",
        icon: "unlink-outline",
        onClick: () => {},
      },
      {
        label: "Kaldır",
        icon: "trash-outline",
        onClick: () => {
          interactSelectedCartProduct("remove");
        },
      },
    ];
  } else {
    if (Object.keys(tableDetailStore.table).length) {
      const table = tableDetailStore.table;
      if (table.status === 0) {
        return [
          {
            label: "İkram",
            icon: "gift",
          },
          {
            label: "Yazdır",
            icon: "print-outline",
            onClick: () => {
              changeTableStatus("3")
            }
          },
          {
            label: "İptal",
            icon: "close-circle-outline",
            onClick: () => {
              changeTableStatus(0);
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
        ];
      } else {
        return tableDetailNavItems;
      }
    } else {
      return [];
    }
  }
});
</script>
