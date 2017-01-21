#include<stdio.h>

struct golf {
    int score;
};

struct total {
    int total;
    struct golf hole;
} hole1, hole2, hole3, hole4, hole5, sum;

int main(void) {
    /* code */
    printf("what did you score on hole 1:");
    scanf("%d\n", &hole1.hole.score);
    hole1.total = hole1.hole.score;
    printf("your total score after 1 hole is: %d\n", hole1.total);

    printf("what did you hole.score on hole 2:");
    scanf("%d\n", &hole2.hole.score);
    hole2.total = hole1.total + hole2.hole.score;
    printf("your total score after 2 hole is: %d\n", hole2.total);

    printf("what did you hole.score on hole 3:");
    scanf("%d\n", &hole3.hole.score);
    hole3.total = hole2.total + hole3.hole.score;
    printf("your total score after 3 hole is: %d\n", hole3.total);

    printf("what did you hole.score on hole 4:");
    scanf("%d\n", &hole4.hole.score);
    hole4.total = hole3.total + hole4.hole.score;
    printf("your total score after 4 hole is: %d\n", hole4.total);

    printf("what did you hole.score on hole 5:");
    scanf("%d\n", &hole5.hole.score);
    sum.hole.score = hole1.hole.score + hole2.hole.score + hole3.hole.score + hole4.hole.score + hole5.hole.score;
    printf("You total score today after your round of gold was %d\n", sum.hole.score);
    return 0;
}
