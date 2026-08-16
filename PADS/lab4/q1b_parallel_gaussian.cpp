#include <iostream>
#include <vector>
#include <cmath>
#include <omp.h>
using namespace std;

void solveParallel(vector<vector<double>>& A, int n, vector<double>& x, int numThreads) {
    omp_set_num_threads(numThreads);

    for (int k = 0; k < n - 1; k++) {
        int pivot = k;
        double maxVal = fabs(A[k][k]);

        #pragma omp parallel
        {
            int localPivot = k;
            double localMax = maxVal;
            #pragma omp for nowait
            for (int i = k + 1; i < n; i++) {
                if (fabs(A[i][k]) > localMax) {
                    localMax = fabs(A[i][k]);
                    localPivot = i;
                }
            }
            #pragma omp critical
            {
                if (localMax > maxVal) {
                    maxVal = localMax;
                    pivot = localPivot;
                }
            }
        }
        if (pivot != k) swap(A[pivot], A[k]);

        #pragma omp parallel for schedule(static)
        for (int i = k + 1; i < n; i++) {
            int tid = omp_get_thread_num();
            double factor = A[i][k] / A[k][k];
            for (int j = k; j <= n; j++) {
                A[i][j] -= factor * A[k][j];
            }
            #pragma omp critical
            {
                cout << "  Row " << i << " eliminated by thread " << tid << endl;
            }
        }
    }

    for (int i = n - 1; i >= 0; i--) {
        double sum = A[i][n];
        #pragma omp parallel for reduction(-:sum)
        for (int j = i + 1; j < n; j++) sum -= A[i][j] * x[j];
        x[i] = sum / A[i][i];
    }
}

int main() {
    int n = 3;
    int numThreads = 4;
    vector<vector<double>> A = {
        {1, -1, 1, 4},
        {1, -4, 2, 8},
        {1, 2, 8, 12}
    };
    vector<double> x(n);

    cout << "Running with " << numThreads << " threads" << endl;
    double start = omp_get_wtime();
    solveParallel(A, n, x, numThreads);
    double end = omp_get_wtime();

    cout << "Solution:" << endl;
    cout << "x = " << x[0] << ", y = " << x[1] << ", z = " << x[2] << endl;
    cout << "Parallel execution time T(P) = " << (end - start) << " seconds" << endl;
    return 0;
}
