import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"

const INITIAL_STATE = {
    userEmail: "asdasdas",
    user:
    {
        address: "",
        cnic: "",
        contact: "",
        donor: "",
        email: "",
        name: "",
        selected: "",
        uid: "",
    },
    donors: [{
        address: "",
        cnic: "",
        contact: "",
        donor: "",
        email: "",
        name: "",
        selected: "",
        uid: "",
    }]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case "PROFILELOOK":
        //     return auth().onAuthStateChanged(function (user) {
        //         if (user) {
        //             return {
        //                 ...state,
        //                 userEmail: user.email,
        //             }
        //         }
        //     })

        case "CHECKLOGIN":
            return auth().onAuthStateChanged(function (user) {
                if (user) {
                    action.data.nav("Dashboard", { screen: "Home" })
                }
                else {
                    action.data.nav("LoginArea", { screen: "Login" })
                }
            })

        case "FIREBASEREGISTER":
            return auth().createUserWithEmailAndPassword(action.data.email, action.data.password)
                .then(() => {
                    let uid = database().ref('/').push().key
                    delete action.data.password
                    database().ref(`/${uid}`).update({ ...action.data, uid })
                        .then(() => {
                            // action.data.nav.navigate("Login")
                            alert("You have successfully registered")
                        })
                        .catch(() => {
                            console.log("NHI HUA")
                        })
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('That email address is already in use!');
                    }
                    else if (error.code === 'auth/invalid-email') {
                        alert('That email address is invalid!');
                    }
                    else
                        alert(error.code);
                    return false
                })

        case "FIREBASEEDIT":
            return database().ref(`/${action.data.uid}`).update(action.data)
                .then(() => {
                    auth().signOut()
                })
                .catch(() => {
                    console.log("NHI HUA")
                })

        case "FIREBASELOGIN":
            return auth().signInWithEmailAndPassword(action.data.email, action.data.password)
                .then((user) => {
                    action.data.nav("Dashboard", { screen: "Home" })
                })
                .catch((error) => {
                    alert("Email or Password is incorrect")
                })

        case "FIREBASELOGOUT":
            return auth().signOut().then(() => action.data("LoginArea", { screen: "Login" }))

        case "FIREBASEDONORS":
            var arr = []
            return database().ref("/").orderByChild("selected").equalTo(action.data).on("value", function (snapshot) {
                return state.donors = snapshot.val()
                // snapshot.forEach(function (child) {
                //     arr.push(child.val()) // NOW THE CHILDREN PRINT IN ORDER    
                // });
                // return {
                //     donors: arr
                // }
                // state.donors = arr
            })

        case "FIREBASEDELETEUSER":
            return auth().currentUser.delete().then(function () {
                database().ref(`/${action.data.uid}`).remove().then(() => {
                    action.data.nav("LoginArea", { screen: "Login" })
                })
            }
            ).catch(error => {
                alert(error)
            })

        default:
            return state
    }
}