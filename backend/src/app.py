from flask import Flask, request, jsonify
from .api.routes import api
from flask_cors import CORS
from dotenv import load_dotenv


load_dotenv()


def create_app():
    app = Flask(__name__)
    # CORS(app)
    app.register_blueprint(api, url_prefix="/api")
    return app


app = create_app()

app.run(debug=True)
