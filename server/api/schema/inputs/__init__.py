import graphene
from graphene_file_upload.scalars import Upload

class PredictionInputType(graphene.InputObjectType):
    """
    This is the input object that that the user will pass when making 
    queries to the graphql server:
        image:FileStorage = The image of a snake that you want to predict.
    """
    image = Upload(required=True)
    