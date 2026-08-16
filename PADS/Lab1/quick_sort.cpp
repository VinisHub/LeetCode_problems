#include <algorithm>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <random>
#include <vector>

#include <omp.h>

constexpr int TASK_CUTOFF = 10000;
constexpr int INSERTION_SORT_CUTOFF = 32;

void insertionSort(
    std::vector<int>& values,
    int low,
    int high
)
{
    for (int i = low + 1; i <= high; ++i)
    {
        const int current = values[i];
        int j = i - 1;

        while (j >= low && values[j] > current)
        {
            values[j + 1] = values[j];
            --j;
        }

        values[j + 1] = current;
    }
}

int partitionValues(
    std::vector<int>& values,
    int low,
    int high
)
{
    const int middle = low + (high - low) / 2;

    /*
     * Median-of-three ordering improves pivot selection compared
     * with always choosing the first or last element.
     */
    if (values[middle] < values[low])
    {
        std::swap(values[middle], values[low]);
    }

    if (values[high] < values[low])
    {
        std::swap(values[high], values[low]);
    }

    if (values[high] < values[middle])
    {
        std::swap(values[high], values[middle]);
    }

    std::swap(values[middle], values[high - 1]);

    const int pivot = values[high - 1];

    int left = low;
    int right = high - 1;

    while (true)
    {
        while (values[++left] < pivot)
        {
        }

        while (values[--right] > pivot)
        {
        }

        if (left >= right)
        {
            break;
        }

        std::swap(values[left], values[right]);
    }

    std::swap(values[left], values[high - 1]);

    return left;
}

void serialQuickSort(
    std::vector<int>& values,
    int low,
    int high
)
{
    if (low >= high)
    {
        return;
    }

    if (high - low + 1 <= INSERTION_SORT_CUTOFF)
    {
        insertionSort(values, low, high);
        return;
    }

    const int pivotIndex =
        partitionValues(values, low, high);

    serialQuickSort(values, low, pivotIndex - 1);
    serialQuickSort(values, pivotIndex + 1, high);
}

void parallelQuickSortTask(
    std::vector<int>& values,
    int low,
    int high
)
{
    if (low >= high)
    {
        return;
    }

    const int partitionSize = high - low + 1;

    if (partitionSize <= TASK_CUTOFF)
    {
        serialQuickSort(values, low, high);
        return;
    }

    const int pivotIndex =
        partitionValues(values, low, high);

    #pragma omp task shared(values) firstprivate(low, pivotIndex)
    {
        parallelQuickSortTask(
            values,
            low,
            pivotIndex - 1
        );
    }

    #pragma omp task shared(values) firstprivate(high, pivotIndex)
    {
        parallelQuickSortTask(
            values,
            pivotIndex + 1,
            high
        );
    }

    #pragma omp taskwait
}

void parallelQuickSort(std::vector<int>& values)
{
    #pragma omp parallel
    {
        #pragma omp single
        {
            parallelQuickSortTask(
                values,
                0,
                static_cast<int>(values.size()) - 1
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

    std::cout << "Number of elements: "
              << numberOfElements << '\n';

    std::cout << "OpenMP threads: "
              << omp_get_max_threads() << "\n\n";

    double serialStart = omp_get_wtime();

    serialQuickSort(
        serialValues,
        0,
        numberOfElements - 1
    );

    double serialEnd = omp_get_wtime();

    double parallelStart = omp_get_wtime();

    parallelQuickSort(parallelValues);

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

    std::cout << "Serial quick sort time:   "
              << serialTime << " seconds\n";

    std::cout << "Parallel quick sort time: "
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
