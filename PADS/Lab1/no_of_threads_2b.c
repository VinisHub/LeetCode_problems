#include<stdio.h>
#include<omp.h>

int main(){
    printf("Number of threads: %d\n", omp_get_num_threads());
    return 0;   
}