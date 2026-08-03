import math
import numpy as np
from datetime import datetime


class BackendFeatureEngineer:

    @staticmethod
    def haversine_distance(lat1, lon1, lat2, lon2):
        R = 6371  # Earth's radius in KM

        lat1 = math.radians(lat1)
        lon1 = math.radians(lon1)
        lat2 = math.radians(lat2)
        lon2 = math.radians(lon2)

        dlat = lat2 - lat1
        dlon = lon2 - lon1

        a = (
            math.sin(dlat / 2) ** 2
            + math.cos(lat1)
            * math.cos(lat2)
            * math.sin(dlon / 2) ** 2
        )

        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

        return R * c

    @staticmethod
    def create_features(transaction):

        dt = datetime.fromtimestamp(transaction.unix_time)

        transaction_hour = dt.hour
        transaction_day = dt.day
        transaction_month = dt.month
        day_of_week = dt.strftime("%A")

        log_amount = np.log1p(transaction.amt)

        distance = BackendFeatureEngineer.haversine_distance(
            transaction.lat,
            transaction.long,
            transaction.merch_lat,
            transaction.merch_long,
        )

        return {
            "transaction_hour": transaction_hour,
            "transaction_day": transaction_day,
            "transaction_month": transaction_month,
            "day_of_week": day_of_week,
            "log_amount": log_amount,
            "distance_km": distance,
        }