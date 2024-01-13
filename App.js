import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./views/Login";
import { useState } from "react";
import Signup from "./views/Signup";
import Dashboard from "./views/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [highlight1, setHighlight1] = useState(false);
  const [highlight2, setHighlight2] = useState(false);
  const [highlight3, setHighlight3] = useState(true);
  const [highlight4, setHighlight4] = useState(false);
  const [highlight5, setHighlight5] = useState(false);

  const TabNav = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: 80, paddingTop: 10 },
        }}
        initialRouteName="Home" // Set the initialRouteName to "Home" for the third icon
      >
        <Tab.Screen
          name="Home2"
          component={Dashboard}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              // Prevent default action and add your custom logic
              e.preventDefault();
              // console.log("Home2 tab pressed");
              setHighlight1(true);
              setHighlight2(false);
              setHighlight3(false);
              setHighlight4(false);
              setHighlight5(false);

              // You can navigate or perform other actions here
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  backgroundColor: highlight1 && "#047CFF",
                  // padding: 10,
                  height: 60,
                  width: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 70,
                }}
              >
                <Feather
                  name="pie-chart"
                  color={highlight1 ? "white" : "#B3B3B3"}
                  size={size}
                />
              </View>
            ),
            tabBarLabel: "", // Hides the label
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Dashboard}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              e.preventDefault();
              // console.log("Categories tab pressed");
              setHighlight1(false);
              setHighlight2(true);
              setHighlight3(false);
              setHighlight4(false);
              setHighlight5(false);
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  backgroundColor: highlight2 && "#047CFF",
                  // padding: 10,
                  height: 60,
                  width: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 70,
                }}
              >
                <Feather
                  name="hard-drive"
                  color={highlight2 ? "white" : "#B3B3B3"}
                  size={size}
                />
              </View>
            ),
            tabBarLabel: "", // Hides the label
          }}
        />
        <Tab.Screen
          name="Home"
          component={Dashboard}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              e.preventDefault();
              // console.log("Categories tab pressed");
              setHighlight1(false);
              setHighlight2(false);
              setHighlight3(true);
              setHighlight4(false);
              setHighlight5(false);
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  backgroundColor: highlight3 && "#047CFF",
                  // padding: 10,
                  height: 60,
                  width: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 70,
                }}
              >
                <Ionicons
                  name="person-circle-outline"
                  color={highlight3 ? "white" : "#B3B3B3"}
                  size={30}
                />
              </View>
            ),
            tabBarLabel: "", // Hides the label
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Dashboard}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              e.preventDefault();
              // console.log("Categories tab pressed");
              setHighlight1(false);
              setHighlight2(false);
              setHighlight3(false);
              setHighlight4(true);
              setHighlight5(false);
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  backgroundColor: highlight4 && "#047CFF",
                  // padding: 10,
                  height: 60,
                  width: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 70,
                }}
              >
                <SimpleLineIcons
                  name="bubbles"
                  color={highlight4 ? "white" : "#B3B3B3"}
                  size={size}
                />
              </View>
            ),
            tabBarLabel: "", // Hides the label
          }}
        />
        <Tab.Screen
          name="More"
          component={Dashboard}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              e.preventDefault();
              // console.log("Categories tab pressed");
              setHighlight1(false);
              setHighlight2(false);
              setHighlight3(false);
              setHighlight4(false);
              setHighlight5(true);
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View
                style={{
                  backgroundColor: highlight5 && "#047CFF",
                  // padding: 10,
                  height: 60,
                  width: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 70,
                }}
              >
                <AntDesign
                  name="checkcircleo"
                  color={highlight5 ? "white" : "#B3B3B3"}
                  size={size}
                />
              </View>
            ),
            tabBarLabel: "", // Hides the label
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Signup"
          component={Signup}
          // options={{ title: "Silent Hill" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          // options={{ headerShown: true, headerLeft: () => <Text></Text> }}
        />
        <Stack.Screen
          name="Dashboard"
          component={TabNav}
          // options={{ headerShown: true, headerLeft: () => <Text></Text> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
