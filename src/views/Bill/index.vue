<script setup lang="ts">
import PosLayout from "../../layouts/Pos.vue";
import PBill from "../../components/PBill/index.vue";
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
  giftCartProduct,
  setIsBilling,
} from "../../store/table-detail";
import { setCreateNoteModal, setReservationModal } from "../../store/modal";
import { computed } from "vue";
import tableDetailNavItems from "../../constants/table-detail-nav-items";
import CreateNoteModal from "../../components/Modal/CreateNote.vue";
import ReservationModal from "../../components/Modal/Reservation.vue";
import CustomerListModal from "../../components/Modal/CustomerList.vue";
import CustomerCreateModal from "../../components/Modal/CustomerCreate.vue";
import router from "../../router";

const getBasketNavItems = computed(() => {
  if (tableDetailStore.selectedCartItems.length > 0) {
    const result = [];
    result.push({
      label: " ",
      icon: "add-outline",
      onClick: () => {
        setIsDivide(true);
        setIsBilling(true);
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

    if (tableDetailStore.isDivide && !tableDetailStore.isBilling) {
      result.push({
        label: "Taşı",
        icon: "arrow-redo-outline",
        onClick: () => {
          setWillMoveTableId(tableDetailStore.table.id);
          setStateTable(tableDetailStore.cart);
          router.push("/tables");
        },
      });
    } else {
      // if (!tableDetailStore.isCatering && !tableDetailStore.isReturn) {
      //   result.push({
      //     label: "Böl",
      //     icon: "unlink-outline",
      //     onClick: () => {
      //       setIsDivide(!tableDetailStore.isDivide);
      //     },
      //   });
      // }
    }

    if (!tableDetailStore.isCatering && !tableDetailStore.isReturn) {
      result.push({
        label: "İkram",
        icon: "gift",
        onClick: () => {
          giftCartProduct();
        },
      });
    }

    // if (!tableDetailStore.isReturn) {
    //   result.push({
    //     label: "İade",
    //     icon: "trending-up-outline",
    //     onClick: () => {
    //       setIsReturn(!tableDetailStore.isReturn);
    //     },
    //   });
    // } else {
    //   result.push({
    //     label: "Onayla",
    //     icon: "checkmark-outline",
    //     onClick: () => {
    //       onReturn();
    //     },
    //   });
    // }

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
            label: "Yazdır",
            icon: "print-outline",
            onClick: () => {
              changeTableStatus("3")
            }
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

<template>
  <PosLayout
    type="order"
    :nav-items="getBasketNavItems"
    :is-show-rightbar="false"
  >
    <PBill />
    <CreateNoteModal />
    <ReservationModal />
    <CustomerListModal />
    <CustomerCreateModal />
  </PosLayout>
</template>
