#include <iostream>
#include <vector>
#include <omp.h>
using namespace std;

void oddEvenSortSerial(vector<int>& A) {
    int n = A.size();
    for (int phase = 0; phase < n; phase++) {
        if (phase % 2 == 0) {
            for (int i = 0; i < n - 1; i += 2)
                if (A[i] > A[i + 1]) swap(A[i], A[i + 1]);
        } else {
            for (int i = 1; i < n - 1; i += 2)
                if (A[i] > A[i + 1]) swap(A[i], A[i + 1]);
        }
    }
}

int main() {
    vector<int> A = {29, 10, 14, 37, 13, 5, 42, 8, 21, 3};

    double start = omp_get_wtime();
    oddEvenSortSerial(A);
    double end = omp_get_wtime();

    cout << "Sorted array: ";
    for (int v : A) cout << v << " ";
    cout << endl;

    bool sorted = true;
    for (size_t i = 0; i + 1 < A.size(); i++)
        if (A[i] > A[i + 1]) sorted = false;
    cout << (sorted ? "Verification: PASSED" : "Verification: FAILED") << endl;

    cout << "Serial execution time T(1) = " << (end - start) << " seconds" << endl;
    return 0;
}
