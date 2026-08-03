import pandas as pd


class DataPreprocessor:
    """
    Enterprise Data Preprocessing Class
    """

    def __init__(self):
        pass

    def load_data(self, file_path):
        """
        Load dataset
        """
        print("Loading dataset...")
        df = pd.read_csv(file_path)
        return df

    def remove_duplicates(self, df):
        """
        Remove duplicate rows
        """
        print("Removing duplicate rows...")
        return df.drop_duplicates()

    def handle_missing_values(self, df):
        """
        Handle missing values
        """
        print("Handling missing values...")
        return df.ffill()

    def preprocess(self, file_path):
        """
        Complete preprocessing pipeline
        """
        df = self.load_data(file_path)
        df = self.remove_duplicates(df)
        df = self.handle_missing_values(df)

        print("Preprocessing Completed Successfully!")

        return df