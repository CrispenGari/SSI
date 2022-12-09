import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS } from "../../constants";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useMediaPermissions } from "../../hooks";
import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";
import { useMutation } from "@apollo/client";
import { PREDICT_SNAKE_SPECIE_MUTATION } from "../../graphql";
import Requesting from "../../components/Requesting/Requesting";
import { generateRNFile } from "../../utils";
const Home = ({ navigation }) => {
  const { camera, library } = useMediaPermissions();
  const [image, setImage] = useState(null);
  const [predict, { loading, data }] = useMutation(
    PREDICT_SNAKE_SPECIE_MUTATION
  );
  const openCamera = async () => {
    if (!camera) {
      Alert.alert(
        "snake species",
        "snake species tool does not have permission to access your camera.",
        [
          {
            style: "default",
            text: "Allow Permission",
            onPress: async () => {
              await Camera.requestCameraPermissionsAsync();
              return;
            },
          },
          {
            style: "destructive",
            text: "CANCEL",
            onPress: () => {},
          },
        ]
      );
      return;
    }
    const { assets, canceled } = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: false,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    if (!canceled) {
      setImage({
        uri: assets[0].uri,
        name: assets[0].fileName,
      });
    }
  };
  const selectImage = async () => {
    if (!library) {
      Alert.alert(
        "snake species",
        "snake species tool does not have permission to access your photos.",
        [
          {
            style: "default",
            text: "Allow Access to all Photos",
            onPress: async () => {
              await ImagePicker.requestMediaLibraryPermissionsAsync();
              return;
            },
          },
          {
            style: "destructive",
            text: "CANCEL",
            onPress: () => {},
          },
        ]
      );
      return;
    }

    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: false,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    if (!canceled) {
      setImage({
        uri: assets[0].uri,
        name: assets[0].fileName,
      });
    }
  };

  const makePredictions = async () => {
    // navigation.navigate("Details", {});

    if (!!!image) {
      Alert.alert("snake species", "please select an image of a snake first.", [
        {
          style: "destructive",
          text: "CANCEL",
          onPress: () => {},
        },
      ]);
      return;
    }
    const _image = generateRNFile(image);
    await predict({
      variables: {
        input: {
          image: _image,
        },
      },
    });
  };

  React.useEffect(() => {
    let mounted = true;
    if (mounted && !!data) {
      navigation.navigate("Details", {
        image,
        data,
      });
    }
    return () => {
      mounted = false;
    };
  }, [data]);
  console.log({ data });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.main,
      }}
    >
      {loading ? <Requesting /> : null}
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            marginBottom: 30,
            flex: 0.8,
          }}
        >
          <Image
            source={{
              uri: !!!image
                ? Image.resolveAssetSource(
                    require("../../../assets/snakes.webp")
                  ).uri
                : image?.uri,
            }}
            style={{
              width: "100%",
              height: "70%",
            }}
          />
          <Text
            style={{
              padding: 10,
              textAlign: "center",
              color: COLORS.gray,
              fontFamily: FONTS.NunitoSansRegular,
            }}
          >
            Choose an image of a snake or take a photo.
          </Text>
          <View
            style={{
              margin: 10,
              padding: 20,
              backgroundColor: COLORS.naive,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.blue,
                padding: 10,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
              activeOpacity={0.7}
              onPress={openCamera}
            >
              <Ionicons name="camera" size={24} color={COLORS.main} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.blue,
                padding: 10,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
              activeOpacity={0.7}
              onPress={selectImage}
            >
              <AntDesign name="picture" size={24} color={COLORS.main} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flex: 0.2,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={makePredictions}
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
              IDENTIFY
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              margin: 20,
              color: COLORS.gray,
              textAlign: "center",
              fontFamily: FONTS.NunitoSansItalic,
            }}
          >
            AI tool developed by @crispengari.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
