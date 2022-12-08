import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { useMediaPermissions } from "../../hooks";
import * as ImagePicker from "expo-image-picker";

import { gql, useMutation } from "@apollo/client";
import { generateRNFile } from "../../utils";

const Landing = () => {
  const {} = useMediaPermissions();
  const [image, setImage] = useState(null);

  const [predict, { loading, data }] = useMutation(gql`
    mutation PredictSnakeSpecie($input: PredictionInputType!) {
      predictSnake(input: $input) {
        error {
          field
          message
        }
        ok
        prediction {
          predictions {
            label
            probability
            className
            specie {
              id
              specieName
              commonName
            }
          }
        }
      }
    }
  `);

  const selectImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      base64: false,
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!canceled) {
      setImage({
        uri: assets[0].uri,
        name: assets[0].fileName,
      });
    }
  };

  console.log(JSON.stringify({ loading, data }, null, 2));
  return (
    <View>
      <Text>Landing</Text>
      <Button title="Get Image" onPress={selectImage} />
      <Button
        title="Upload"
        onPress={async () => {
          if (!!!image) {
            return;
          }
          const file = generateRNFile(image);
          if (file) {
            await predict({
              variables: {
                input: {
                  image: file,
                },
              },
            });
          }
        }}
      />
    </View>
  );
};

export default Landing;
