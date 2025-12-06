#include <string.h>
#include <stdlib.h>

char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize == 0) return "";

    // Start with prefix = first string
    char* prefix = strs[0];
    int prefixLen = strlen(prefix);

    // Compare with each string in the array
    for (int i = 1; i < strsSize; i++) {
        int j = 0;
        
        // Find the common prefix between prefix and strs[i]
        while (j < prefixLen && strs[i][j] != '\0' && prefix[j] == strs[i][j]) {
            j++;
        }

        // Reduce prefix length to the matched part
        prefixLen = j;

        // If no common prefix, return empty string
        if (prefixLen == 0) return "";
    }

    // Allocate memory and return the prefix
    char* result = (char*)malloc(prefixLen + 1);
    strncpy(result, prefix, prefixLen);
    result[prefixLen] = '\0';

    return result;
}
