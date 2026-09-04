class Solution {
public:
    int firstStableIndex(vector<int>& nums, int k) {
        int n = nums.size();

        vector<int> minFromIdx(n);
        int minelt = INT_MAX;
        for(int i = n-1;i>=0;i--){
            minelt = min(minelt, nums[i]);
            minFromIdx[i] = minelt;
        }
        int maxelt = INT_MIN;
        for(int i=0;i<n;i++){
            maxelt = max(maxelt, nums[i]);

            if(maxelt - minFromIdx[i] <= k){
                return i;
            }

        }
        return -1;
    }
};