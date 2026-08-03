import pandas as pd
import numpy as np

class FeatureEngineer:

    def __init__(self):
        pass

    def create_time_features(self, df):

        print("Creating time-based features...")

        df["trans_date_trans_time"] = pd.to_datetime(df["trans_date_trans_time"])

        df["transaction_hour"] = df["trans_date_trans_time"].dt.hour
        df["transaction_day"] = df["trans_date_trans_time"].dt.day
        df["transaction_month"] = df["trans_date_trans_time"].dt.month
        df["day_of_week"] = df["trans_date_trans_time"].dt.day_name()

        return df

    def create_amount_features(self, df):

        print("Creating amount features...")

        df["log_amount"] = np.log1p(df["amt"])

        return df

    def haversine_distance(self, df):

        print("Creating distance feature...")

        R = 6371

        lat1 = np.radians(df["lat"])
        lon1 = np.radians(df["long"])

        lat2 = np.radians(df["merch_lat"])
        lon2 = np.radians(df["merch_long"])

        dlat = lat2 - lat1
        dlon = lon2 - lon1

        a = (
            np.sin(dlat / 2) ** 2
            + np.cos(lat1)
            * np.cos(lat2)
            * np.sin(dlon / 2) ** 2
        )

        c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))

        df["distance_km"] = R * c

        return df