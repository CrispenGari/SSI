import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../../constants";
import { Entypo } from "@expo/vector-icons";
import { BarChart, Table } from "../../components";

const Details = ({
  navigation,
  route: {
    params: { data, image },
  },
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleStyle: {
        fontFamily: FONTS.NunitoSansRegular,
        fontSize: 20,
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={30} color={COLORS.naive} />
          <Text
            style={{
              fontFamily: FONTS.NunitoSansRegular,
              fontSize: 20,
              marginLeft: 0,
              color: COLORS.naive,
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
      ),
      headerTitle:
        data?.predictSnake?.prediction?.topPrediction?.specie?.specieName,
    });
  }, []);
  const [species, setSpecies] = useState([]);
  const topPredictionsHeader = ["Class Name", "Label", "Probability"];
  // const topPredictions = [["class-3", 2, (0.4399999976158142).toFixed(2)]];
  const speciesHeader = ["ClassName", "CommonName", "Specie Name", "ID"];
  const [topPredictions, setTopPredictions] = useState([]);

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      setTopPredictions([
        [
          data?.predictSnake?.prediction?.topPrediction?.className,
          data?.predictSnake?.prediction?.topPrediction?.label,
          data?.predictSnake?.prediction?.topPrediction?.probability?.toFixed(
            2
          ),
        ],
      ]);

      setSpecies([
        [
          data?.predictSnake?.prediction?.topPrediction?.specie?.class_,
          data?.predictSnake?.prediction?.topPrediction?.specie?.commonName,
          data?.predictSnake?.prediction?.topPrediction?.specie?.specieName,
          data?.predictSnake?.prediction?.topPrediction?.specie?.id,
        ],
      ]);
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Table
          title={"Top Prediction"}
          tableData={topPredictions}
          tableHead={topPredictionsHeader}
        />
        <Table
          title={"Predicted Spicie"}
          tableData={species}
          tableHead={speciesHeader}
        />
        <Image
          source={{
            uri: image.uri,
          }}
          style={{
            width: "100%",
            height: Dimensions.get("screen").height * 0.4,
          }}
        />
        <BarChart predictions={data?.predictSnake?.prediction?.predictions} />
        <View
          style={{
            justifyContent: "space-between",
            flex: 0.2,
            width: "100%",
            alignItems: "center",
          }}
        ></View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginVertical: 30,
            backgroundColor: COLORS.blue,
            width: "90%",
            paddingHorizontal: 20,
            paddingVertical: 15,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 999,
          }}
          activeOpacity={0.7}
        >
          <Text
            style={{
              color: COLORS.main,
              fontFamily: FONTS.NunitoSansRegular,
              letterSpacing: 2,
              fontSize: 20,
            }}
          >
            NEW IMAGE
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            margin: 20,
            color: COLORS.main,
            textAlign: "center",
            fontFamily: FONTS.NunitoSansItalic,
          }}
        >
          AI tool developed by @crispengari.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
