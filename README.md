# Interoperable_Calculator
-_-_-_-_-_-_-_Skills Implemented__-_-_-_-_-_-_-
This software covers Algorithm implementation, Interoperability: Cross-language integration, Api communication and design, Implementing and Debugging pipelines, Full-stack; client side and server side operations

-_-_-_-_-_-_-_Exlpanation__-_-_-_-_-_-_-
This software project is a dynamic graphing and arithmetic calculator built using C, Python, and React (JSX), designed to demonstrate cross-language interoperability, performance-oriented computation, and modern web application architecture.

C is the computational engine, coded with a custom tokenizer and expression parser (Shunting Yard algorithm) for evaluating user input. C is implemented for efficient performance, manual memory management, and fine-grained low-level control

Python handles middleware, performs graphing via matplotlib, and leverages Python's Foreign Function Interface to load the compiled C shared library using ctypes, and FASTapi to transfer data from the backend to the web application front end.

the front end is a Single Page Application that dynamically updates its contents without page reloads or new tabs, and interactively renders results and graphs for a better user experience. Responsible for managing two roles, validating and sending user input to the back end and displaying the results it receives.


-_-_-_-_-_-_-_Data Flow__-_-_-_-_-_-_-

Arithmetic service: 
User input in React -> convert to JSON -> FASTapi(python) -> perform Ctype / FFI -> char * (result) -> FASTapi(python) -> React
___________________________________________________________________________________________________
Graphing service: 
User input in React -> convert to JSON -> FASTapi(python) -> perform matplotlib -> graphing solution as an image -> FASTapi (python) -> React 


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
