#include <iostream>
#include <vector>
#include <random>
#include <iomanip>
#include <cstdlib>
#include <omp.h>

using Matrix = std::vector<double>;

void initializeMatrix(Matrix &matrix, int dimension)
{
    std::mt19937 generator(42);
    std::uniform_real_distribution<double> distribution(0.0, 10.0);

    for (double &value : matrix)
        value = distribution(generator);
}

void serialMatrixMultiplication(
    const Matrix &matrixA,
    const Matrix &matrixB,
    Matrix &result,
    int dimension)
{
    std::fill(result.begin(), result.end(), 0.0);

    for (int i = 0; i < dimension; i++)
    {
        for (int k = 0; k < dimension; k++)
        {
            const double valueA = matrixA[i * dimension + k];

            for (int j = 0; j < dimension; j++)
            {
                result[i * dimension + j] +=
                    valueA * matrixB[k * dimension + j];
            }
        }
    }
}

void parallelMatrixMultiplication(
    const Matrix &matrixA,
    const Matrix &matrixB,
    Matrix &result,
    int dimension)
{
    std::fill(result.begin(), result.end(), 0.0);

#pragma omp parallel for schedule(static)
    for (int i = 0; i < dimension; i++)
    {
        for (int k = 0; k < dimension; k++)
        {
            const double valueA = matrixA[i * dimension + k];

            for (int j = 0; j < dimension; j++)
            {
                result[i * dimension + j] +=
                    valueA * matrixB[k * dimension + j];
            }
        }
    }
}

bool verifyResults(
    const Matrix &serialResult,
    const Matrix &parallelResult)
{
    const double tolerance = 1e-8;

    for (size_t i = 0; i < serialResult.size(); i++)
    {
        if (std::abs(serialResult[i] - parallelResult[i]) > tolerance)
            return false;
    }

    return true;
}

int main(int argc, char *argv[])
{
    int dimension = 100;

    if (argc == 2)
        dimension = std::atoi(argv[1]);

    if (dimension <= 0)
    {
        std::cerr << "Error! Matrix dimension must be positive.\n";
        return 1;
    }

    const size_t totalElements =
        static_cast<size_t>(dimension) * dimension;

    Matrix matrixA(totalElements);
    Matrix matrixB(totalElements);
    Matrix serialResult(totalElements);
    Matrix parallelResult(totalElements);

    initializeMatrix(matrixA, dimension);
    initializeMatrix(matrixB, dimension);

    std::cout << "Matrix dimension: "
              << dimension << " x " << dimension << "\n";

    double serialStart = omp_get_wtime();

    serialMatrixMultiplication(
        matrixA,
        matrixB,
        serialResult,
        dimension);

    double serialEnd = omp_get_wtime();

    double parallelStart = omp_get_wtime();

    parallelMatrixMultiplication(
        matrixA,
        matrixB,
        parallelResult,
        dimension);

    double parallelEnd = omp_get_wtime();

    double serialTime = serialEnd - serialStart;
    double parallelTime = parallelEnd - parallelStart;

    bool correct =
        verifyResults(serialResult, parallelResult);

    std::cout << std::fixed << std::setprecision(6);

    std::cout << "\nSerial execution time: "
              << serialTime << " seconds\n";

    std::cout << "Parallel execution time: "
              << parallelTime << " seconds\n";

    if (parallelTime > 0.0)
    {
        std::cout << "Speedup: "
                  << serialTime / parallelTime
                  << " times\n";
    }

    std::cout << "Verification: "
              << (correct ? "PASSED" : "FAILED")
              << "\n";

    return 0;
}