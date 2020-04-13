
export default {
    isAuthenticated: () => {
        return localStorage.getItem('isAuthenticated') == 1;
    },
    login(cb) {
        localStorage.setItem('isAuthenticated', 1);
    },
    logout(cb) {
        localStorage.setItem('isAuthenticated', 0);
    }
}