from pydantic import BaseModel


class TransactionRequest(BaseModel):

    merchant: str
    category: str
    amt: float
    gender: str
    city: str
    state: str
    zip: int
    lat: float
    long: float
    city_pop: int
    job: str
    unix_time: int
    merch_lat: float
    merch_long: float