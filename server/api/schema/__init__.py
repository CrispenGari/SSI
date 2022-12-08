import graphene
import io
from PIL import Image
from schema.inputs import *
from schema.objects import *
from models import *
from models.pytorch import *

class Query(graphene.ObjectType):
    meta = graphene.Field(graphene.NonNull(MetaResponse))
    def resolve_meta(root, info):
        return  MetaResponse(
           description= "given an image of a snake, the API should be able to predict the specie the snake belongs to.",
            language= "python",
            libraries= ["pytorch", "torchvision"],
            main= "Snake Specie Identification (SSI)",
            programmer= "@crispengari"
        )

class PredictSnakeMutation(graphene.Mutation):
    class Arguments:
        input=graphene.Argument(graphene.NonNull(PredictionInputType))
    error = graphene.Field(ErrorType, required=False)
    ok = graphene.Boolean(required=True)
    prediction = graphene.Field(PredictionType, required=False)
    def mutate(self, info, input, **kwargs):
        try:
            ext = "."+str(input.image.filename).split('.')[-1]
            if not ext in allowed_extensions:
                return PredictSnakeMutation(
                    ok = False,
                    error = ErrorType(
                        field = 'image',
                        message = f'Only images with extensions ({", ".join(allowed_extensions)}) are allowed.'
                    )
                )
            image = input.image.read()
            image = Image.open(io.BytesIO(image))
            tensor = preprocess_img(image)
            res = predict(ssi_model, tensor, device)
            return PredictSnakeMutation(
                ok = True,
                prediction = PredictionType(
                    top_prediction = PredictedType(
                        label= res.top_prediction.label,
                        class_name= res.top_prediction.class_name,
                        probability= res.top_prediction.probability,
                        specie = SpecieType(
                            id = res.top_prediction.specie.id,
                            class_ = res.top_prediction.specie.class_,
                            common_name = res.top_prediction.specie.common_name,
                            specie_name = res.top_prediction.specie.specie_name
                        )
                    ),
                    predictions = [
                        PredictedType(
                            label= pred.label,
                            class_name= pred.class_name,
                            probability= pred.probability,
                            specie = SpecieType(
                                id = pred.specie.id,
                                class_ = pred.specie.class_,
                                common_name = pred.specie.common_name,
                                specie_name = pred.specie.specie_name
                            ) 
                        ) for pred in res.predictions
                    ]
                )
            )
        except Exception as e:
            print(e)
            return PredictSnakeMutation(
                ok = False,
                error = ErrorType(
                    field = 'server',
                    message = "Something went wrong on the server."
                )
            )
    
class Mutation(graphene.ObjectType):
    predictSnake = PredictSnakeMutation.Field()
    
schema = graphene.Schema(query=Query, mutation=Mutation)