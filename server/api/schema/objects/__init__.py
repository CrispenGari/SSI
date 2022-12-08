import graphene

class SpecieType(graphene.ObjectType):
    id = graphene.Int(required=True) 
    class_ = graphene.String(required=True) 
    specie_name = graphene.String(required=True)
    common_name = graphene.String(required=True)
    
class PredictedType(graphene.ObjectType):
    label = graphene.Int(required=True)
    probability = graphene.Float(required=True)
    class_name = graphene.String(required=True)
    specie = graphene.Field(SpecieType, required=True)
    
class PredictionType(graphene.ObjectType):
    top_prediction = graphene.Field(PredictedType, required=True)
    predictions = graphene.NonNull(graphene.List(PredictedType))

class ErrorType(graphene.ObjectType):
    field = graphene.String(required=True)
    message = graphene.String(required = True)
    
class MetaResponse(graphene.ObjectType):
    """
    This object-type contains the meta data for this API.
    """
    description = graphene.String(required=True)
    language = graphene.String(required=True)
    libraries = graphene.NonNull(graphene.List(graphene.String))
    main = graphene.String(required=True)
    programmer = graphene.String(required=True)