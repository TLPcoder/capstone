#include<stdio.h>

// void binarySearch(int array[]){
//     printf("%d\n", array);
//
// }
void swap(int array[], int i, int j) {
    /* code */
    printf("%d\n", array);
    int tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

int main() {
    /* code */
    int array[] = {1,2,3,4,5,6,7,8,9};
    swap(&array, 0, 8);
    printf("%d\n", array);
    printf("should be 9 %d\n", array[0]);
    printf("should be 1 %d\n", array[8]);
    return 0;
}
