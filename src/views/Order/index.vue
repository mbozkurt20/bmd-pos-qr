<template>
  <PosLayout
    type="order"
    :nav-items="getBasketNavItems"
    :is-show-move-button="true"
  >
    <POrder :order-items="tableDetailStore.products" />
    <CreateNoteModal />
    <ReservationModal />
    <GiftNoteModal />
  </PosLayout>
</template>

<script setup lang="ts">
import PosLayout from "../../layouts/Pos.vue";
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

    if (tableDetailStore.isDivide) {
      result.push({
        label: "Taşı",
        icon: "arrow-redo-outline",
        onClick: () => {
          setWillMoveTableId(tableDetailStore.table.id);
          setStateTable(tableDetailStore.cart);
          router.push("/tables");
        },
      });
    }

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
        if (tableDetailStore.table.orders.find((a) => a.printed > 0)) {
          const index = tableDetailNavItems.indexOf(
            tableDetailNavItems.find((a) => a.label == "Taşı")
          );
          if (index > -1) {
            tableDetailNavItems.splice(index, 1);
          }
        }
        return [
          ...tableDetailNavItems,
          table.status === 2 && {
            label: "Rezerve İptal",
            icon: "close-circle-outline",
            onClick: () => {
              changeTableStatus(0);
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
