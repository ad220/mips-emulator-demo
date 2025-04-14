from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import subprocess
import tempfile
import os
import re

os.chdir("emulator/")
EXAMPLES_DIR="examples"
app = FastAPI(title="MIPS Emulator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MipsCode(BaseModel):
    code: str
    step_by_step: bool = False

class EmulatorResponse(BaseModel):
    registers: Dict[str, int]
    pc: int
    hi: int
    lo: int
    memory: Dict[int, List[int]]
    output: str

@app.get("/")
def read_root():
    return {"message": "MIPS Emulator API is running"}

def parse_state(output: str):
    REGISTER_NAMES = ["$zero","$at","$v0","$v1","$a0","$a1","$a2","$a3","$t0","$t1","$t2","$t3","$t4","$t5","$t6","$t7","$s0","$s1","$s2","$s3","$s4","$s5","$s6","$s7","$t8","$t9","$k0","$k1","$gp","$sp","$fp","$ra"]

    # Extract registers state
    registers = {}
    pc, hi, lo = 0, 0, 0
    memory = {}
    
    # Parse registers
    register_pattern = r"R(\d+):\s*(-?\d+)"
    register_matches = re.findall(register_pattern, output)
    for reg_num, reg_val in register_matches:
        registers[REGISTER_NAMES[int(reg_num)]] = int(reg_val)
    
    # Parse PC, HI, LO
    pc_pattern = r"PC:0x([0-9A-F]+)"
    pc_match = re.search(pc_pattern, output)
    if pc_match:
        pc = int(pc_match.group(1), 16)
    
    hi_pattern = r"HI:\s*(-?\d+)"
    hi_match = re.search(hi_pattern, output)
    if hi_match:
        hi = int(hi_match.group(1))
    
    lo_pattern = r"LO:\s*(-?\d+)"
    lo_match = re.search(lo_pattern, output)
    if lo_match:
        lo = int(lo_match.group(1))
    
    # Parse memory pages
    page_pattern = r"Page (\d+) :[\s\S]*?(?=Page \d+ :|$)"
    page_matches = re.findall(page_pattern, output)
    
    for page_num in page_matches:
        page_content_pattern = r"Page " + page_num + r" :([\s\S]*?)(?=Page \d+ :|$)"
        page_content_match = re.search(page_content_pattern, output)
        
        if page_content_match:
            page_content = page_content_match.group(1)
            memory_entries = [0] * 64
            
            memory_pattern = r"0x([0-9A-F]+):\s*(-?\d+)"
            memory_matches = re.findall(memory_pattern, page_content)
            
            for addr, value in memory_matches:
                memory_entries[int(addr, 16)//4] = int(value)
            
            if memory_entries:  # Only include pages with non-zero values
                memory[int(page_num)] = memory_entries
    
    return registers, pc, hi, lo, memory

@app.post("/emulate", response_model=EmulatorResponse)
def emulate_mips(mips_data: MipsCode):
    try:
        # Create temporary file for MIPS code
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mips") as temp_file:
            temp_file.write(mips_data.code.encode())
            temp_filename = temp_file.name

        with open(temp_filename, 'r') as tmp_file:
            if len(tmp_file.readlines())>128:
                raise HTTPException(status_code=500, detail=f"API error: too many instructions, file length limited to 128 lines.")
        
        # Build command based on step_by_step flag
        command = ["./emulateur", temp_filename]
        if mips_data.step_by_step:
            command.append("--pas")
        
        # Execute emulator
        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        stdout, stderr = process.communicate()
        
        # Clean up temporary file
        os.unlink(temp_filename)
        
        if process.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Emulator error: {stderr}")
        
        # Parse emulator output
        registers, pc, hi, lo, memory = parse_state(stdout)
        
        return EmulatorResponse(
            registers=registers,
            pc=pc,
            hi=hi,
            lo=lo,
            memory=memory,
            output=stdout
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/examples")
def get_examples():
    examples = {}
    
    # Load example files from tests directory
    for filename in os.listdir(EXAMPLES_DIR):
        if filename.endswith(".mips"):
            with open(os.path.join(tests_dir, filename), "r") as f:
                examples[filename] = f.read()
    
    return examples

if __name__ == "__main__":
    import uvicorn
    EXAMPLES_DIR = "tests"
    uvicorn.run(app, host="0.0.0.0", port=8000)