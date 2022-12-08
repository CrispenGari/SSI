import "react-native-gesture-handler";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import * as ImagePicker from "expo-image-picker";
import GraphQLProvider from "./src/providers/GraphQLProvider";
import Routes from "./src/routes";
const App = () => {
  return (
    <GraphQLProvider>
      <Routes />
    </GraphQLProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
