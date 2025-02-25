import router from "../router/index.js";

export default function auth({ to, next }) {
    const token = localStorage.getItem('token') ?? null;
    const user = localStorage.user ? JSON.parse(localStorage.getItem('user')) : null;

    if (!token) {
        // Kullanıcı giriş yapmamışsa sadece giriş sayfasına gitmesine izin ver
        if (to.name === 'Login' || to.fullPath === '/') {
            return next();
        } else {
            return router.push({ name: 'Login' });
        }
    } else {
        // Kullanıcı giriş yapmışsa ve /login sayfasına gitmeye çalışıyorsa, onu /index'e yönlendir
        if (to.name === 'Login') {
            return router.push({ path: '/index' });
        }
        // Kullanıcı giriş yapmışsa, istediği sayfaya gidebilsin
        return next();
    }
}
