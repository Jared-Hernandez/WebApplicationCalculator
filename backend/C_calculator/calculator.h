#ifndef CALCULATOR_H
#define CALCULATOR_H

#ifdef _WIN32
#define API __declspec(dllexport)
#else
#define API
#endif

API char *calculate(const char *input);
API void free_result(char *ptr);

#endif