// CSS311 - Lab 2 - Question 2(a): False Sharing (contiguous array)
// Compile : g++ -fopenmp -O2 q2a_false_sharing.cpp -o q2a
// Run     : ./q2a

#include <iostream>
#include <vector>
#include <omp.h>
using namespace std;

const long long ITER = 100000000; // increments per thread

int main() {
    int nthreads = 4;
    omp_set_num_threads(nthreads);

    // All counters packed together in one contiguous int array.
    // Threads writing to neighbouring array elements repeatedly invalidate
    // the same CPU cache line -> false sharing.
    vector<int> counters(nthreads, 0);

    double t0 = omp_get_wtime();
    #pragma omp parallel
    {
        int tid = omp_get_thread_num();
        for (long long i = 0; i < ITER; i++) {
            counters[tid]++;
        }
    }
    double t1 = omp_get_wtime();

    cout << "===== False Sharing Version (contiguous array) =====\n";
    cout << "Number of threads = " << nthreads << "\n";
    for (int i = 0; i < nthreads; i++)
        cout << "counters[" << i << "] = " << counters[i] << "\n";
    cout << "Time = " << (t1 - t0) << " sec\n";

    return 0;
}