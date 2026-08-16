// CSS311 - Lab 2 - Question 1(b): Parallel Pi Estimation

#include <iostream>
#include <omp.h>
#include <cmath>
using namespace std;

int main() {
    long long n = 1000000;          // >= 10^6 intervals as required
    double step = 1.0 / (double)n;
    int nthreads = 4;
    omp_set_num_threads(nthreads);

    double sum_par = 0.0;   // shared variable updated by multiple threads
    double t0 = omp_get_wtime();

    #pragma omp parallel
    {
        int tid = omp_get_thread_num();
        double local_sum = 0.0;

        #pragma omp for
        for (long long i = 0; i < n; i++) {
            double x = (i + 0.5) * step;
            local_sum += 4.0 / (1.0 + x * x);
        }

        // show number of threads involved and area calculated by each thread
        cout << "Thread " << tid << " -> partial area = " << local_sum * step << "\n";

        sum_par += local_sum;   // shared accumulation (race condition, see part c)
    }

    double pi_par = sum_par * step;
    double t1 = omp_get_wtime();

    cout << "\n===== Parallel Version =====\n";
    cout << "Number of threads = " << nthreads << "\n";
    cout << "Computed pi = " << pi_par << "\n";
    double pi_true = acos(-1.0);
    cout << "Classical pi = " << pi_true << "\n";
    cout << "Absolute error = " << fabs(pi_par - pi_true) << "\n";
    cout << "Time = " << (t1 - t0) << " sec\n";

    return 0;
}