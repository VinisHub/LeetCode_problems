#include <iostream>
#include <chrono>

#define N 100000000

int main() {
    float *A = new float[N];
    float *B = new float[N];

    A[0] = 1.0f;
    for (int i = 0; i < N; i++) {
        B[i] = static_cast<float>((i % 50) + 1);
    }

    auto start = std::chrono::high_resolution_clock::now();

    // Loop-carried dependency: A[i] depends on A[i-1], computed in the
    // PREVIOUS iteration. Each iteration cannot begin until the previous
    // one has completed and written its result, so the compiler cannot
    // pack multiple iterations into one SIMD instruction.
    for (int i = 1; i < N; i++) {
        A[i] = A[i - 1] + B[i];
    }

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double, std::milli> elapsed = end - start;

    std::cout << "Execution time (dependency loop): " << elapsed.count() << " ms\n";
    std::cout << "Sanity check A[100] = " << A[100] << "\n";

    delete[] A;
    delete[] B;
    return 0;
}
