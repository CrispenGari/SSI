### Snake Specie Identification (SSI)

🐍Snake Specie Identification (SSI) is a deep learning API for classifying different 5 species of snakes from images. 🐍

<p align="center">
<img src="/cover.jpg" width="100%" alt="cover"/>
</p>

### GraphQL

```shell
curl http://localhost:3001/graphql  -F operations='{ "query": "mutation PredictSnakeSpecie($input: PredictionInputType!) { predictSnake(input: $input) { error { field message } ok prediction {predictions {  label probability className specie { id specieName commonName } } } } }", "variables": { "input": {"image": null} } }'  -F map='{ "0": ["variables.input.image"] }'  -F 0=@class-1.jpg
```

### Expected Response from `GraphQL`

```json
{
  "data": {
    "predictSnake": {
      "error": null,
      "ok": true,
      "prediction": {
        "predictions": [
          {
            "label": 0,
            "probability": 0.11999999731779099,
            "className": "class-1",
            "specie": {
              "id": 0,
              "specieName": "Nerodia sipedon",
              "commonName": "Northern Watersnake"
            }
          },
          {
            "label": 1,
            "probability": 0.1899999976158142,
            "className": "class-2",
            "specie": {
              "id": 1,
              "specieName": "Thamnophis sirtalis",
              "commonName": "Common Garter snake"
            }
          },
          {
            "label": 2,
            "probability": 0.46000000834465027,
            "className": "class-3",
            "specie": {
              "id": 2,
              "specieName": "Storeria dekayi",
              "commonName": "DeKay's Brown snake"
            }
          },
          {
            "label": 3,
            "probability": 0.07999999821186066,
            "className": "class-4",
            "specie": {
              "id": 3,
              "specieName": "Patherophis obsoletus",
              "commonName": "Black Rat snake"
            }
          },
          {
            "label": 4,
            "probability": 0.15000000596046448,
            "className": "class-5",
            "specie": {
              "id": 4,
              "specieName": "Crotalus atrox",
              "commonName": "Western Diamondback rattlesnake"
            }
          }
        ]
      }
    }
  }
}
```

### REST

```shell
curl -X POST -F image=@class-1.jpg http://127.0.0.1:3001/api/rest/identify
```

### Expected Response from `REST`

```json
{
  "predictions": {
    "predictions": [
      {
        "class_name": "class-1",
        "label": 0,
        "probability": 0.12999999523162842,
        "specie": {
          "class_": "class-1",
          "common_name": "Northern Watersnake",
          "id": 0,
          "specie_name": "Nerodia sipedon"
        }
      },
      {
        "class_name": "class-2",
        "label": 1,
        "probability": 0.17000000178813934,
        "specie": {
          "class_": "class-2",
          "common_name": "Common Garter snake",
          "id": 1,
          "specie_name": "Thamnophis sirtalis"
        }
      },
      {
        "class_name": "class-3",
        "label": 2,
        "probability": 0.4399999976158142,
        "specie": {
          "class_": "class-3",
          "common_name": "DeKay's Brown snake",
          "id": 2,
          "specie_name": "Storeria dekayi"
        }
      },
      {
        "class_name": "class-4",
        "label": 3,
        "probability": 0.05000000074505806,
        "specie": {
          "class_": "class-4",
          "common_name": "Black Rat snake",
          "id": 3,
          "specie_name": "Patherophis obsoletus"
        }
      },
      {
        "class_name": "class-5",
        "label": 4,
        "probability": 0.20999999344348907,
        "specie": {
          "class_": "class-5",
          "common_name": "Western Diamondback rattlesnake",
          "id": 4,
          "specie_name": "Crotalus atrox"
        }
      }
    ],
    "top_prediction": {
      "class_name": "class-3",
      "label": 2,
      "probability": 0.4399999976158142,
      "specie": {
        "class_": "class-3",
        "common_name": "DeKay's Brown snake",
        "id": 2,
        "specie_name": "Storeria dekayi"
      }
    }
  },
  "success": true
}
```
