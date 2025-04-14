# MIPS Emulator Backend

## Install development environment

1. Install Python requirements
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
2. Build emulator
```bash
cd emulator
mkdir -p bin
make all
```

## Run development server
```bash
.venv/bin/python main.py
```