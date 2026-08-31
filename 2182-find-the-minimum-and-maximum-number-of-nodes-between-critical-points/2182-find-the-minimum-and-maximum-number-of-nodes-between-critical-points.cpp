class Solution {
public:
    vector<int> nodesBetweenCriticalPoints(ListNode* head) {
        
        vector<int> ans = {-1, -1};

        ListNode* previous = head;
        ListNode* current = head->next;

        int position = 1;
        int first = -1;
        int last = -1;
        int minDistance = INT_MAX;

        while (current->next != NULL) {

            // Check if current is a critical point
            if ((current->val > previous->val && 
                 current->val > current->next->val) ||
                
                (current->val < previous->val && 
                 current->val < current->next->val)) {

                // First critical point
                if (first == -1) {
                    first = position;
                }
                else {
                    minDistance = min(minDistance, position - last);
                }

                // Update last critical point
                last = position;
            }

            previous = current;
            current = current->next;
            position++;
        }

        // Less than 2 critical points
        if (first == -1 || first == last) {
            return {-1, -1};
        }

        int maxDistance = last - first;

        return {minDistance, maxDistance};
    }
};