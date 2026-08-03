import joblib
import os
import traceback

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml_model",
    "saved_models",
    "xgboost_model.pkl"
)

PIPELINE_PATH = os.path.join(
    BASE_DIR,
    "ml_model",
    "saved_models",
    "preprocessing_pipeline.pkl"
)


class FraudPredictor:

    def __init__(self):

        print("Loading Enterprise AI Model...")

        self.model = joblib.load(MODEL_PATH)
        self.pipeline = joblib.load(PIPELINE_PATH)

        print("Model Loaded Successfully!")

    def predict(self, data):

        print("\n==========================")
        print("INPUT DATA")
        print("==========================")

        print(data)

        print("\nColumns")

        print(data.columns.tolist())

        try:

            processed = self.pipeline.transform(data)

            print("\nPipeline Successful")
            print("Processed Shape:", processed.shape)

            probability = self.model.predict_proba(processed)[0][1]

            prediction = int(probability >= 0.5)

            return prediction, probability

        except Exception:

            print("\nERROR INSIDE PREDICTOR")
            traceback.print_exc()

            raise