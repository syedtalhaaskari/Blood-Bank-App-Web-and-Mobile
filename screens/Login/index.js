import React, { useEffect, useState } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Toast, Text, View } from 'native-base';
import { ImageBackground, StyleSheet, Image } from 'react-native';
import image from "../../assets/images/background.jpg"
import logo from "../../assets/images/logo.png"
import { connect } from "react-redux"
import { firebase_login, firebase_login_check } from "../../store/action"

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    let data = {
      nav: props.navigation.navigate
    }
    props.firebase_login_check(data)
  }, [])

  const submitForm = () => {
    if (email === "" || password === "") {
      Toast.show({
        text: "Email or password cannot remain empty",
        buttonText: 'Okay'
      })
    }
    else {
      let data = { email, password, nav: props.navigation.navigate }
      props.firebase_login(data)
    }
  }

  return (
    <Container>
      <ImageBackground source={image} style={styles.image}>
        <Content contentContainerStyle={styles.center}>
          <View style={{ backgroundColor: "white", padding: 15, borderRadius: 100, }}>
            <Image source={logo} style={{ height: 150, width: 150, }} />
          </View>
          <Form>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Email</Label>
              <Input onChangeText={(text) => setEmail(text)} />
            </Item>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={{ paddingLeft: 10, paddingTop: 0, marginTop: 0, }}>Password</Label>
              <Input secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
            </Item>
            <Button full danger style={styles.btn} onPress={submitForm}><Text>Login</Text></Button>
            <Button onPress={() => props.navigation.navigate("LoginArea", { screen: "Register" })} full info style={styles.btn}><Text>Register</Text></Button>
          </Form>
        </Content>
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
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
  firebase_login: (data) => dispatch(firebase_login(data)),
  firebase_login_check: (data) => dispatch(firebase_login_check(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);