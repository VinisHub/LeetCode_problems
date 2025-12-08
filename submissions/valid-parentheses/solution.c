#include <stdbool.h>
#include <stddef.h>
#include <string.h>
#include <stdlib.h>

bool isValid(char* s) {
    if (s == NULL) return true;         // treat NULL as empty -> valid
    size_t len = strlen(s);
    if (len == 0) return true;

    // allocate stack sized to the input length
    char *stack = (char*)malloc(len);
    if (!stack) return false; // malloc failed -> treat as invalid

    int top = -1;

    for (size_t i = 0; i < len; ++i) {
        char c = s[i];
        if (c == '(' || c == '[' || c == '{') {
            stack[++top] = c; // push
        } else if (c == ')' || c == ']' || c == '}') {
            if (top < 0) {    // nothing to match
                free(stack);
                return false;
            }
            char open = stack[top--]; // pop
            if (!((open == '(' && c == ')') ||
                  (open == '[' && c == ']') ||
                  (open == '{' && c == '}'))) {
                free(stack);
                return false;
            }
        } else {
            // if input contains other characters, treat as invalid.
            free(stack);
            return false;
        }
    }

    bool valid = (top == -1);
    free(stack);
    return valid;
}
