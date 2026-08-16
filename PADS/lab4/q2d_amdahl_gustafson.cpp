#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    // Paste your measured S(8) from q2c_speedup_efficiency.cpp below.
    double S8 = 4.8570;
    int P = 8;

    double f = (1.0 - 1.0 / S8) / (1.0 - 1.0 / P);
    double s = 1.0 - f;

    double amdahlSpeedup = 1.0 / (s + f / P);
    double gustafsonSpeedup = P - s * (P - 1);

    cout << fixed << setprecision(4);
    cout << "Measured S(8)             = " << S8 << endl;
    cout << "Estimated parallel fraction f  = " << f << endl;
    cout << "Serial fraction s          = " << s << endl;
    cout << "Amdahl speedup S_A(8)      = " << amdahlSpeedup << endl;
    cout << "Gustafson speedup S_G(8)   = " << gustafsonSpeedup << endl;

    cout << endl;
    cout << "Since N is fixed (not scaled with P) in this experiment, Amdahl's" << endl;
    cout << "fixed-problem-size assumption matches the setup, so S_A(8) tracks" << endl;
    cout << "the measured S(8) closely, while Gustafson's scaled-size model" << endl;
    cout << "gives an optimistic upper bound that would only hold if N grew with P." << endl;
    return 0;
}
