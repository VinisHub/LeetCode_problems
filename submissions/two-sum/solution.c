#include <stdlib.h>

// Structure to hold value and original index
typedef struct {
    int value;
    int index;
} Pair;

// Comparison function for qsort()
int compare(const void* a, const void* b) {
    return ((Pair*)a)->value - ((Pair*)b)->value;
}

// Binary search to find complement value
int binarySearch(Pair* arr, int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid].value == target)
            return mid;
        else if (arr[mid].value < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;  // Not found
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Step 1: Create an array of (value, index) pairs
    Pair* arr = (Pair*)malloc(numsSize * sizeof(Pair));
    for (int i = 0; i < numsSize; i++) {
        arr[i].value = nums[i];
        arr[i].index = i;
    }

    // Step 2: Sort pairs based on value
    qsort(arr, numsSize, sizeof(Pair), compare);

    // Step 3: For each element, binary search for complement
    for (int i = 0; i < numsSize - 1; i++) {
        int complement = target - arr[i].value;
        int j = binarySearch(arr, i + 1, numsSize - 1, complement);

        if (j != -1) {
            int* result = (int*)malloc(2 * sizeof(int));
            result[0] = arr[i].index;
            result[1] = arr[j].index;
            *returnSize = 2;
            free(arr);
            return result;
        }
    }

    // Step 4: If no pair found (though problem guarantees one)
    *returnSize = 0;
    free(arr);
    return NULL;
}
