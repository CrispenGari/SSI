import "react-native-gesture-handler";
import { StyleSheet, Text, View, StatusBar, LogBox } from "react-native";
import * as ImagePicker from "expo-image-picker";
import GraphQLProvider from "./src/providers/GraphQLProvider";
import Routes from "./src/routes";
import { useFonts } from "expo-font";
import { Loading } from "./src/components";
import { Fonts } from "./src/constants";

LogBox.ignoreAllLogs();
const App = () => {
  const [loaded] = useFonts(Fonts);

  if (!loaded) {
    return <Loading />;
  }
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
