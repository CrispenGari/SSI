### GraphQL Uploads

In this section I will demostrate how we can upload files using `graphene-file-upload` and `flask`.

### Schema

Our schema for uploading files will look as follows:

```py
import graphene
from graphene_file_upload.scalars import Upload

class UploadFileMutation(graphene.Mutation):
    class Arguments:
        file = Upload(required=True)

    success = graphene.Boolean()

    def mutate(self, info, file, **kwargs):
        print(file)
        return UploadFileMutation(success=True)

class Mutation(graphene.ObjectType):
    uploadFile = UploadFileMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
```

### Flask App

Our flask `app` will look as follows:

```py
from graphene_file_upload.flask import FileUploadGraphQLView
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.add_url_rule('/graphql', view_func=FileUploadGraphQLView.as_view(
    'graphql',
    schema=schema,
    graphiql=True,
))
if __name__ == "__main__":
    app.run(debug=True, port=3001, )
```

> Note that instead of using `GraphQLView` we use `FileUploadGraphQLView` from `graphene_file_upload`.

Now we can upload files using `cURL` as follows:

```shell
curl http://localhost:3001/graphql  -F operations='{ "query": "mutation UploadFile($file: Upload!){ uploadFile(file: $file){ success }}", "variables": { "file": null } }'  -F map='{ "0": ["variables.file"] }'  -F 0=@README.md
```

If everything went well you will get the following response:

```json
{ "data": { "uploadFile": { "success": true } } }
```

```

curl http://localhost:3001/graphql  -F operations='{ "query": "mutation PredictSnakeSpecie($input: PredictionInputType!) { predictSnake(input: $input) { error { field message } ok prediction {predictions {  label probability className specie { id specieName commonName } } } } }", "variables": { "input": {"image": null} } }'  -F map='{ "0": ["variables.input.image"] }'  -F 0=@class-1.jpg
```

mutation PredictSnakeSpecie($input: PredictionInputType!) { predictSnake(input: $input) { error { field message } ok prediction {predictions { label probability className specie { id specieName commonName } } } } }
