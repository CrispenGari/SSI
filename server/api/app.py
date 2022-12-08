
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

from app import app
from flask import make_response, jsonify
from blueprints import blueprint
from graphene_file_upload.flask import FileUploadGraphQLView
from schema import schema

app.register_blueprint(blueprint, url_prefix="/api")
class AppConfig:
    PORT = 3001
    DEBUG = False
    
@app.route('/', methods=["GET"])
def meta():
    meta = {
        "programmer": "@crispengari",
        "main": "Snake Specie Identification (SSI)",
        "description": "given an image of a snake, the API should be able to predict the specie the snake belongs to.",
        "language": "python",
        "libraries": ["pytorch", "torchvision"],
    }
    return make_response(jsonify(meta)), 200

app.add_url_rule('/graphql', view_func=FileUploadGraphQLView.as_view(
    'graphql',
    schema=schema,
    graphiql=True,
))

if __name__ == "__main__":
    app.run(debug=AppConfig().DEBUG, port=AppConfig().PORT, )