import React, { useState, useEffect } from 'react';
import { Container, Text, View, List, ListItem } from 'native-base';
import { ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import image from "../../assets/images/background.jpg"
import { connect } from "react-redux"
import { firebase_logout, profile_look } from "../../store/action"
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import moment from "moment"

const Profile = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState({
        address: "",
        cnic: "",
        contact: "",
        donor: "",
        email: "",
        name: "",
        selected: "",
        uid: "",
        dob: new Date().getTime(),
    })

    // useEffect(() => {
    //     user.dob = new Date(user.dob)
    // }, [user])

    useEffect(() => {
        auth().onAuthStateChanged(function (user) {
            if (user) {
                database().ref("/").orderByChild("email").equalTo(user.email).once("value", function (snapshot) {
                    snapshot.forEach(function (child) {
                        setUser(child.val()) // NOW THE CHILDREN PRINT IN ORDER    
                    });
                })
            }
        })
    }, [])

    return (
        <Container>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{ ...styles.centeredView, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                    <View style={{ width: "80%" }}>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableHighlight>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                            <TouchableOpacity style={{ ...styles.btn, borderColor: "#111", borderWidth: 1, }} onPress={() => alert("Delete Hogaya")}>
                                <Text style={styles.btnText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.btn, borderColor: "#111", borderWidth: 1, }} onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                                <Text style={styles.btnText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <ImageBackground source={image} style={styles.image}>
                <View style={{ paddingHorizontal: 20, marginVertical: 20, }}>
                    <ScrollView>
                        <List style={{ backgroundColor: "white", borderRadius: 5, width: "100%", }}>
                            <ListItem>
                                <Text><Text style={{ fontWeight: "bold" }}>Name: </Text>{user.name}</Text>
                            </ListItem>
                            <ListItem>
                                <Text><Text style={{ fontWeight: "bold" }}>Contact: </Text>{user.contact}</Text>
                            </ListItem>
                            <ListItem style={{ borderBottomWidth: 1, borderColor: "#eee", }}>
                                <View>
                                    <Text style={{ fontWeight: "bold" }}>Address:&nbsp;</Text>
                                    <Text>{user.address}</Text>
                                </View>
                            </ListItem>
                            <ListItem>
                                <Text><Text style={{ fontWeight: "bold" }}>Blood Group: </Text>{user.selected}</Text>
                            </ListItem>
                            <ListItem>
                                <Text><Text style={{ fontWeight: "bold" }}>Email: </Text>{user.email}</Text>
                            </ListItem>
                            <ListItem>
                                {user.donor === "Yes" ? <Text>You are a donor</Text> : <Text>You are not a donor</Text>}
                            </ListItem>
                            <ListItem>
                                <Text><Text style={{ fontWeight: "bold" }}>CNIC: </Text>{user.cnic}</Text>
                            </ListItem>
                            <ListItem>
                                <Text><Text style={{ fontWeight: "bold" }}>Date of Birth: </Text>{moment(new Date(user.dob)).format('DD-MM-YYYY')}</Text>
                            </ListItem>
                            <ListItem>
                                <Text><Text style={{ fontWeight: "bold" }}>Password: </Text>**********</Text>
                            </ListItem>
                        </List>
                        <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => props.navigation.navigate("ProfileEdit", {userData: user})}><Text style={styles.btnText}>Edit</Text></TouchableHighlight>
                        <TouchableHighlight activeOpacity={0.8} style={styles.btn} onPress={() => { props.firebase_logout(props.navigation.navigate) }}><Text style={styles.btnText}>Logout</Text></TouchableHighlight>
                    </ScrollView>
                </View>
            </ImageBackground>
        </Container>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    btn: {
        marginTop: 20,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
        borderRadius: 5,
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        borderTopEndRadius: 0,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        padding: 10,
        alignSelf: "flex-end",
        marginBottom: 0,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
    }
})

const mapStateToProps = (state) => ({
    userEmail: state.userEmail
})


const mapDispatchToProps = (dispatch) => ({
    firebase_logout: (data) => dispatch(firebase_logout(data)),
    profile_look: (data) => dispatch(profile_look(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);