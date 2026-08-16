#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

int main(int argc, char *argv[])
{
    long long k = 10;

    if (argc >= 2)
    {
        k = atoll(argv[1]);
    }

    if (k <= 0)
    {
        fprintf(stderr, "Error: k must be greater than zero.\n");
        return 1;
    }

    printf("Value of k: %lld\n\n", k);

    /* Sequential execution */
    double sequential_start = omp_get_wtime();

    for (long long i = 0; i < k; i++)
    {
        printf("Sequential: Hello World, iteration %lld\n", i);
    }

    double sequential_end = omp_get_wtime();
    double parallel_start = omp_get_wtime();

    #pragma omp parallel for
    for (long long i = 0; i < k; i++)
    {
        int thread_id = omp_get_thread_num();

        printf(
            "Parallel: Hello World, iteration %lld, thread %d\n",
            i,
            thread_id
        );
    }

    double parallel_end = omp_get_wtime();

    double sequential_time = sequential_end - sequential_start;
    double parallel_time = parallel_end - parallel_start;

    printf("\nSequential execution time: %.9f seconds\n",
           sequential_time);

    printf("Parallel execution time:   %.9f seconds\n",
           parallel_time);

    if (parallel_time > 0.0)
    {
        printf("Speedup: %.4f\n", sequential_time / parallel_time);
    }

    return 0;
}
