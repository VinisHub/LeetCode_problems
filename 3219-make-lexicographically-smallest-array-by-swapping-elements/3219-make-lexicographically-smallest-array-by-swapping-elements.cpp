class Solution {
public:
    vector<int> lexicographicallySmallestArray(vector<int>& nums, int limit) {
        
        // Each group will contain numbers that can be swapped
        vector<deque<int>> groups;
        
        // Maps a number -> which group it belongs to
        unordered_map<int, int> numToGroup;
        
        // Sort a copy of nums
        vector<int> sortedNums = nums;
        sort(sortedNums.begin(), sortedNums.end());
        
        // Build the groups
        for (int n : sortedNums) {
            
            // Start a new group if:
            // 1. There are no groups yet
            // 2. Difference from previous number > limit
            if (groups.empty() ||
                abs(n - groups.back().back()) > limit) {
                
                groups.push_back(deque<int>());
            }
            
            // Add number to the current group
            groups.back().push_back(n);
            
            // Remember which group this number belongs to
            numToGroup[n] = groups.size() - 1;
        }
        
        // Build the answer
        vector<int> result;
        
        for (int n : nums) {
            
            // Find the group containing n
            int groupIndex = numToGroup[n];
            
            // Take the smallest remaining number
            result.push_back(groups[groupIndex].front());
            
            // Remove it from the group
            groups[groupIndex].pop_front();
        }
        
        return result;
    }
};