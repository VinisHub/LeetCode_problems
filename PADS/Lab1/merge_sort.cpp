#include <algorithm>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <random>
#include <vector>

#include <omp.h>

constexpr int TASK_CUTOFF = 10000;

void merge(
    std::vector<int>& values,
    std::vector<int>& temporary,
    int left,
    int middle,
    int right
)
{
    int leftIndex = left;
    int rightIndex = middle;
    int outputIndex = left;

    while (leftIndex < middle && rightIndex < right)
    {
        if (values[leftIndex] <= values[rightIndex])
        {
            temporary[outputIndex++] = values[leftIndex++];
        }
        else
        {
            temporary[outputIndex++] = values[rightIndex++];
        }
    }

    while (leftIndex < middle)
    {
        temporary[outputIndex++] = values[leftIndex++];
    }

    while (rightIndex < right)
    {
        temporary[outputIndex++] = values[rightIndex++];
    }

    for (int i = left; i < right; ++i)
    {
        values[i] = temporary[i];
    }
}

void serialMergeSort(
    std::vector<int>& values,
    std::vector<int>& temporary,
    int left,
    int right
)
{
    if (right - left <= 1)
    {
        return;
    }

    const int middle = left + (right - left) / 2;

    serialMergeSort(values, temporary, left, middle);
    serialMergeSort(values, temporary, middle, right);

    merge(values, temporary, left, middle, right);
}

void parallelMergeSortTask(
    std::vector<int>& values,
    std::vector<int>& temporary,
    int left,
    int right
)
{
    if (right - left <= 1)
    {
        return;
    }

    if (right - left <= TASK_CUTOFF)
    {
        serialMergeSort(values, temporary, left, right);
        return;
    }

    const int middle = left + (right - left) / 2;

    #pragma omp task shared(values, temporary) firstprivate(left, middle)
    {
        parallelMergeSortTask(
            values,
            temporary,
            left,
            middle
        );
    }

    #pragma omp task shared(values, temporary) firstprivate(middle, right)
    {
        parallelMergeSortTask(
            values,
            temporary,
            middle,
            right
        );
    }

    #pragma omp taskwait

    merge(values, temporary, left, middle, right);
}

void parallelMergeSort(std::vector<int>& values)
{
    std::vector<int> temporary(values.size());

    #pragma omp parallel
    {
        #pragma omp single
        {
            parallelMergeSortTask(
                values,
                temporary,
                0,
                static_cast<int>(values.size())
            );
        }
    }
}

std::vector<int> generateRandomValues(int count)
{
    std::vector<int> values(count);

    std::mt19937 generator(42);
    std::uniform_int_distribution<int> distribution(
        0,
        1'000'000
    );

    for (int& value : values)
    {
        value = distribution(generator);
    }

    return values;
}

int main(int argc, char* argv[])
{
    int numberOfElements = 1'000'000;

    if (argc >= 2)
    {
        numberOfElements = std::atoi(argv[1]);
    }

    if (numberOfElements <= 0)
    {
        std::cerr << "Error: N must be positive.\n";
        return 1;
    }

    std::vector<int> original =
        generateRandomValues(numberOfElements);

    std::vector<int> serialValues = original;
    std::vector<int> parallelValues = original;

    std::vector<int> serialTemporary(numberOfElements);

    std::cout << "Number of elements: "
              << numberOfElements << '\n';

    std::cout << "OpenMP threads: "
              << omp_get_max_threads() << "\n\n";

    double serialStart = omp_get_wtime();

    serialMergeSort(
        serialValues,
        serialTemporary,
        0,
        numberOfElements
    );

    double serialEnd = omp_get_wtime();

    double parallelStart = omp_get_wtime();

    parallelMergeSort(parallelValues);

    double parallelEnd = omp_get_wtime();

    const double serialTime = serialEnd - serialStart;
    const double parallelTime = parallelEnd - parallelStart;

    const bool serialSorted =
        std::is_sorted(serialValues.begin(), serialValues.end());

    const bool parallelSorted =
        std::is_sorted(parallelValues.begin(), parallelValues.end());

    const bool identical =
        serialValues == parallelValues;

    std::cout << std::fixed << std::setprecision(6);

    std::cout << "Serial merge sort time:   "
              << serialTime << " seconds\n";

    std::cout << "Parallel merge sort time: "
              << parallelTime << " seconds\n";

    if (parallelTime > 0.0)
    {
        std::cout << "Speedup: "
                  << serialTime / parallelTime
                  << " times\n";
    }

    std::cout << "Serial sorted: "
              << (serialSorted ? "YES" : "NO") << '\n';

    std::cout << "Parallel sorted: "
              << (parallelSorted ? "YES" : "NO") << '\n';

    std::cout << "Results identical: "
              << (identical ? "YES" : "NO") << '\n';

    return serialSorted && parallelSorted && identical ? 0 : 1;
}
