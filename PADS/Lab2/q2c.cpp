// CSS311 - Lab 2 - Question 2(c): OpenMP Reduction Clause + Comparison
#include <iostream>
#include <vector>
#include <omp.h>
using namespace std;

const long long ITER = 100000000; // increments per thread

int main() {
    int nthreads = 4;
    omp_set_num_threads(nthreads);

    // (a) False sharing version (for comparison)
    vector<int> counters(nthreads, 0);
    double t0 = omp_get_wtime();
    #pragma omp parallel
    {
        int tid = omp_get_thread_num();
        for (long long i = 0; i < ITER; i++) counters[tid]++;
    }
    double t1 = omp_get_wtime();
    double time_a = t1 - t0;

    // (b) Padded version (for comparison)
    struct PaddedCounter {
        int value;
        char padding[60];
    };
    vector<PaddedCounter> padded(nthreads);
    for (auto &p : padded) p.value = 0;

    double t2 = omp_get_wtime();
    #pragma omp parallel
    {
        int tid = omp_get_thread_num();
        for (long long i = 0; i < ITER; i++) padded[tid].value++;
    }
    double t3 = omp_get_wtime();
    double time_b = t3 - t2;

    // (c) OpenMP reduction version
    
    long long total = 0;
    double t4 = omp_get_wtime();
    #pragma omp parallel reduction(+:total)
    {
        long long local = 0;
        for (long long i = 0; i < ITER; i++) local++;
        total += local;
    }
    double t5 = omp_get_wtime();
    double time_c = t5 - t4;

    cout << "(c) OpenMP Reduction Clause Version \n";
    cout << "Number of threads = " << nthreads << "\n";
    cout << "Total = " << total << "\n";
    cout << "Time = " << time_c << " sec\n\n";

    cout << "Comparison of all three versions \n";
    cout << "(a) False sharing (contiguous array) time = " << time_a << " sec\n";
    cout << "(b) Padded structure time                 = " << time_b << " sec\n";
    cout << "(c) Reduction clause time                  = " << time_c << " sec\n\n";
    
    return 0;
}


// Each thread accumulates its own increments into a private local
    // variable (register-level, not shared memory at all), and OpenMP
    // combines all threads' private results into "total" only once at
    // the end of the parallel region.


// Compile : g++ -fopenmp -O2 q2c_reduction.cpp -o q2c
// Run     : ./q2c
//
// This file implements the third (reduction) version, then re-runs the
// false-sharing (a) and padded (b) versions internally so all three
// execution times can be printed side by side for the comparison required
// in part (c).