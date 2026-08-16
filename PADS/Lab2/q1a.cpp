// CSS311 - Lab 2 - Question 1(a): Sequential Pi Estimation (Rectangle Rule)

#include <iostream>
#include <cmath>
#include <chrono>
using namespace std;
using namespace std::chrono;

int main() {
    long long n = 1000000;          // >= 10^6 intervals as required
    double step = 1.0 / (double)n;

    auto t0 = high_resolution_clock::now();

    double sum = 0.0;
    for (long long i = 0; i < n; i++) {
        double x = (i + 0.5) * step;   // midpoint of interval i
        sum += 4.0 / (1.0 + x * x);
    }
    double pi = sum * step;

    auto t1 = high_resolution_clock::now();
    double elapsed = duration<double>(t1 - t0).count();

    cout << "===== Sequential Version =====\n";
    cout << "Computed pi = " << pi << "\n";
    cout << "Classical pi (M_PI) = " << M_PI << "\n";
    cout << "Absolute error = " << fabs(pi - M_PI) << "\n";
    cout << "Time = " << elapsed << " sec\n";

    return 0;
}