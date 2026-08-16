// CSS311 - Lab 2 - Question 1(c): Race Condition Identification and Fix
#include <iostream>
#include <omp.h>
#include <cmath>
using namespace std;

int main() {
    long long n = 1000000;          // >= 10^6 intervals as required
    double step = 1.0 / (double)n;
    int nthreads = 4;
    omp_set_num_threads(nthreads);

    double sum_fixed = 0.0;
    double t0 = omp_get_wtime();

    #pragma omp parallel for reduction(+:sum_fixed)
    for (long long i = 0; i < n; i++) {
        double x = (i + 0.5) * step;
        sum_fixed += 4.0 / (1.0 + x * x);
    }

    double pi_fixed = sum_fixed * step;
    double t1 = omp_get_wtime();

    cout << "===== Parallel Version (fixed with reduction clause) =====\n";
    cout << "Number of threads = " << nthreads << "\n";
    cout << "Computed pi = " << pi_fixed << "\n";
    cout << "Classical pi (M_PI) = " << M_PI << "\n";
    cout << "Absolute error = " << fabs(pi_fixed - M_PI) << "\n";
    cout << "Time = " << (t1 - t0) << " sec\n";

    return 0;
}

// Compile : g++ -fopenmp q1c_fixed.cpp -o q1c
// Run     : ./q1c
//
// Race condition explanation:
// In the part (b) parallel program, the line
//      sum_par += local_sum;
// is executed by every thread inside the parallel region on the SAME shared
// variable "sum_par". Multiple threads can read the current value, add their
// own local_sum, and write back at (almost) the same time. If two threads
// interleave this read-modify-write sequence, one thread's update can be
// lost, so the final sum (and hence pi) becomes incorrect / inconsistent
// between runs. This is a classic race condition on a shared accumulator.
//
// Fix: instead of manually adding into a shared variable inside the
// parallel region, use OpenMP's "reduction" clause. OpenMP then gives each
// thread its own private copy of the reduction variable, lets each thread
// accumulate into its private copy with no contention, and safely combines
// all the private copies into the final shared result after the parallel
// region ends.