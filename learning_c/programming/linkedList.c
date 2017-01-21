#include<stdio.h>
#include<stdlib.h>

struct node {
    int val;
    struct node * next;
};

struct linkedList {
    struct node * head;
    struct node * tail;
    int length;
};

int push(int value, struct linkedList *list){
    if((*list).head == NULL){
        struct node *nodePtr;
        nodePtr = (struct node *)malloc(sizeof(struct node));
        //nodePtr = &newNode;
        nodePtr->val = value;
        nodePtr->next = NULL;
        (*list).head = nodePtr;
        (*list).tail = nodePtr;
        list->length += 1;
    }else{
        struct node *nodePtr;
        nodePtr = (struct node *)malloc(sizeof(struct node));
        nodePtr->val = value;
        nodePtr->next = NULL;
        list->tail->next = nodePtr;
        list->tail = nodePtr;
        list->length += 1;
    }
    //printf("%d\n", (*list).tail);
    return 0;
};


int pop(struct linkedList *list){
    struct node *current, *next;
    current = list->head;
    next = list->head->next->next;
    for(int i = 0; i < list->length; i++){
        if(next == NULL){
            current->next = NULL;
            list->tail = current;
            list->length -= 1;
            break;
        }else{
            current = current->next;
            next = next->next;
        }
    }
};

int shift(struct linkedList *list){
    struct node *oldHead, *newHead;
    oldHead = list->head;
    newHead = list->head->next;
    oldHead->next = NULL;
    list->head = newHead;
    list->length -= 1;
};

struct node *_getNode(int value, struct linkedList *list){
    struct node *current, *notFound;
    char notHere[] = "not found";
    current = list->head;
    for(int i = 0; i < list->length;i++){
        if(current->val == value){
            return current;
        }else{
            current = current->next;

        }
    }
    printf("didnt work\n");
    return notFound;
}

int unshift(int value, struct linkedList *list){
    if((*list).head == NULL){
        struct node *nodePtr;
        nodePtr = (struct node *)malloc(sizeof(struct node));
        nodePtr->val = value;
        nodePtr->next = NULL;
        (*list).head = nodePtr;
        (*list).tail = nodePtr;
        list->length += 1;
    }else{
        struct node *nodePtr;
        nodePtr = (struct node *)malloc(sizeof(struct node));
        nodePtr->val = value;
        nodePtr->next = list->head;
        list->head = nodePtr;
        list->length += 1;
    }
    //printf("%d\n", (*list).tail);
    return 0;
};

int insert(int index, int value, struct linkedList *list){
    struct node *prev, *current, *next, *new;
    prev = list->head;
    current = list->head->next;
    new = (struct node *)malloc(sizeof(struct node));
    new->val = value;
    for(int i = 0; i < index; i++){
        if(i == index - 1){
            prev->next = new;
            new->next = current;
            printf("hello\n");
        }else{
            prev = prev->next;
            current = current->next;
        }
    }
}

int count(struct linkedList *list){
    printf("length count %d\n", list->length);
    return list->length;
}

int main(void) {
    /* code */
    struct linkedList *ptr, myList;
    ptr = &myList;
    //unshift(20, ptr);
    push(1, &myList);
    push(3, &myList);
    push(4, &myList);
    push(6, &myList);
    count(&myList);
    insert(1,2,&myList);
    //struct node *getNode = _getNode(6, &myList);
    printf("somethingasdfsdfa %d\n", _getNode(7, &myList));
    // unshift(9, &myList);
    // unshift(10, &myList);
    //_getNode(6, ptr);
    printf("head %d\ntail %d", myList.head->next->val,  myList.tail->val);
    return 0;
}
