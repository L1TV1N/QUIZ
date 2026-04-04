from sqlalchemy import create_engine, Column, String, DateTime, Float, Integer, Boolean, Text
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
    
    # Режим работы
    ai_mode = Column(Boolean, default=False, nullable=False)
    
    # Основные поля из ТЗ
    property_type = Column(String, nullable=False)  # Тип помещения
    zones = Column(Text, nullable=False)  # Зоны (JSON или список через запятую)
    area = Column(Integer, nullable=False)  # Площадь (число)
    style = Column(String, nullable=False)  # Стиль (одиночный выбор)
    budget = Column(String, nullable=False)  # Бюджет
    
    # Контактные данные
    name = Column(String, nullable=False)  # Имя (обязательно)
    phone = Column(String, nullable=False)  # Телефон (обязательно)
    email = Column(String, nullable=True)  # Email (опционально)
    comment = Column(Text, nullable=True)  # Комментарий (опционально)
    agree_to_terms = Column(Boolean, default=False, nullable=False)  # Согласие на обработку
    
    # Метаинформация
    created_at = Column(DateTime, default=datetime.utcnow)
    ai_result = Column(Text, nullable=True)  # Результат AI
    ai_questions = Column(Text, nullable=True)  # AI вопросы (JSON)


Base.metadata.create_all(bind=engine)

