class Solution {
public:
    int firstStableIndex(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> minIdx(n);
        int minA = INT_MAX;
        for(int i = n-1;i>=0;i--){
            minA = min(minA, nums[i]);
            minIdx[i] = minA;
        }
        int MaxA = INT_MIN;
        for(int i =0;i<n;i++){
            MaxA = max(MaxA, nums[i]);
            if(MaxA - minIdx[i] <= k){
                return i;
            }
        }
        return -1;

    }
};