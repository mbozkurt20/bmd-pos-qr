import {reactive} from "vue";

export const appStore = reactive({
    loading: false,
    currentEmployer: null,
    employers: [],
    caller: null
});

export const loginEmployer = (payload) => {
    const employer = appStore.employers.find((e) => e.password === payload);
    if (!employer) {
        alert('Bilgileriniz yanlış!')
    } else {
        setCurrentEmployer(employer);
    }


    return employer;
}

export const setCurrentEmployer = (payload) => {
    appStore.currentEmployer = payload;
}

export const setEmployers = (payload) => {
    appStore.employers = payload;
}

export const setLoading = (payload) => {
    appStore.loading = payload;
}