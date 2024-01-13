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
import { useDispatch, useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import logoauth from "../assets/logoauth.png";
import placepic from "../assets/placepic.png";
import topleft1 from "../assets/topleft1.png";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { loginObject } from "../redux/dataSlice";

export default function Dashboard({ navigation }) {
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

  const logindetailsObject = useSelector((state) => state.data.loginobject);
  //   console.log(logindetailsObject);

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
          source={placepic}
          style={{
            width: 110,
            height: 110,
            marginTop: "10%",
            // marginBottom: "30%",
          }}
        />

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            lineHeight: 30,
            color: "#333333",
            marginTop: 10,
          }}
        >
          {logindetailsObject?.Name}
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
          {logindetailsObject?.Email}
        </Text>
      </View>

      <TouchableOpacity style={styles.inputboxstyle}>
        <Ionicons
          name="person-outline"
          color={"#047CFF"}
          size={25}
          style={{ position: "absolute", left: 20, top: 15 }}
        />
        <Text
          style={{
            fontSize: 16,
            marginTop: -5,
          }}
        >
          Account Information
        </Text>
        <MaterialIcons
          style={styles.eyeIconContainer}
          name={"arrow-forward-ios"}
          color={"#047CFF"}
          size={25}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.inputboxstyle}>
        <MaterialCommunityIcons
          name="shield-account-outline"
          color={"#047CFF"}
          size={25}
          style={{ position: "absolute", left: 20, top: 15 }}
        />
        <Text
          style={{
            fontSize: 16,
            marginTop: -5,
          }}
        >
          Google Business Profile
        </Text>
        <MaterialIcons
          style={styles.eyeIconContainer}
          name={"arrow-forward-ios"}
          color={"#047CFF"}
          size={25}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.inputboxstyle}>
        <Ionicons
          name="people-outline"
          color={"#047CFF"}
          size={30}
          style={{ position: "absolute", left: 20, top: 12 }}
        />
        <Text
          style={{
            fontSize: 16,
            marginTop: -5,
          }}
        >
          Team members
        </Text>
        <MaterialIcons
          style={styles.eyeIconContainer}
          name={"arrow-forward-ios"}
          color={"#047CFF"}
          size={25}
        />
      </TouchableOpacity>

      {/* <Button title="Signup" onPress={handleSignup} /> */}

      <TouchableOpacity
        style={styles.sendVerificationnew}
        onPress={() => {
          dispatch(loginObject({}));
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText2}>Logout</Text>
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
    // backgroundColor: "#F8F8F8",
    width: "100%",
    height: 60,
    borderRadius: 15,
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 20,
    paddingLeft: 65,
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
    marginTop: 20,

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
