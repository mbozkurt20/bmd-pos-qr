export default function auth({ to, next, router, ...props }) {

    const token = localStorage.getItem('token') ?? null;
    const user = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null
    const canAuth = to.fullPath === '/employer-login' || (user && to.meta.auth && to.meta.auth.includes(user.type))
    if (!token) {
        if (to.fullPath === '/') {
            return next();
        } else {
            return router.push({ name: 'Login' });
        }
    }else if (!canAuth) {
        return router.push({ name: 'EmployerLogin' });
    } else {
        return next();
    }

}