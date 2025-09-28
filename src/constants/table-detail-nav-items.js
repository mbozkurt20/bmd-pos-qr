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
        label: "Fiş Yazdır",
        icon: "print-outline",
        onClick: () => {
            changeTableStatus(3)
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
        label: "Masayı Kapat",
        icon: "close-circle-outline",
        onClick: () => {
            changeTableStatus(0);
            router.push("/tables");
        },
    },
    {
        label: "Masalara Git",
        icon: "copy-outline",
        onClick: () => {
            router.push('/tables')
        },
    },

];
