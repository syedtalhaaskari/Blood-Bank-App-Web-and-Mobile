import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Form, Item, Text, View, Picker, List, ListItem, Icon } from 'native-base';
import { ImageBackground, StyleSheet, ScrollView, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import image from "../../assets/images/background.jpg"
import { connect } from "react-redux"
import { firebase_donors } from "../../store/action"
import database from "@react-native-firebase/database"
import moment from "moment"

const Details = (e) => {
    return (
        <View>
            <Text>Name: {e.name}</Text>
            <Text>Age: {e.age}</Text>
        </View>
    )
}

const Home = (props) => {
    const [selected, setSelected] = useState("O+")
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState({
        name: "",
        age: "",
    })
    const [donors, setDonors] = useState([{}])

    useEffect(() => {
        let arr = []
        database().ref("/").orderByChild("selected").equalTo(selected).once("value", function (snapshot) {
            snapshot.forEach(function (child) {
                arr.push(child.val()) // NOW THE CHILDREN PRINT IN ORDER    
            });
            setDonors(() => arr)
        })
    }, [selected])

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
                            <Text style={styles.modalText}><Icon name="male-female" style={{ color: "blue" }} />: {item.name}</Text>
                            <Text style={styles.modalText}><Icon name="add-circle-sharp" style={{ color: "orange", }} />: {moment(new Date(item.dob)).format('DD-MM-YYYY')}</Text>
                            <Text style={styles.modalText}><Icon name="water" style={{ color: "maroon", }} />: {item.selected}</Text>
                            <Text style={styles.modalText}><Icon name="home" style={{ color: "brown", }} />: {item.address}</Text>
                            <TouchableOpacity onPress={() => alert("HEllo")}>
                                <Text style={styles.modalText}><Icon name="call" style={{ color: "green", }} />: {item.contact}<Text style={{ fontSize: 10 }}>(Click To Call)</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <ImageBackground source={image} style={styles.image}>
                <View flex={1} style={styles.bottom}>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: "white", }}>Select Blood Group</Text>
                    </View>
                    <Form>
                        <Item style={styles.inputItem}>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 120, color: "#555" }}
                                selectedValue={selected}
                                onValueChange={(e) => setSelected(e)}
                            >
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                            </Picker>
                        </Item>
                    </Form>
                </View>
                <View flex={2} style={{ paddingHorizontal: 20, marginVertical: 20, }}>
                    <ScrollView>
                        <List style={{ backgroundColor: "white" }}>
                            {
                                donors.map((item, ind) => {
                                    return (
                                        <ListItem key={ind} button onPress={() => { setModalVisible(true), setItem(item) }}>
                                            <Text>{item.name}</Text>
                                            {/* <Text>Age: {item.age}</Text> */}
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </ScrollView>
                </View>
            </ImageBackground>
        </Container >
    )
}

const mapStateToProps = (state) => ({
    donors: state.donors
})

const mapDispatchToProps = (dispatch) => ({
    firebase_donors: (data) => dispatch(firebase_donors(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    center: {
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    bottom: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    btn: {
        marginTop: 20,
    },
    inputItem: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        width: "80%",
        paddingTop: 0,
        paddingBottom: 5,
        marginLeft: 0,
        paddingLeft: 10,
        borderRadius: 5,
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
        alignItems: "flex-start",
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

// style={{ justifyContent: 'space-between' }}