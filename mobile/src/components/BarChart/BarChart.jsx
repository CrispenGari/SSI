import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import { COLORS, FONTS } from "../../constants";
const Bar = ({ predictions }) => {
  const [labels, setLabels] = React.useState([]);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setData(predictions?.map((pred) => pred.probability));
      setLabels(predictions?.map((pred) => pred.className));
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          color: COLORS.main,
          textAlign: "center",
          marginBottom: 10,
          fontFamily: FONTS.NunitoSansRegular,
          fontSize: 20,
          letterSpacing: 2,
        }}
      >
        Prediction Distribution
      </Text>
      <BarChart
        style={{ marginTop: 10, width: "100%", justifyContent: "center" }}
        data={{
          labels,
          datasets: [
            {
              data,
              withDots: true,
              color: (opacity = 1) => COLORS.main,
              withScrollableDot: true,
            },
          ],
        }}
        fromZero
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height * 0.4}
        yAxisLabel="  "
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: COLORS.blue,
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: COLORS.main,
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(57, 91, 100, ${opacity})`,
          strokeWidth: 1,
          barPercentage: 0.7,
          propsForDots: {
            r: "2",
            strokeWidth: "2",
            stroke: "white",
          },
          fillShadowGradient: COLORS.main,
          fillShadowGradientOpacity: 1,
        }}
        verticalLabelRotation={45}
        horizontalLabelRotation={-90}
      />
    </View>
  );
};

export default Bar;
