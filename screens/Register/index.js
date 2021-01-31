import React, { useState } from 'react';
import { Content, Form, Item, Input, Label, Toast, Text, View, Picker, Button } from 'native-base';
import { ImageBackground, StyleSheet, ScrollView, Platform } from 'react-native';
import image from "../../assets/images/background.jpg"
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from "react-redux"
import { firebase_register } from "../../store/action"

const Register = (props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [contact, setContact] = useState("")
  const [cnic, setCNIC] = useState("")
  const [selected, setSelected] = useState("O+")
  const [address, setAddress] = useState("")
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [donor, setDonor] = useState('No')

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = (props) => {
    showMode('date');
  };

  const submitForm = async () => {
    if (name === "" || email === "" || password === "" || confPassword === "" || contact === "" || cnic === "" || address === "") {
      Toast.show({
        text: "Fill All Fields",
        buttonText: 'Okay'
      })
    }
    else if (confPassword !== password) {
      Toast.show({
        text: "Password don't match",
        buttonText: 'Okay'
      })
    }
    else {
      const data = { name, address, email, contact, password, selected, donor, cnic, dob: date.getTime(), nav: props.navigation }

      // setName("")
      // setEmail("")
      // setPassword("")
      // setConfPassword("")
      // setContact("")
      // setCNIC("")
      // setSelected("O+")
      // setAddress("")
      // setDate(new Date())
      // setDonor("No")

      props.firebase_register(data)
    }
  }

  return (
    <ScrollView>
      <ImageBackground source={image} style={styles.image}>
        <Content contentContainerStyle={styles.center}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: "white", textDecorationLine: 'underline', }}>Registration Form</Text>
          </View>
          <Form>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Full Name</Label>
              <Input onChangeText={(text) => setName(text)} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Address</Label>
              <Input onChangeText={(text) => setAddress(text)} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Email</Label>
              <Input keyboardType="email-address" onChangeText={(text) => setEmail(text)} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Contact</Label>
              <Input keyboardType="numeric" onChangeText={(text) => setContact(text)} placeholder="Like 03001234567" />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Password</Label>
              <Input secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Confirm Password</Label>
              <Input secureTextEntry={true} onChangeText={(text) => setConfPassword(text)} />
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
              <Input keyboardType="numeric" onChangeText={(text) => setCNIC(text)} placeholder="Like 4210112345678" />
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

            <Button full danger style={styles.btn} onPress={() => submitForm()}><Text>Register</Text></Button>
            <Button onPress={() => props.navigation.navigate("Login")} full info style={styles.btn}><Text>Go To Login</Text></Button>
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
  users: state.users
})

const mapDispatchToProps = (dispatch) => ({
  firebase_register: (data) => dispatch(firebase_register(data)),
  // firebase_save_user_data: (data) => dispatch(firebase_save_user_data(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);