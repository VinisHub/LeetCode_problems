#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    // Paste your actual measured times from q2b_parallel_oddeven.cpp output below.
    double T1 = 0.8500;
    double T2 = 0.4700;
    double T4 = 0.2600;
    double T8 = 0.1750;

    int P[] = {2, 4, 8};
    double T[] = {T2, T4, T8};

    cout << left << setw(6) << "P" << setw(12) << "T(P)" << setw(12) << "S(P)"
         << setw(12) << "E(P)" << "Classification" << endl;
    cout << "--------------------------------------------------------" << endl;

    bool below05reported = false;
    for (int i = 0; i < 3; i++) {
        double S = T1 / T[i];
        double E = S / P[i];
        string cls;
        if (S > P[i] * 1.02) cls = "super-linear";
        else if (S < P[i] * 0.98) cls = "sub-linear";
        else cls = "linear";

        cout << left << setw(6) << P[i] << setw(12) << fixed << setprecision(4) << T[i]
             << setw(12) << S << setw(12) << E << cls << endl;

        if (E < 0.5 && !below05reported) {
            cout << "  -> Efficiency first falls below 0.5 at P = " << P[i] << endl;
            below05reported = true;
        }
    }
    if (!below05reported) cout << "Efficiency stays above 0.5 for all tested P." << endl;
    return 0;
}
