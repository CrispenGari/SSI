export interface Specie {
  class_: string;
  common_name: string;
  id: number;
  specie_name: string;
}

export interface Prediction {
  class_name: string;
  label: number;
  probability: number;
  specie: Specie;
}

export interface PredictionResponse {
  predictions: {
    predictions: Array<Prediction>;
    top_prediction: Prediction;
  };
  success: boolean;
}
