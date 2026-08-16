#include <iostream>
#include <chrono>
#include <cstdlib>

#define N 100000000   // 100 million elements

int main() {
    float *A = new float[N];
    float *B = new float[N];
    float *C = new float[N];

    // Initialize arrays
    for (int i = 0; i < N; i++) {
        A[i] = static_cast<float>(i % 100);
        B[i] = static_cast<float>((i % 50) + 1);
    }

    auto start = std::chrono::high_resolution_clock::now();

    for (int i = 0; i < N; i++) {
        C[i] = A[i] + B[i];
    }

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double, std::milli> elapsed = end - start;

    std::cout << "Array size: " << N << " elements\n";
    std::cout << "Execution time: " << elapsed.count() << " ms\n";
    std::cout << "Sanity check C[12345] = " << C[12345] << "\n";

    delete[] A;
    delete[] B;
    delete[] C;
    return 0;
}
