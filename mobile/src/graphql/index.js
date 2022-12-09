import { gql } from "@apollo/client";

export const PREDICT_SNAKE_SPECIE_MUTATION = gql`
  mutation PredictSnakeSpecie($input: PredictionInputType!) {
    predictSnake(input: $input) {
      error {
        field
        message
      }
      ok
      prediction {
        topPrediction {
          label
          probability
          className
          specie {
            id
            specieName
            commonName
            class_
          }
        }
        predictions {
          label
          probability
          className
          specie {
            id
            specieName
            commonName
            class_
          }
        }
      }
    }
  }
`;
