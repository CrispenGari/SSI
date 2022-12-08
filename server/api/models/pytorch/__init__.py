import torch
from torch import nn
from models import *

# Config of our model
B = [64, 64, 'M', 128, 128, 'M', 256, 256, 'M', 512, 512, 'M', 512, 512, 'M']

class VGG(nn.Module):
    def __init__(self, features, output_dim):
        super().__init__()
        self.features = features
        self.avgpool = nn.AdaptiveAvgPool2d(7)
        self.classifier = nn.Sequential(
        nn.Linear(512 * 7 * 7, 4096),
        nn.ReLU(inplace = True),
        nn.Dropout(0.5),
        nn.Linear(4096, 4096),
        nn.ReLU(inplace = True),
        nn.Dropout(0.5),
        nn.Linear(4096, output_dim)
        )
    def forward(self, x):
        x = self.features(x)
        x = self.avgpool(x)
        h = x.view(x.shape[0], -1)
        x = self.classifier(h)
        return x, h
    
def get_vgg_layers(config, batch_norm):
    layers = []
    in_channels = 3
    for c in config:
        assert c == 'M' or isinstance(c, int)
        if c == 'M':
            layers += [nn.MaxPool2d(kernel_size = 2)]
        else:
            conv2d = nn.Conv2d(in_channels, c, kernel_size = 3, padding = 1)
            if batch_norm:
                layers += [conv2d, nn.BatchNorm2d(c), nn.ReLU(inplace = True)]
            else:
                layers += [conv2d, nn.ReLU(inplace = True)]
            in_channels = c   
    return nn.Sequential(*layers)
    
# VGG_13 layers
vgg13_layers = get_vgg_layers(B, batch_norm = True)

print(" ✅ LOADING PYTORCH SSI MODEL!\n") 
# Hyper params
OUTPUT_DIM = len(snakes_classes)

# Model instance
ssi_model = VGG(vgg13_layers, OUTPUT_DIM).to(device)

ssi_model.load_state_dict(torch.load(PYTORCH_SSI_MODEL_PATH, 
                                     map_location=device))
print(" ✅ LOADING PYTORCH SSI MODEL DONE!\n")


