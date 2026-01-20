# Interoperable_Calculator
-_-_-_-_-_-_-_Skills Implemented __-_------
This software covers Algorithm implementation, Interoperability: Cross-language integration, Api communication and design, Implementing and Debugging pipelines, Full-stack; client side and server side operations

-_-_-_-_-_-_-_Exlpanation__-_-_-_-_-_-_-
This software project is a dynamic graphing and arithmetic calculator built using C, Python, and React (JSX), designed to demonstrate cross-language interoperability, performance-oriented computation, and modern web application architecture.

C is the computational engine, coded with a custom tokenizer and expression parser (Shunting Yard algorithm) for evaluation. C is implemented for efficient Performance, manual memory management, and fine-grained low-level control

Python handles middleware, performs graphing via matplotlib, and leverages Python's Foreign Function Interface to load the compiled C shared library using ctypes, and FASTapi to transfer data from the backend to the web application front end.

the front end is a is a Single Page Application that dynamically updates its contents without page reloads and renders results and graphs interactively for a better user experience. Sends user's graph and data input to the backend.


-_-_-_-_-_-_-_Data Flow__-_-_-_-_-_-_-

React -> JSON -> FASTapi(python) -> Ctype / FFI -> char * (result) -> FASTapi(python) -> React
___________________________________________________________________________________________________
React -> JSON -> FASTapi(python) -> matplotlib -> graphing solution as an image -> FASTapi (python) -> React 


-_-_-_-_-_-_-_How to Run__-_-_-_-_-_-_-
front end and back end are ran separately,
my resources: Pycharm for python, CLion for C, Vite + Visual Studio for React.
powershell instructions:

    npm run dev
for front end^ in react folder

    gcc -shared -o calculator.dll calculator.c -lm
    
sharing C functions to Python, necessary for ctypes^
this produces a .dll, a dynamic linked library, move/ copy calculator.dll file into the folder with main.py


    pip install fastapi uvicorn
    python -m uvicorn main:app --reload
for back end^ in python folder
