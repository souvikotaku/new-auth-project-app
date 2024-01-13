import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  // ActivityIndicator,
} from "react-native";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import logoauth from "../assets/logoauth.png";
import topleft1 from "../assets/topleft1.png";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [notificationsChecked, setNotificationsChecked] = useState(false);
  // const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailblankError, setEmailblankError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    if (!termsChecked) {
      // console.log("Please agree to terms and conditions");
      setTermsError(true);
    }

    if (!email.includes("@") && email !== "") {
      // console.log("Please enter a valid email");
      setEmailError(true);
    }

    if (email === "") {
      // console.log("Please enter an email");
      setEmailblankError(true);
    }

    if (password === "") {
      setPassError(true);
    }

    if (name === "") {
      setNameError(true);
    }

    if (
      email.includes("@") &&
      email !== "" &&
      name !== "" &&
      password !== "" &&
      termsChecked
    ) {
      setEmailError(false);
      setEmailblankError(false);
      setPassError(false);

      // setLoading(true); // Start loader

      axios
        .post(`http://restapi.adequateshop.com/api/authaccount/registration`, {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => {
          if (res?.data?.message === "success") {
            Alert.alert(
              "Success",
              "Signup successful!",
              [
                {
                  text: "Login",
                  onPress: () => {
                    // console.log("Login Pressed");
                    navigation.navigate("Login");
                  },
                },
                {
                  text: "No, Thanks",
                  onPress: () => {
                    // console.log("No, Thanks Pressed");
                    setName("");
                    setEmail("");
                    setPassword("");
                  },
                },
              ],
              { cancelable: false }
            );
          } else {
            console.log(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // .finally(() => {
      //   setLoading(false); // Stop loader
      // });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={topleft1}
        style={{
          width: 165,
          height: 165,
          position: "absolute",
          left: 0,
        }}
      />
      <View
        style={{
          marginTop: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={logoauth}
          style={{ width: 75, height: 75, marginTop: "10%" }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            lineHeight: 30,
            color: "#047CFF",
            marginTop: 10,
          }}
        >
          Create an account
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 17.5,
            color: "#B3B3B3",
            marginTop: 10,
          }}
        >
          You don’t have an account, let’s create one
        </Text>
      </View>
      <View style={styles.inputboxstyle1}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError(false);
          }}
        />
        <Octicons
          name="person"
          color={"black"}
          size={20}
          style={{ position: "absolute", left: 20, top: 20 }}
        />
      </View>
      {nameError && <Text style={styles.errorText}>Username is required</Text>}
      <View style={styles.inputboxstyle}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(false);
            setEmailblankError(false);
          }}
          keyboardType="email-address"
        />
        <FontAwesome
          name="envelope-o"
          color={"black"}
          size={20}
          style={{ position: "absolute", left: 20, top: 19 }}
        />
      </View>
      {emailError && (
        <Text style={styles.errorText}>Please enter a valid email</Text>
      )}
      {emailblankError && (
        <Text style={styles.errorText}>Email is required</Text>
      )}
      <View style={styles.inputboxstyle}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPassError(false);
          }}
          secureTextEntry={!showPassword}
        />
        <MaterialIcons
          name="lock-outline"
          color={"black"}
          size={25}
          style={{ position: "absolute", left: 17, top: 16 }}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIconContainer}
        >
          <FontAwesome
            name={showPassword ? "eye" : "eye-slash"}
            color={"black"}
            size={25}
          />
        </TouchableOpacity>
      </View>
      {passError && <Text style={styles.errorText}>Password is required</Text>}
      <View style={{ width: "100%", paddingTop: 30 }}>
        <View style={{ width: "80%" }}>
          <CheckBox
            title="Agree to Terms and Conditions"
            checked={termsChecked}
            onPress={() => {
              // console.log(termsChecked ? "unchecked" : "checked");
              if (!termsChecked) {
                setTermsError(false);
              }
              setTermsChecked(!termsChecked);
            }}
            containerStyle={styles.checkboxStyle}
          />
          {termsError && (
            <Text style={styles.errorText}>
              Please agree to terms and conditions
            </Text>
          )}
          <CheckBox
            title="Allow Notifications"
            checked={notificationsChecked}
            onPress={() => setNotificationsChecked(!notificationsChecked)}
            containerStyle={styles.checkboxStyle}
          />
        </View>
      </View>

      <View style={styles.loginLink}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 17.5,
            color: "#B3B3B3",
            marginTop: 10,
          }}
        >
          Already have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Login{" "}
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.sendVerificationnew}
        onPress={handleSignup}
      >
        {/* {loading ? (
          <ActivityIndicator color="white" />
        ) : ( */}
        <Text style={styles.buttonText2}>Proceed</Text>
        {/* )} */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
    padding: 20,
  },
  inputboxstyle1: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    height: 60,
    borderRadius: 15,
    padding: 20,
    paddingLeft: 50,
    marginTop: "10%",
  },
  inputboxstyle: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    height: 60,
    borderRadius: 15,
    padding: 20,
    paddingLeft: 50,
    marginTop: 20,
  },
  errorText: {
    width: "100%",
    paddingLeft: 10,
    color: "red",
  },
  loginLink: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  linkText: {
    color: "#047CFF",
    fontWeight: "bold",
  },
  sendVerificationnew: {
    width: "100%",
    height: 60,
    padding: 12,
    backgroundColor: "#047CFF",
    borderRadius: 70,
    marginLeft: 30,
    marginRight: 30,
  },
  buttonText2: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  checkboxStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 20,
    top: 16,
  },
});
