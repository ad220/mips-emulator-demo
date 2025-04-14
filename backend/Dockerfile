FROM amd64/gcc:latest AS build

# Build emulator
WORKDIR /app
COPY ./emulator ./
RUN mkdir -p bin && make all

FROM python:3.11-slim

WORKDIR /app

# Install requirements
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy API source file, compiled emulator and MIPS examples
COPY ./main.py .
COPY --from=build /app/emulateur /app/emulator/
COPY ./emulator/tests /app/emulator/examples/

# Expose the port
EXPOSE 1574

# Run the API
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]