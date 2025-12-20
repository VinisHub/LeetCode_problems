/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* deleteDuplicates(struct ListNode* head) {
    struct ListNode* curr = head;

    while (curr != NULL && curr->next != NULL) {
        if (curr->val == curr->next->val) {
            struct ListNode* dup = curr->next;
            curr->next = dup->next;
            free(dup);
        } else {
            curr = curr->next;
        }
    }

    return head;
}