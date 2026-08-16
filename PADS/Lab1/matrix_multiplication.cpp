#include <cmath>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <random>
#include <vector>

#include <omp.h>

using Matrix = std::vector<double>;

void initializeMatrix(Matrix& matrix)
{
    std::mt19937 generator(42);
    std::uniform_real_distribution<double> distribution(0.0, 10.0);

    for (double& value : matrix)
    {
        value = distribution(generator);
    }
}

void serialMatrixMultiplication(
    const Matrix& matrixA,
    const Matrix& matrixB,
    Matrix& result,
    int dimension
)
{
    std::fill(result.begin(), result.end(), 0.0);

    /*
     * Loop order i-k-j generally provides better cache performance
     * than the straightforward i-j-k order.
     */
    for (int i = 0; i < dimension; ++i)
    {
        for (int k = 0; k < dimension; ++k)
        {
            const double valueA = matrixA[i * dimension + k];

            for (int j = 0; j < dimension; ++j)
            {
                result[i * dimension + j] +=
                    valueA * matrixB[k * dimension + j];
            }
        }
    }
}

void parallelMatrixMultiplication(
    const Matrix& matrixA,
    const Matrix& matrixB,
    Matrix& result,
    int dimension
)
{
    std::fill(result.begin(), result.end(), 0.0);

    /*
     * Each thread processes different rows of the result matrix.
     * Therefore, threads do not modify the same result elements.
     */
    #pragma omp parallel for schedule(static)
    for (int i = 0; i < dimension; ++i)
    {
        for (int k = 0; k < dimension; ++k)
        {
            const double valueA = matrixA[i * dimension + k];

            for (int j = 0; j < dimension; ++j)
            {
                result[i * dimension + j] +=
                    valueA * matrixB[k * dimension + j];
            }
        }
    }
}

bool verifyResults(
    const Matrix& serialResult,
    const Matrix& parallelResult
)
{
    constexpr double tolerance = 1e-8;

    for (std::size_t i = 0; i < serialResult.size(); ++i)
    {
        if (std::fabs(serialResult[i] - parallelResult[i]) > tolerance)
        {
            std::cerr << "Mismatch at index " << i << '\n';
            return false;
        }
    }

    return true;
}

int main(int argc, char* argv[])
{
    int dimension = 100;

    if (argc >= 2)
    {
        dimension = std::atoi(argv[1]);
    }

    if (dimension <= 0)
    {
        std::cerr << "Error: matrix dimension must be positive.\n";
        return 1;
    }

    const std::size_t totalElements =
        static_cast<std::size_t>(dimension) * dimension;

    try
    {
        Matrix matrixA(totalElements);
        Matrix matrixB(totalElements);
        Matrix serialResult(totalElements);
        Matrix parallelResult(totalElements);

        initializeMatrix(matrixA);
        initializeMatrix(matrixB);

        std::cout << "Matrix dimension: " << dimension
                  << " x " << dimension << '\n';
        std::cout << "Number of OpenMP threads: "
                  << omp_get_max_threads() << "\n\n";

        double serialStart = omp_get_wtime();

        serialMatrixMultiplication(
            matrixA,
            matrixB,
            serialResult,
            dimension
        );

        double serialEnd = omp_get_wtime();
        double parallelStart = omp_get_wtime();

        parallelMatrixMultiplication(
            matrixA,
            matrixB,
            parallelResult,
            dimension
        );

        double parallelEnd = omp_get_wtime();

        const double serialTime = serialEnd - serialStart;
        const double parallelTime = parallelEnd - parallelStart;

        const bool correct =
            verifyResults(serialResult, parallelResult);

        std::cout << std::fixed << std::setprecision(6);

        std::cout << "Serial execution time:   "
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
                  << '\n';

        return correct ? 0 : 1;
    }
    catch (const std::bad_alloc&)
    {
        std::cerr << "Error: insufficient memory for dimension "
                  << dimension << ".\n";
        return 1;
    }
}
