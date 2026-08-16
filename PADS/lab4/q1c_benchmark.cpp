#include <iostream>
#include <iomanip>
#include <vector>
#include <cmath>
#include <cstdlib>
#include <omp.h>
using namespace std;

void generateSystem(vector<vector<double>>& A, int n, unsigned seed) {
    srand(seed);
    A.assign(n, vector<double>(n + 1));
    for (int i = 0; i < n; i++) {
        double rowSum = 0;
        for (int j = 0; j < n; j++) {
            if (i != j) {
                A[i][j] = (rand() % 100) / 10.0 - 5.0;
                rowSum += fabs(A[i][j]);
            }
        }
        A[i][i] = rowSum + (rand() % 50 + 50);
        A[i][n] = (rand() % 200) / 10.0 - 10.0;
    }
}

void solveParallel(vector<vector<double>> A, int n, vector<double>& x, int numThreads) {
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
            double factor = A[i][k] / A[k][k];
            for (int j = k; j <= n; j++) {
                A[i][j] -= factor * A[k][j];
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
    int n = 2000;
    vector<vector<double>> Aoriginal;
    generateSystem(Aoriginal, n, 42);

    int threadCounts[] = {1, 2, 4, 8};
    cout << left << setw(10) << "P" << setw(15) << "T(P) sec" << endl;
    cout << "----------------------" << endl;

    for (int p : threadCounts) {
        vector<double> x(n);
        double start = omp_get_wtime();
        solveParallel(Aoriginal, n, x, p);
        double end = omp_get_wtime();
        cout << left << setw(10) << p << setw(15) << fixed << setprecision(4) << (end - start) << endl;
    }
    return 0;
}
