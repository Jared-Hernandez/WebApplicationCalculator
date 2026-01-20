#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>
#define PI 3.14159265358979323846
#define MAX 60

char holdingStack[MAX/2][MAX] = {0}; // LIFO, stores parenthesis and operators
char outputStack[MAX/2][MAX] = {0}; // FIFO, stores numbers and popped holding stack operands
char solveStack[MAX/2][MAX] = {0};// where postfix is solved: every operator use the previous 2 numbers to its index

char * calculate(const char *input);
void toString (float num,char *out, size_t outSize); //converts the values and numbers to strings to be stored and be read
int precedence(char *operator); //stores the operator heirarchy
void free_result(char *ptr);
int main(void) {

    char *eq = "3+5=";        //passes
    char *eq1 = "17-34=";        //passes
    char *eq1_1 = "1234/87=";        //passes
    char *eq1_2 = "1.5*3=";        //passes
    char *eq1_3 = "0.54+1.6543*2=";       //solution is correct
    char *eq1_4 = "1+2*4-3=";        //solution is correct
    char *eq2 = "(7*3+5)*8+9="; //solution is correct
    char *eq2_1 = "7/(3+4)"; //passes
    char *eq2_4 = "23-(4+6)="; // passes
    char *eq2_5 = "(8+9)/(-2-9)="; // passes
    char *eq3 = "12*(8-3-4)+6="; //solution is correct
    char *eq4 = "38-(-9)/2.5="; //solution is correct
    char *eq5 = "33/(-6)*61="; // solution is correct
    char *eq6 = "3.5*3.5*3.5/(-3)="; //solution is correct
    char *eq7 = "-3/(-3)="; //solution is correct
    char *eq8 = "-(3*2)="; //solution is correct
    char *eq9 = "-1234-(-0.32)/0.1="; //solution is correct.


    printf("\n%s", calculate(eq3));



    return 0;
}
/*
float add() {

}
float sub() {

}
float div() {

}
float mul(){

}
int stringToNumber(char *value) {
    int num = 0;

    return num;
}
*/
float stringToNum(char *value) {
    float num =0;
    char *roam = value;
    int operand = 0;
    int isDecimal = 0; //isDecimal starts off. when turned on increments
    int isNegative = 0;

    switch (*value) {
        case '1':
            num += 1;
            break;
        case '2':
            num += 2;
            break;
        case '3':
            num += 3;
            break;
        case '4':
            num += 4;
            break;
        case '5':
            num += 5;
            break;
        case '6':
            num += 6;
        break;
        case '7':
            num += 7;
        break;
        case '8':
            num += 8;
        break;
        case '9':
            num += 9;
        break;
        case '-':
            isNegative = 1;
        break;
        default:
            num += 0;//this means we have completely iterated through the equation:
        break;
    }
    roam ++;

    while (*roam) {
        if (*roam == '.') {
            isDecimal = 1;
            roam++;
        }
        if (isDecimal == 0){
            num = (num * 10) + (*roam - '0');
            roam++;
        }
        else {
            num = num + (*roam - '0')/(pow(10.0,isDecimal));
            isDecimal++;
            roam++;
        }
    }
    if (isNegative ==1) {
        num = (0 - num);
    }
    return num;
}

void toString (float num,char *out, size_t outSize) {

    snprintf(out,outSize,"%f",num);
    //printf("%s", valuebuffer);

}
void free_result(char *ptr) {
    free(ptr);
}

