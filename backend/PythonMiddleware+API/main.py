#Lines 2 -10 are dependencies for plotting and graphing
import matplotlib
matplotlib.use('Agg')
import numpy as np
import matplotlib.pyplot as plt
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import io
import base64
#lines 12-18 are dependencies and necessary components for using C functions
import ctypes
import os
lib = ctypes.CDLL(os.path.abspath("calculator.dll"))
lib.calculate.argtypes = [ctypes.c_char_p]
lib.calculate.restype = ctypes.c_void_p
lib.free_result.argtypes = [ctypes.c_void_p]
lib.free_result.restype = None


app = FastAPI()
#for security measures that the REACT website uses, respond and send allow
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",   # React dev server
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)
#What python expects from REACT when calculator sends data
class CalculatorRequest(BaseModel):
    problem: str

@app.post("/calculator")
def calculator(req: CalculatorRequest):
    if req.problem == "":
        raise HTTPException(
            status_code=400,
            detail="empty, please enter an equation"
        )

    expr = req.problem
    ptr = lib.calculate(expr.encode("utf-8"))

    if not ptr:
        raise RuntimeError("calculate returned NULL")

    result = ctypes.string_at(ptr).decode("utf-8")
    lib.free_result(ptr)

    return {"result": result}

"""What python expects from REACT when graphing component sends data"""
class GraphRequest(BaseModel):
    equations: list[str]

    xMin: float
    yMin: float
    xMax: float
    yMax: float

@app.post("/graph")
def graph(req: GraphRequest):
    """prevents crashing from user input"""
    if (req.xMin == req.xMax or req.yMin == req.yMax or req.xMax < 0
            or req.yMax < 0 or req.yMin > req.yMax or req.xMin > req.xMax):
        raise(HTTPException(status_code = 400,
                            detail =
        "xMin and xMax, likewise yMin and yMax, must have reasonable values"))
    fig = plt.figure()
    ax = fig.add_subplot(1, 1, 1)
    # set the X-axis and y-axis interval limits as well as the centered x&y-axis

    xMin = req.xMin
    xMax = req.xMax
    yMin = req.yMin
    yMax = req.yMax

    ax.set_xlim(xMin, xMax)
    ax.set_ylim(yMin, yMax)

    # Normalize the x-coordinate of the y-axis
    midPxNorm = (0 - xMin) / (xMax - xMin)

    # normalize the y-coordinate of the x-axis
    midPyNorm = (0 - yMin) / (yMax - yMin)

    # start zeroing the spines:
    ax.spines["left"].set_position("zero")  # y-axis in now centered
    ax.spines["right"].set_visible(False)

    ax.spines["bottom"].set_position("zero")  # x-axis is now centered
    ax.spines["top"].set_visible(False)

    # y-axis label
    ax.set_ylabel("Y-Axis", rotation="horizontal")
    ax.yaxis.set_label_coords(midPxNorm, 1.04)

    ax.set_xlabel("X-Axis")
    ax.xaxis.set_label_coords(1.04, midPyNorm)

    color = ["Blue", "Aqua", "DarkGreen", "Orange", "FireBrick", "Gold", "Lime", "PaleVioletRed", "purple", "Green"]

    i = 0
    #x = np.linspace(req.xMin, req.xMax,1001)
    for equation in req.equations:

        if equation.strip() != "":
            x_vals = np.linspace(xMin, xMax, 1001)
            equation = equation.replace("^", "**")

            local_env = {"x": x_vals, #swap values for something python understands
                         "sin": np.sin,
                         "cos": np.cos,
                         "tan": np.tan,
                         "pi": np.pi,
                         "e": np.e
                         }

            y_vals = eval(equation, {}, local_env)
            Color = color[i]
            ax.plot(x_vals, y_vals, color=Color)
        i = i + 1

    buf = io.BytesIO()
    plt.grid(linewidth=1.25)
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)

    return{
        "image": base64.b64encode(buf.read()).decode("utf-8")
    }



