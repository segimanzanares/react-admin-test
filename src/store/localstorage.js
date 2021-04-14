import axios from 'axios';

export const loadState = () => {
    try {
        const serializedData = localStorage.getItem('session')
        if (serializedData === null) {
            return undefined
        }
        let auth = JSON.parse(atob(serializedData))
        axios.defaults.headers.common['Authorization'] = auth.auth.token_type + ' ' + auth.auth.access_token;
        return { auth }
    } catch (error) {
        return undefined
    }
}

export const saveState = (state) => {
    try {
        let serializedData = JSON.stringify(state.auth)
        localStorage.setItem('session', btoa(serializedData))
    } catch (error) {
        console.log(error)
    }
}
