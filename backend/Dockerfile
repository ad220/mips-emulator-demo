FROM python:3.11-slim

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy source files
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy emulator source code
COPY ./emulator ./emulator
WORKDIR /app/emulator

# Build the emulator
RUN mkdir -p bin && make all

WORKDIR /app

# Copy the API code
COPY ./main.py .

# Expose the port
EXPOSE 1574

# Run the API
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "1574"]