import ctypes
import os

lib = ctypes.CDLL(os.path.abspath("calculator.dll"))

lib.calculate.argtypes = [ctypes.c_char_p]
lib.calculate.restype = ctypes.c_void_p

lib.free_result.argtypes = [ctypes.c_void_p]
lib.free_result.restype = None

expr = b"8*9-(-3)="
ptr = lib.calculate(expr)

if not ptr:
    raise RuntimeError("calculate returned NULL")

result = ctypes.string_at(ptr).decode("utf-8")
lib.free_result(ptr)

print("Result:", result)