char * calculate(const char *input){
    // follow PEMDAS order of operations, input is the equation to solve
    char *answer = ""; //returns the answer to the equation stored in input
    float value = 0; //is used to retain the value stored from converting strings to numbers
    char **numbersInEquation = calloc(1,sizeof(char *)); //dynamic array for storing values in input
    char num[MAX] = ""; //contain total digits in one operand
    char individualNum[2] = {0}; //collects a single digit from input to add to the string num
    int eqLength = 0; //stores length of input parameter
    int parenthesis = 0; //keep track of open parenthesis during

    int holdingLocality = 0; //these three ints store the length of the stack and queue used for the algorithm
    int outputLocality = 0;
    int solveLocality = 0;

    if (!input) {
        free(numbersInEquation);
        return NULL;
    }

    else {
        char *traverse = input; //begin by tokenizing the string
        while (*traverse) {
            if (*traverse <= '9' && *traverse >= '0' || *traverse == '.') {

                //accumulate digits for value

                individualNum[0] = *traverse;
                individualNum[1] = '\0';
                strcat(num,individualNum);


            }

            if (*traverse == '+' || *traverse == '/'|| *traverse == '-' || *traverse== '*' ||
                *traverse == '=' || *traverse == '(' || *traverse == ')') { //when you reach an operand, add the number and operand:
                if(*traverse != '='){

                        if(*traverse == '('){//store only the parenthesis

                            eqLength += 1;
                            char **tmp = realloc(numbersInEquation,(eqLength) * sizeof(char *));
                            numbersInEquation = tmp;
                            individualNum[0] = *traverse;
                            individualNum[1] = '\0';
                            numbersInEquation[eqLength -1] = malloc(strlen(individualNum) +1);
                            strcpy(numbersInEquation[eqLength-1],individualNum);
                        }
                        else if(*traverse == ')'){ // add both the number and the parenthesis
                            parenthesis = 1;

                            eqLength += 2;
                            char **tmp = realloc(numbersInEquation,(eqLength) * sizeof(char *));
                            numbersInEquation = tmp;
                            numbersInEquation[eqLength-2] = malloc(strlen(num) +1);
                            strcpy(numbersInEquation[eqLength-2], num);

                            individualNum[0] = *traverse;
                            individualNum[1] = '\0';
                            numbersInEquation[eqLength -1] = malloc(strlen(individualNum) +1);
                            strcpy(numbersInEquation[eqLength-1], individualNum);
                        }
                        else{


                            if(parenthesis == 1){ //if previous was ) handle the special case:
                                eqLength +=1;
                                char **tmp = realloc(numbersInEquation,(eqLength) * sizeof(char *));
                                numbersInEquation = tmp;
                                individualNum[0] = *traverse;
                                individualNum[1] = '\0';
                                numbersInEquation[eqLength -1] = malloc(strlen(individualNum) +1);
                                strcpy(numbersInEquation[eqLength-1],individualNum);
                            parenthesis =0;
                            }
                            else if (strcmp(num,"") == 0) { // in situations to only add operator, such as negation
                                eqLength ++;
                                char **tmp = realloc(numbersInEquation, eqLength * sizeof(char *));
                                numbersInEquation = tmp;
                                individualNum[0] = *traverse;
                                individualNum[1] = '\0';
                                numbersInEquation[eqLength-1] = malloc(sizeof(individualNum) +1);

                                strcpy(numbersInEquation[eqLength -1],individualNum);

                            }

                            else {

                                // for adding a number and operator:

                                    eqLength += 2;
                                    char **tmp = realloc(numbersInEquation,(eqLength) * sizeof(char *));
                                    numbersInEquation = tmp;
                                    numbersInEquation[eqLength-2] = malloc(strlen(num) +1);
                                    strcpy(numbersInEquation[eqLength-2], num);

                                    individualNum[0] = *traverse;
                                    individualNum[1] = '\0';
                                    numbersInEquation[eqLength -1] = malloc(strlen(individualNum) +1);
                                    strcpy(numbersInEquation[eqLength-1], individualNum);

                            }
                        }
                }
                else{ //add number that the equations ends with:
                    if (strcmp(num,"") != 0) {
                        eqLength ++;
                        char **tmp = realloc(numbersInEquation,(eqLength) * sizeof(char *));
                        numbersInEquation = tmp;
                        numbersInEquation[eqLength -1] = malloc(strlen(num)+1);
                        strcpy(numbersInEquation[eqLength -1], num);
                    }
                }
                strcpy(num, "");
            }
            traverse++;
        }
        //input has been completely tokenized into numbersInEquation, ignores any imperfections. Now search for negations:
        //check for negations:

        if (strcmp(numbersInEquation[0],"-") ==0 &&
                (numbersInEquation[1][0] >= '0' && numbersInEquation[1][0] <= '9')) {
                num[0] = '-';
                num[1] = '\0';

                strcat(num,numbersInEquation[1]);
                numbersInEquation[0] = malloc(strlen(num)+1);
                strcpy(numbersInEquation[0],num);

                for (int i = 1; i < eqLength-1; i++) {
                    numbersInEquation[i] = numbersInEquation[i+1];
                }

                num[0] = '\0';
                eqLength--;
            }

        for (int i= 0; i < eqLength; i++) { // search for (-#, if found manipulate the tokens again
            if (i >= 2 &&
            (strcmp(numbersInEquation[i-1],"-")==0 && strcmp(numbersInEquation[i-2], "(")==0)
            ) {
                num[0] = '-';
                num[1] = '\0';

                strcat(num,numbersInEquation[i]);
                free(numbersInEquation[i]);
                free(numbersInEquation[i-1]);

                numbersInEquation[i] = NULL;
                numbersInEquation[i-1] = NULL;
                numbersInEquation[i-1] = malloc(strlen(num)+1);
                strcpy(numbersInEquation[i-1], num);
                for (int j = i; j <= eqLength-2; j ++) {
                    numbersInEquation[j] = numbersInEquation[j+1];
                }

                eqLength --;

            }
        }




                               //begin converting from infix to postfix, use Shunting Yard Algorithm:
        parenthesis = 0;
        /*for(int i = 0; i < eqLength; i++){
        printf("\n%s",numbersInEquation[i]);
        }
        printf("Here is the eqLength:%d\n", eqLength);*/


        for (int i = 0; i < eqLength; i++) {
            if (strcmp(numbersInEquation[i], "(")==0) { // be aware of ( when flushing
                parenthesis ++;
            }
           if((numbersInEquation[i][0] >= '0' && numbersInEquation[i][0] <= '9')||
               (numbersInEquation[i][1] >= '0' &&
                numbersInEquation[i][1] <= '9' &&
                numbersInEquation[i][0] == '-')){ //put numbers in at the same sequence they appear, FIFO
               strcpy(outputStack[outputLocality], numbersInEquation[i]);
                outputLocality ++;
            }
           else{ //add operators as long as precedence is lower than current operator,order of precedence: (),/,*,+,-

                if(holdingLocality == 0){ //add the first operator
                    strcpy(holdingStack[holdingLocality], numbersInEquation[i]);
                    holdingLocality ++;

                }
                else{ //if precedence of previous operator is higher than current, flush out stack by LIFO
                    if(strcmp(numbersInEquation[i], ")") == 0){ // ) triggers to flush operators by LIFO until ( is found
                        parenthesis --;
                        holdingLocality --;
                        while(strcmp(holdingStack[holdingLocality], "(") != 0){
                            strcpy(outputStack[outputLocality], holdingStack[holdingLocality]);
                            outputLocality ++;
                            strcpy(holdingStack[holdingLocality],"");
                            holdingLocality--;
                        }
                        strcpy(holdingStack[holdingLocality], ""); //empty the element at (
                    }
                    else{
                        if(precedence(numbersInEquation[i]) > precedence(holdingStack[holdingLocality-1]) ||
                            strcmp(numbersInEquation[i],"(") == 0){
                            strcpy(holdingStack[holdingLocality], numbersInEquation[i]);
                            holdingLocality ++;

                        }
                        else if (strcmp(numbersInEquation[i], holdingStack[holdingLocality-1]) ==0) {
                            strcpy(outputStack[outputLocality], numbersInEquation[i]);
                            outputLocality ++;
                        }
                        else{ // if the current operator precedence is lower:
                            if (parenthesis > 0) { //if a parenthesis was added
                                while(strcmp(holdingStack[holdingLocality-1], "(") != 0){
                                    strcpy(outputStack[outputLocality], holdingStack[holdingLocality-1]);
                                    outputLocality ++;
                                    strcpy(holdingStack[holdingLocality-1],"");
                                    holdingLocality--;
                                }
                                holdingLocality ++;
                                strcpy(holdingStack[holdingLocality-1], numbersInEquation[i]); //add new operator but do not replace (

                                parenthesis --;
                            }
                            else { //if no parenthesis was added
                                for(int j = holdingLocality-1; j >= 0; j--){
                                    strcpy(outputStack[outputLocality], holdingStack[j]);
                                    outputLocality ++;
                                    strcpy(holdingStack[j],""); //empty the stack as it traverses
                                }
                                holdingLocality = 0; // finally add the operator that had the smaller precedence
                                strcpy(holdingStack[holdingLocality],numbersInEquation[i]);
                                holdingLocality++;
                            }
                        }
                    }

                }
           }
        }

        for(int i = holdingLocality-1; i >= 0; i--){ //flush out the holding stack
            strcpy(outputStack[outputLocality], holdingStack[i]);
            outputLocality ++;
            strcpy(holdingStack[i], ""); //empty the stack
        }
        //this means we have completely iterated through the equation,reset position:
        holdingLocality = 0;
        //begin solving:

        for (int i = 0; i < outputLocality; i++) {

            if((outputStack[i][0] >= '0' && outputStack[i][0] <= '9')||
               (outputStack[i][1] >= '0' &&
                outputStack[i][1] <= '9' &&
                outputStack[i][0] == '-')) {
                strcpy(solveStack[solveLocality], outputStack[i]);
                solveLocality ++;
            }
            else {
                if (strcmp(outputStack[i], "+") ==0) {
                    value = stringToNum(solveStack[solveLocality-2]) + stringToNum(solveStack[solveLocality-1]);
                    strcpy(solveStack[solveLocality-1],"");
                    solveLocality --;

                    char buffer[MAX]; //store the data
                    toString(value, buffer, sizeof(buffer));
                    strcpy(solveStack[solveLocality-1],buffer);
                }
                else if (strcmp(outputStack[i], "*") ==0) {
                    value = stringToNum(solveStack[solveLocality-2]) * stringToNum(solveStack[solveLocality-1]);
                    strcpy(solveStack[solveLocality-1],"");
                    solveLocality --;

                    char buffer[MAX]; //store the data
                    toString(value, buffer, sizeof(buffer));
                    strcpy(solveStack[solveLocality-1],buffer);
                }
                else if (strcmp(outputStack[i], "/") ==0) {
                    value = stringToNum(solveStack[solveLocality-2]) / stringToNum(solveStack[solveLocality-1]);
                    strcpy(solveStack[solveLocality-1],"");
                    solveLocality --;

                    char buffer[MAX]; //store the data
                    toString(value, buffer, sizeof(buffer));
                    strcpy(solveStack[solveLocality-1],buffer);
                }
                else if (strcmp(outputStack[i], "-") ==0) {
                    if (solveLocality ==1) {
                        value = 0 - stringToNum(solveStack[solveLocality-1]);

                        char buffer[MAX]; //store the data
                        toString(value, buffer, sizeof(buffer));
                        strcpy(solveStack[solveLocality-1],buffer);
                    }
                    else {
                        value = stringToNum(solveStack[solveLocality-2]) - stringToNum(solveStack[solveLocality-1]);
                        strcpy(solveStack[solveLocality-1],"");
                        solveLocality --;

                        char buffer[MAX]; //store the data
                        toString(value, buffer, sizeof(buffer));
                        strcpy(solveStack[solveLocality-1],buffer);
                    }
                }
            }
        }


        for(int i = 0; i < outputLocality; i ++){
            printf("%s,",outputStack[i]);
        }

        for (int i = 0; i < eqLength; i++) {
            free(numbersInEquation[i]);
        }
        free(numbersInEquation);

        num[0] = '\0';
        individualNum[0] = '\0';


        if (ceil(stringToNum(solveStack[0])) == stringToNum(solveStack[0])) {
            int i = 0;
            while (solveStack[0][i] != '.') {
                individualNum[0] = solveStack[0][i];
                individualNum[1] = '\0';
                strcat(num,individualNum);
                i++;
            }
        }
        else {
            strcpy(num, solveStack[0]);
        }


        answer = malloc(strlen(num) +1);
        strcpy(answer,num);
        return answer;

    }
}

int precedence(char *operator){ //order of precedence: (),/,*,+,-
int value = 0;

if(strcmp(operator, "(") ==0){
        value = 1;
}
else if(strcmp(operator, "/") ==0){
    value = 4;
}
else if(strcmp(operator, "*") ==0){
    value = 3;
}
else if(strcmp(operator, "+") ==0){
    value = 2;
}
else if(strcmp(operator, "-") ==0){
    value = 1;
}
else{
    value = 0;
}

return value;
}
