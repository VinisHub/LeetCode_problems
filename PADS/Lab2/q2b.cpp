// CSS311 - Lab 2 - Question 2(b): Padded Structure (avoids false sharing)
#include <iostream>
#include <vector>
#include <omp.h>
using namespace std;

const long long ITER = 100000000; // increments per thread

int main() {
    int nthreads = 4;
    omp_set_num_threads(nthreads);

    // Each counter is padded so it occupies its own 64-byte cache line.
    // Threads no longer contend for the same cache line when updating
    // neighbouring counters.
    struct PaddedCounter {
        int value;
        char padding[60];   // int(4 bytes) + padding(60 bytes) = 64 bytes total
    };
    vector<PaddedCounter> padded(nthreads);
    for (auto &p : padded) p.value = 0;

    double t0 = omp_get_wtime();
    #pragma omp parallel
    {
        int tid = omp_get_thread_num();
        for (long long i = 0; i < ITER; i++) {
            padded[tid].value++;
        }
    }
    double t1 = omp_get_wtime();

    cout << "===== Padded Structure Version (false sharing removed) =====\n";
    cout << "Number of threads = " << nthreads << "\n";
    for (int i = 0; i < nthreads; i++)
        cout << "padded[" << i << "].value = " << padded[i].value << "\n";
    cout << "Time = " << (t1 - t0) << " sec\n";

    return 0;
}