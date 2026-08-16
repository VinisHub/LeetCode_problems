#include <stdio.h>
#include <omp.h>

int main(void)
{
    #pragma omp parallel
    {
        #pragma omp single
        {
            int number_of_threads = omp_get_num_threads();

            printf("Number of threads: %d\n", number_of_threads);
        }
    }

    return 0;
}
