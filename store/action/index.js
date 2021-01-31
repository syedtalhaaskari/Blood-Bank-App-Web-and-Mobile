const firebase_login_check = (data) => {
    return (dispatch) => {
        dispatch({type: "CHECKLOGIN", data: data})
    }
}

const firebase_register = (data) => {
    return (dispatch) => {
        dispatch({type: "FIREBASEREGISTER", data: data})
    }
}

const firebase_edit = (data) => {
    return (dispatch) => {
        dispatch({type: "FIREBASEEDIT", data: data})
    }
}

const firebase_login = (data) => {
    return (dispatch) => {
        dispatch({type: "FIREBASELOGIN", data: data})
    }
}

const firebase_logout = (data) => {
    return (dispatch) => {
        dispatch({type: "FIREBASELOGOUT", data: data})
    }
}

const firebase_donors = (data) => {
    return (dispatch) => {
        dispatch({type: "FIREBASEDONORS", data: data})
    }
}

const profile_look = (data) => {
    return (dispatch) => {
        dispatch({type: "PROFILELOOK", data: data})
    }
}

export {
    firebase_login_check,
    firebase_register,
    firebase_login,
    firebase_logout,
    firebase_donors,
    profile_look,
    firebase_edit,
}