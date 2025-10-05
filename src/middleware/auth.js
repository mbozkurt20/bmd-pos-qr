import router from "../router/index.js";

export default function auth({ to, next }) {
    const token = localStorage.getItem('token') ?? null;
    const table = localStorage.getItem('table') ?? null;

    if (!token) {
        // Kullanıcı giriş yapmamışsa sadece giriş sayfasına gitmesine izin ver
        if (to.name === 'Login' || to.fullPath === '/') {
            return next();
        } else {
            return router.push({ name: `/tables/${table}` });
        }
    } else {
        // Kullanıcı giriş yapmışsa ve /login sayfasına gitmeye çalışıyorsa, onu /index'e yönlendir
        if (to.name === 'Login' || to.fullPath === '/') {
            return router.push({ path: `/tables/${table}` });
        }
        // Kullanıcı giriş yapmışsa, istediği sayfaya gidebilsin
        return next();
    }
}
