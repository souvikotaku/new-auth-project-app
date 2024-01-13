import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import logoauth from "../assets/logoauth.png";
import topleft1 from "../assets/topleft1.png";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { loginObject } from "../redux/dataSlice";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [notificationsChecked, setNotificationsChecked] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailblankError, setEmailblankError] = useState(false);
  const [passError, setPassError] = useState(false);
  //   const [nameError, setNameError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.includes("@") && email !== "") {
      //   console.log("Please enter a valid email");
      setEmailError(true);
    }

    if (email === "") {
      //   console.log("Please enter an email");
      setEmailblankError(true);
    }

    if (password === "") {
      setPassError(true);
    }
    if (email.includes("@") && email != "" && password != "") {
      //   console.log("Email:", email);
      //   console.log("Password:", password);
      setLoading(true);

      axios
        .post(`http://restapi.adequateshop.com/api/authaccount/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res?.data?.message == "success") {
            console.log(res?.data);
            dispatch(loginObject(res?.data?.data));
            setTimeout(() => {
              setLoading(false);
              navigation.navigate("Dashboard");
              Alert.alert("Login Successful", "Welcome back!");
            }, 1000);
          } else {
            setLoading(false);
            // console.log(res?.data?.message);
            Alert.alert(
              "Login Failed",
              "Wrong username or password. Please try again."
            );
          }
        })
        .catch((err) => {
          setLoading(false);
          //   console.log(err);
        });
    }
  };
  useEffect(() => {
    // Clean up loading state when component unmounts
    return () => setLoading(false);
  }, []);
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#047CFF" />
        </View>
      )}
      <Image
        source={topleft1}
        style={{
          width: 165,
          height: 165,
          // marginTop: "10%",
          position: "absolute",
          left: 0,
          // backgroundColor: "yellow",
          // marginBottom: "30%",
        }}
      />
      <View
        style={{
          // backgroundColor: "yellow",
          // height: 75,
          marginTop: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={logoauth}
          style={{
            width: 75,
            height: 75,
            marginTop: "10%",
            // marginBottom: "30%",
          }}
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
          Sign in
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
          Let’s login to your account
        </Text>
      </View>
      {/* <View style={styles.inputboxstyle1}>
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
      {nameError && <Text style={styles.errorText}>Username is required</Text>} */}
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

      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <CheckBox
            title="Remember me"
            checked={notificationsChecked}
            onPress={() => setNotificationsChecked(!notificationsChecked)}
            containerStyle={styles.checkboxStyle}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          {/* Your Facebook icon */}
          <FontAwesome name="facebook" color="#3b5998" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          {/* Your Apple icon */}
          <FontAwesome name="apple" color="#000000" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          {/* Your Google icon */}
          <FontAwesome name="google" color="#DB4437" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.orContainer}>
        <View style={styles.orLine}></View>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.orLine}></View>
      </View>
      <View style={styles.loginLink}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 17.5,
            color: "#B3B3B3",
            // marginTop: 10,
          }}
        >
          Don’t have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            Sign Up{" "}
          </Text>
        </Text>
      </View>
      {/* <Button title="Signup" onPress={handleSignup} /> */}

      <TouchableOpacity
        style={styles.sendVerificationnew}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText2}>Proceed</Text>
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
    // borderColor: "lightgrey",
    // borderWidth: 1,
    padding: 20,
    paddingLeft: 50,
    marginTop: "10%",
  },
  inputboxstyle: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    height: 60,
    borderRadius: 15,
    // borderColor: "lightgrey",
    // borderWidth: 1,
    padding: 20,
    paddingLeft: 50,
    marginTop: 20,
  },
  errorText: {
    width: "100%",
    paddingLeft: 10,
    color: "red",
  },
  errorText2: {
    width: "100%",
    paddingLeft: 10,
    color: "#047CFF",
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
    // marginTop: "40%",

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
    backgroundColor: "transparent", // Set background color to transparent
    borderWidth: 0, // Remove border
    padding: 0, // Remove padding
  },
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999, // Make sure it's above other components
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#047CFF",
    fontWeight: "bold",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 10,
  },
  socialButton: {
    backgroundColor: "white",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10, // Adjust the margin between icons
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#EDEDED",
    marginHorizontal: 10,
  },
  orText: {
    color: "#047CFF",
    // fontSize: 14,
    fontWeight: "bold",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 20,
    top: 16,
  },
});
