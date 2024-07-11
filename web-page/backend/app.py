from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import base64
import logging
import traceback

# Set up logging
logging.basicConfig(level=logging.INFO)

application = Flask(__name__)

# Load the model once when the application starts
model = tf.keras.models.load_model("best_dog_breed_model.h5")

resize_layer = tf.keras.layers.Resizing(224, 224)
class_names = [
    "Affenpinscher",
    "Afghan hound",
    "African hunting dog",
    "Airedale",
    "American Staffordshire terrier",
    "Appenzeller",
    "Australian terrier",
    "Basenji",
    "Basset",
    "Beagle",
    "Bedlington terrier",
    "Bernese mountain dog",
    "Black-and-tan coonhound",
    "Blenheim spaniel",
    "Bloodhound",
    "Bluetick",
    "Border collie",
    "Border terrier",
    "Borzoi",
    "Boston bull",
    "Bouvier des Flandres",
    "Boxer",
    "Brabancon griffon",
    "Briard",
    "Brittany spaniel",
    "Bull mastiff",
    "Cairn",
    "Cardigan",
    "Chesapeake Bay retriever",
    "Chihuahua",
    "Chow",
    "Clumber",
    "Cocker spaniel",
    "Collie",
    "Curly-coated retriever",
    "Dandie Dinmont",
    "Dhole",
    "Dingo",
    "Doberman",
    "English foxhound",
    "English setter",
    "English springer",
    "EntleBucher",
    "Eskimo dog",
    "Flat-coated retriever",
    "French bulldog",
    "German shepherd",
    "German short-haired pointer",
    "Giant schnauzer",
    "Golden retriever",
    "Gordon setter",
    "Great Dane",
    "Great Pyrenees",
    "Greater Swiss Mountain dog",
    "Groenendael",
    "Ibizan hound",
    "Irish setter",
    "Irish terrier",
    "Irish water spaniel",
    "Irish wolfhound",
    "Italian greyhound",
    "Japanese spaniel",
    "Keeshond",
    "Kelpie",
    "Kerry blue terrier",
    "Komondor",
    "Kuvasz",
    "Labrador retriever",
    "Lakeland terrier",
    "Leonberg",
    "Lhasa",
    "Malamute",
    "Malinois",
    "Maltese dog",
    "Mexican hairless",
    "Miniature pinscher",
    "Miniature poodle",
    "Miniature schnauzer",
    "Newfoundland",
    "Norfolk terrier",
    "Norwegian elkhound",
    "Norwich terrier",
    "Old English sheepdog",
    "Otterhound",
    "Papillon",
    "Pekinese",
    "Pembroke",
    "Pomeranian",
    "Pug",
    "Redbone",
    "Rhodesian ridgeback",
    "Rottweiler",
    "Saint Bernard",
    "Saluki",
    "Samoyed",
    "Schipperke",
    "Scotch terrier",
    "Scottish deerhound",
    "Sealyham terrier",
    "Shetland sheepdog",
    "Shih-Tzu",
    "Siberian husky",
    "Silky terrier",
    "Soft-coated wheaten terrier",
    "Staffordshire bullterrier",
    "Standard poodle",
    "Standard schnauzer",
    "Sussex spaniel",
    "Tibetan mastiff",
    "Tibetan terrier",
    "Toy poodle",
    "Toy terrier",
    "Vizsla",
    "Walker hound",
    "Weimaraner",
    "Welsh springer spaniel",
    "West Highland white terrier",
    "Whippet",
    "Wire-haired fox terrier",
    "Yorkshire terrier",
]


@application.errorhandler(Exception)
def handle_exception(e):
    """Exception handler that returns the traceback and error message."""
    logging.error(f"Exception: {str(e)}")
    traceback.print_exc()
    return jsonify({"error": str(e)}), 500


@application.route("/pred", methods=["POST"])
def handle_post_request():
    """POST request handler for predicting dog breeds."""
    try:
        data = request.get_json()
        if "file" not in data:
            return jsonify({"error": "No file data received"}), 400

        base64_data = data["file"]
        file_data = base64.b64decode(base64_data)

        image = tf.io.decode_image(file_data, channels=3)
        image = tf.squeeze(resize_layer(image))
        image = tf.expand_dims(image, axis=0)

        prediction_probs = model.predict(image)
        prediction = class_names[np.argmax(prediction_probs)]

        return jsonify({"prediction": prediction})
    except Exception as e:
        return handle_exception(e)


if __name__ == "__main__":
    logging.info("Starting Flask application")
    application.run(host="0.0.0.0")
