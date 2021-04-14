
export const loadState = () => {
    try {
        const serializedData = localStorage.getItem('session')
        if (serializedData === null) {
            return undefined
        }
        let auth = JSON.parse(serializedData)
        return { authReducer: auth }
    } catch (error) {
        return undefined
    }
}

export const saveState = (state) => {
    try {
        let serializedData = JSON.stringify(state.authReducer)
        localStorage.setItem('session', serializedData)
    } catch (error) {
        console.log(error)
    }
}
