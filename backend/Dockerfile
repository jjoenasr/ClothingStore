# Use the official Python image as a parent image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the backend's requirements.txt into the container
COPY backend/requirements.txt .

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code into the container
COPY backend/ .

# Set environment variables for Django
ENV PYTHONUNBUFFERED 1

# Expose the port that the Django app will run on
EXPOSE 8000

# Run migrations and start the Django dev server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]