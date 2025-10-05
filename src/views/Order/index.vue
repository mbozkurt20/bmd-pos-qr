<template>
  <PosLayout
    type="order"
    :nav-items="getBasketNavItems"
    :is-show-move-button="true"
  >
    <POrder :order-items="tableDetailStore.products" />
    <CreateNoteModal />
    <PFooter></PFooter>
  </PosLayout>
</template>

<script setup lang="ts">
import PosLayout from "../../layouts/Pos.vue";
import PFooter from "../../components/Footer/Footer.vue";
import POrder from "../../components/POrder/POrder.vue";
import {
  tableDetailStore,
  isThereDivideCartItem,
  setIsDivide,
  interactSelectedCartProduct,
  setWillMoveTableId,
  setStateTable,
  onReturn,
  setIsReturn,
  setIsCatering,
  changeTableStatus,
} from "../../store/table-detail";
import {
  setCreateNoteModal,
  setReservationModal,
  setGiftNoteModal,
} from "../../store/modal";
import { computed } from "vue";
import tableDetailNavItems from "../../constants/table-detail-nav-items";
import CreateNoteModal from "../../components/Modal/CreateNote.vue";
import ReservationModal from "../../components/Modal/Reservation.vue";
import GiftNoteModal from "../../components/Modal/GiftNote.vue";
import router from "../../router";

const getBasketNavItems = computed(() => {
  if (tableDetailStore.selectedCartItems.length > 0) {
    const result = [];
    result.push({
      label: "Ekle",
      icon: "add-outline",
      onClick: () => {
        setIsDivide(true);
        interactSelectedCartProduct("increment");
      },
    });
    result.push({
      label: "Çıkar",
      icon: "remove-outline",
      onClick: () => {
        setIsDivide(true);
        interactSelectedCartProduct("decrement");
      },
    });
    result.push({
      label: "Kaldır",
      icon: "trash-outline",
      onClick: () => {
        interactSelectedCartProduct("remove");
      },
    });

    return result;
  } else {
    if (Object.keys(tableDetailStore.table).length) {
      const table = tableDetailStore.table;
      if (table.status === 0) {
        return [
          {
            label: "Not Ekle",
            icon: "copy-outline",
            onClick: () => {
              setCreateNoteModal(true);
            },
          },
        ];
      }
    } else {
      return [];
    }
  }
});
</script>
