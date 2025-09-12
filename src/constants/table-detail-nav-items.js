import {
  addProductToTable,
  setWillMoveTableId,
  tableDetailStore,
  updateProductTables,
  changeTableStatus
} from "../store/table-detail.js";
import router from "../router/index.js";
import { setCreateNoteModal } from "../store/modal.js";

export default [
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
          router.push("/tables");
      },
  },
  {
    label: "Taşı",
    icon: "arrow-redo-outline",
    onClick: () => {
      setWillMoveTableId(tableDetailStore.table.id);
      router.push("/tables");
    },
  },
  {
    label: "Not Ekle",
    icon: "copy-outline",
    onClick: () => {
      setCreateNoteModal(true);
    },
  }
];
