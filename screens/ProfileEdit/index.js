import React, { useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Toast, Text, Icon, View, Textarea, Picker, DatePicker, Button, Separator } from 'native-base';
import { ImageBackground, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import image from "../../assets/images/background.jpg"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect } from 'react';
import { connect } from "react-redux"
import { firebase_edit } from "../../store/action"
import moment from "moment"

const ProfileEdit = (props) => {
  const { userData } = props.route.params

  const [name, setName] = useState(userData.name)
  const [contact, setContact] = useState(userData.contact)
  const [cnic, setCNIC] = useState(userData.cnic)
  const [selected, setSelected] = useState(userData.selected)
  const [address, setAddress] = useState(userData.address)
  const [date, setDate] = useState(new Date(userData.dob));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [donor, setDonor] = useState(userData.donor)

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const submitForm = () => {
    if (name === "" || contact === "" || cnic === "" || address === "") {
      Toast.show({
        text: "Fill All Fields",
        buttonText: 'Okay'
      })
    }
    else {
      let data = {
        name, contact, cnic, selected, address, dob: date.getTime(), donor, uid: userData.uid, email: userData.email,
      }

      props.firebase_edit(data)
      props.navigation.navigate("Dashboard", { screen: "Home" })
    }
  }

  return (
    <ScrollView>
      <ImageBackground source={image} style={styles.image}>
        <Content contentContainerStyle={styles.center}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: "white", textDecorationLine: 'underline', }}>Edit Profile Form</Text>
          </View>
          <View style={{ width: "80%", justifyContent: "center", alignItems: "center", paddingVertical: 10, backgroundColor: "white", borderRadius: 5, marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}>You have to re-login after update</Text>
          </View>
          <Form>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Full Name</Label>
              <Input onChangeText={(text) => setName(text)} value={name} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Address</Label>
              <Input onChangeText={(text) => setAddress(text)} value={address} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Contact</Label>
              <Input keyboardType="numeric" onChangeText={(text) => setContact(text)} placeholder="Like 03001234567" value={contact} />
            </Item>
            <View style={{ marginTop: 15, }}></View>
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
            <View style={{ marginTop: 15, }}></View>
            <Item style={styles.inputItem}>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120, color: "#555" }}
                selectedValue={donor}
                onValueChange={(e) => setDonor(e)}
              >
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>CNIC</Label>
              <Input keyboardType="numeric" onChangeText={(text) => setCNIC(text)} placeholder="Like 4210112345678" value={cnic} />
            </Item>
            {show && <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />}
            <Button full onPress={showDatepicker} style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 5, marginTop: 15,
            }}>
              <Text style={{ color: "#555" }}>Choose Date of Birth</Text>
            </Button>

            <Item style={{ ...styles.inputItem, marginTop: 15, paddingHorizontal: 10, paddingVertical: 20 }}>
              <Text style={{ width: "100%", paddingVertical: 10, color: "#555" }}>
                Date: {date.toString().substr(4, 12)}
              </Text>
            </Item>

            <Button full danger style={styles.btn} onPress={submitForm}><Text>Update</Text></Button>
            <Button onPress={() => props.navigation.navigate("Dashboard", { screen: "Home" })} full info style={styles.btn}><Text>Back To Home</Text></Button>
          </Form>
        </Content>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    paddingVertical: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
})

const mapStateToProps = (state) => ({
  userEmail: state.userEmail
})


const mapDispatchToProps = (dispatch) => ({
  firebase_edit: (data) => dispatch(firebase_edit(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);