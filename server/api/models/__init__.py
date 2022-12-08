import torch
import os
from torchvision import transforms
from torch.nn import functional as F
import numpy as np

# torch device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# allowed images 
allowed_extensions = ['.jpg', '.JPG', '.png' ,'.PNG' ,'.jpeg' ,'.JPEG']

# Model names
MODEL_NAME = "snakes-species.pt"

# Model paths
PYTORCH_SSI_MODEL_PATH = os.path.join(os.getcwd(),
                                      f"models/pytorch/static/{MODEL_NAME}"
                                      )
    
    
class Specie:
    def __init__(self, id: int, class_:str, specie_name: str, common_name: str) -> None:
        self.id = id
        self.class_ = class_
        self.common_name = common_name
        self.specie_name = specie_name
        
    def __repr__(self) -> str:
        return f"<{self.specie_name}>"
    
    def __str__(self) -> str:
        return f"<{self.specie_name}>"
    
    def to_json(self):
        return {
            "id": self.id,
            "class_": self.class_,
            "common_name": self.common_name,
            "specie_name": self.specie_name,
        }
    
class Prediction:
    def __init__(self, label:int, probability:float, class_name: str, specie: Specie) -> None:
        self.label = label
        self.probability = probability
        self.class_name = class_name
        self.specie = specie
        
    def __repr__(self) -> str:
        return f"<{self.class_name}>"
    
    def __str__(self) -> str:
        return f"<{self.class_name}>"
    
    def to_json(self):
        return {
            "label": int(self.label),
            "probability": float(self.probability),
            "class_name": self.class_name,
            "specie": self.specie.to_json()
        }
    
class Response:
    def __init__(self, top_prediction: Prediction, predictions:list) -> None:
        self.predictions = predictions
        self.top_prediction = top_prediction
        
    def __repr__(self) -> str:
        return f"<SSI Prediction Response>"
    
    def __str__(self) -> str:
        return f"<SSI Prediction Response>"
    
    def to_json(self):
        return{
           "predictions": [item.to_json() for item in self.predictions],
            "top_prediction": self.top_prediction.to_json()
        }
    
# Classes
classes = ['class-1', 'class-2', 'class-3', 'class-4', 'class-5']
snakes_classes =[
    {
        "id": 0, 
        "class_": "class-1", 
        "specie_name": "Nerodia sipedon",
        "common_name": "Northern Watersnake"
    },
     {
        "id": 1, 
        "class_": "class-2", 
        "specie_name": "Thamnophis sirtalis",
        "common_name":"Common Garter snake"
    },
     {
        "id": 2, 
        "class_": "class-3", 
        "specie_name": "Storeria dekayi",
        "common_name":"DeKay's Brown snake"
    },
     {
        "id": 3, 
        "class_": "class-4", 
        "specie_name": "Patherophis obsoletus",
        "common_name":"Black Rat snake"
    },
     {
        "id": 4, 
        "class_": "class-5", 
        "specie_name": "Crotalus atrox",
        "common_name":"Western Diamondback rattlesnake"
    },
]

        
pretrained_size = 224
pretrained_means = [0.485, 0.456, 0.406]
pretrained_stds= [0.229, 0.224, 0.225]
  
image_transforms = transforms.Compose([
  transforms.Resize(pretrained_size),
  transforms.CenterCrop(pretrained_size),
  transforms.ToTensor(),
  transforms.Normalize(mean = pretrained_means, std = pretrained_stds)
])

def preprocess_img(img):
    """
    takes in a pillow image and pre process it
    """
    img = image_transforms(img)
    return img

def predict(model, image, device):
    image = image.unsqueeze(dim=0).to(device)
    preds, _ = model(image)
    preds = F.softmax(preds, dim=1).detach().cpu().numpy().squeeze()
    predicted_label = np.argmax(preds)
    predictions = [
        Prediction(
            label= i,
            class_name = classes[i],
            probability = np.round(preds[i], 2),
            specie = Specie(
                id = snakes_classes[i]['id'],
                class_ = snakes_classes[i]['class_'],
                common_name = snakes_classes[i]['common_name'],
                specie_name = snakes_classes[i]['specie_name']
            )
        ) for i, _ in enumerate(preds)
    ]
    predicted = Prediction(
        label= predicted_label,
        class_name = classes[predicted_label],
        probability = np.round(preds[predicted_label], 2),
        specie = Specie(
            id = snakes_classes[predicted_label]['id'],
            class_ = snakes_classes[predicted_label]['class_'],
            common_name = snakes_classes[predicted_label]['common_name'],
            specie_name = snakes_classes[predicted_label]['specie_name'],
            
        )
    )
    return Response(
        top_prediction = predicted,
        predictions = predictions
    )
