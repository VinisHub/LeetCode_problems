#include <iostream>
#include <iomanip>
#include <vector>
#include <cstdlib>
#include <omp.h>
using namespace std;

void oddEvenSortParallel(vector<int>& A, int numThreads) {
    omp_set_num_threads(numThreads);
    int n = A.size();
    for (int phase = 0; phase < n; phase++) {
        if (phase % 2 == 0) {
            #pragma omp parallel for schedule(static)
            for (int i = 0; i < n - 1; i += 2)
                if (A[i] > A[i + 1]) swap(A[i], A[i + 1]);
        } else {
            #pragma omp parallel for schedule(static)
            for (int i = 1; i < n - 1; i += 2)
                if (A[i] > A[i + 1]) swap(A[i], A[i + 1]);
        }
    }
}

bool isSorted(const vector<int>& A) {
    for (size_t i = 0; i + 1 < A.size(); i++)
        if (A[i] > A[i + 1]) return false;
    return true;
}

int main() {
    // Step 1: verify correctness on the small test case
    vector<int> test = {29, 10, 14, 37, 13, 5, 42, 8, 21, 3};
    oddEvenSortParallel(test, 4);
    cout << "Test case result: ";
    for (int v : test) cout << v << " ";
    cout << endl;
    cout << (isSorted(test) ? "Verification: PASSED" : "Verification: FAILED") << endl << endl;

    // Step 2: benchmark on N = 10000 random integers
    int n = 10000;
    srand(42);
    vector<int> original(n);
    for (int i = 0; i < n; i++) original[i] = rand() % 100000;

    int threadCounts[] = {1, 2, 4, 8};
    cout << left << setw(10) << "P" << setw(15) << "T(P) sec" << endl;
    cout << "----------------------" << endl;

    for (int p : threadCounts) {
        vector<int> A = original;
        double start = omp_get_wtime();
        oddEvenSortParallel(A, p);
        double end = omp_get_wtime();
        cout << left << setw(10) << p << setw(15) << fixed << setprecision(4) << (end - start);
        cout << (isSorted(A) ? "  (sorted OK)" : "  (SORT FAILED)") << endl;
    }
    return 0;
}
