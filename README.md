# Dog Breed Prediction

Welcome to the Dog Breed Prediction tool! This project uses deep learning to predict the breed of a dog from an uploaded photo. The model is trained on the Stanford Dog Breed dataset and employs various techniques such as classic convolutional networks, data augmentation, hyperparameter tuning, and transfer learning. 

You can find the working Web Application here: https://vlad-ds.pro/dog_breeds/.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Model Details](#model-details)
- [Web Application](#web-application)
- [API Endpoints](#api-endpoints)
- [Results and Evaluation](#results-and-evaluation)
- [Acknowledgments](#acknowledgments)

## Features
- **Accurate Predictions:** Utilizes state-of-the-art deep learning models to predict dog breeds with high accuracy.
- **User-Friendly Interface:** Simple and intuitive web interface for uploading images and viewing predictions.
- **Real-Time Results:** Get instant predictions for the uploaded dog images.
- **Data Visualization:** Includes data exploration and visualization tools such as confusion matrices and breed depiction.

## Technologies Used
- **TensorFlow/Keras:** For building and training the deep learning models.
- **Flask:** For creating the backend API to handle prediction requests.
- **HTML/CSS/JavaScript:** For building the front-end web interface.
- **PIL (Pillow):** For image processing.
- **NumPy:** For numerical operations.

## Setup
### Prerequisites
Ensure you have the following installed:
- Python 3.x
- TensorFlow
- Flask
- PIL (Pillow)
- NumPy

### Installation
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/dog-breed-prediction.git
    cd dog-breed-prediction
    ```

2. **Create and Activate a Virtual Environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. **Install the Required Packages:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Download and Place the Trained Model:**
   Download the `best_dog_breed_model.h5` file and place it in the project directory.

## Usage
### Running the Flask Server
To start the Flask server that handles API requests:
```bash
python app.py
```

### Accessing the Web Application
Open a web browser and navigate to:
```http://localhost:5000```
You can then upload a photo of a dog to get the breed prediction.

## Model Details

### Training and Techniques

The model is trained on the Stanford Dog Breed dataset using various techniques:

- **Convolutional Neural Networks (CNNs):** Initial models were built using classic CNN architectures.
- **Data Augmentation:** Techniques such as rotation, flipping, and scaling were used to augment the dataset and improve model generalization.
- **Hyperparameter Tuning:** Grid search was employed to find the best hyperparameters for the models.
- **Transfer Learning:** Pre-trained models were fine-tuned to enhance performance. The following pre-trained models were experimented with:
  - EfficientNetB0
  - EfficientNetB7
  - EfficientNetV2B0
  - EfficientNetV2B3
  - MobileNetV2
  - ResNet50V2

The best-performing model was selected and further fine-tuned for improved accuracy.

### Web Application

#### Front-End

The web application provides a user-friendly interface to upload images, submit for prediction, and display the results. It includes:

- An upload form for selecting a dog photo
- A display area for the uploaded image
- Buttons for submitting the photo and deleting the uploaded image
- A section to show the prediction results

#### How It Works

1. **Upload a Photo:** Select a photo of a dog to upload.
2. **Submit the Photo:** Click the submit button to send the image for prediction.
3. **View the Prediction:** The predicted breed will be displayed on the screen.

### API Endpoints

#### `/pred`

- **Method:** POST
- **Description:** Handles image prediction requests.
- **Request Body:**
  ```json
  {
      "file": "base64_encoded_image_string"
  }

### Response

```json
{
    "prediction": "Predicted breed"
}
```

### Results and Evaluation

The project includes various evaluation techniques to assess model performance:

- **Data Exploration:** Detailed exploration of the dataset to understand its characteristics.
- **Confusion Matrix:** Used to evaluate the accuracy of the model and identify breeds that are often confused.
![download (2)](https://github.com/VladKuzR/DogsBreeds/assets/123952016/904fdbdd-4b53-4498-bc7e-9d69e4791cfb)

- **Performance Metrics:** Key metrics such as accuracy, precision, recall, and F1-score were calculated to measure the model's performance.
- **F1-score Chart:** This comprehensive chart shows the weighted average of precision and recall per category.
![download (3)](https://github.com/VladKuzR/DogsBreeds/assets/123952016/19f056b3-5e7d-4bc0-bfdc-ca5f7c49a564)

### Acknowledgments

- The Stanford Dog Breed dataset for providing the data.
- TensorFlow and Keras for the deep learning framework.
- Flask for the web framework.
- All contributors and developers who made this project possible.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

