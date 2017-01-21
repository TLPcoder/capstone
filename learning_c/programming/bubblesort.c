int main() {
    int array[] = {1000,2,8,4,2,9,7};
    int arrayPointer = *array;
    int length = sizeof(array) / sizeof(array[0]);
    printf("size of array %d\n", sizeof(array) / sizeof(array[0]));
    for (int i = 0; i < length; i++) {
        for(int j = 0; j < length; j++){
            if(array[i] > array[j]){
                int tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
        }
    }
    for (int print = 0; print < length; print++) {
        printf("%d\n", array[print]);
    }
    return 0;
}
