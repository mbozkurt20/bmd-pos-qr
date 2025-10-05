import {
    addProductToTable,
    setWillMoveTableId,
    tableDetailStore,
    updateProductTables,
    changeTableStatus
} from "../store/table-detail.js";
import router from "../router/index.js";
import {setCreateNoteModal} from "../store/modal.js";

export default [
    {
        label: "Not Ekle",
        icon: "copy-outline",
        onClick: () => {
            setCreateNoteModal(true);
        },
    },


];
