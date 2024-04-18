import axios from "axios";

export default function employer({to, next, router}) {

    const token = localStorage.getItem('token') ?? null;
    if (!token) {
        if (to.fullPath === '/employer-login') {
            return next();
        } else {
            return router.push({name: 'EmployerLogin'});
        }
    }

    return next();


}