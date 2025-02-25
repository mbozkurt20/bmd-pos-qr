import axios from "axios";

export default function employer({to, next, router}) {
    const token = localStorage.getItem('token') ?? null;
    if (!token) {
        if (to.fullPath === '/') {
            return next();
        } else {
            return router.push({name: 'Login'});
        }
    }
    return next();
}