#include <iostream>
#include <vector>
#include <cmath>
#include <omp.h>
using namespace std;

void solveSerial(vector<vector<double>>& A, int n, vector<double>& x) {
    for (int k = 0; k < n - 1; k++) {
        int pivot = k;
        for (int i = k + 1; i < n; i++) {
            if (fabs(A[i][k]) > fabs(A[pivot][k])) pivot = i;
        }
        if (pivot != k) swap(A[pivot], A[k]);

        for (int i = k + 1; i < n; i++) {
            double factor = A[i][k] / A[k][k];
            for (int j = k; j <= n; j++) {
                A[i][j] -= factor * A[k][j];
            }
        }
    }

    for (int i = n - 1; i >= 0; i--) {
        double sum = A[i][n];
        for (int j = i + 1; j < n; j++) sum -= A[i][j] * x[j];
        x[i] = sum / A[i][i];
    }
}

int main() {
    int n = 3;
    // x - y + z = 4, x - 4y + 2z = 8, x + 2y + 8z = 12
    vector<vector<double>> A = {
        {1, -1, 1, 4},
        {1, -4, 2, 8},
        {1, 2, 8, 12}
    };
    vector<double> x(n);

    double start = omp_get_wtime();
    solveSerial(A, n, x);
    double end = omp_get_wtime();

    cout << "Solution:" << endl;
    cout << "x = " << x[0] << ", y = " << x[1] << ", z = " << x[2] << endl;
    cout << "Expected: x = 1.6667, y = -0.8333, z = 1.5" << endl;
    cout << "Serial execution time T(1) = " << (end - start) << " seconds" << endl;
    return 0;
}