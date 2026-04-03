from sqlalchemy import create_engine, Column, String, DateTime, Float, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///database.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    property_type = Column(String, nullable=False)
    area = Column(String, nullable=False)
    rooms = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    style = Column(String, nullable=False)
    budget = Column(String, nullable=False)
    timeline = Column(String, nullable=False)
    name = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    ai_result = Column(String, nullable=True)


Base.metadata.create_all(bind=engine)
