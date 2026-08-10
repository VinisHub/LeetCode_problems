class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        int low = 0;
        int high = n-1;
        int mid;
        while(low <= high){
            mid= low + (high - low) / 2;
            if(mid == nums[mid]) low = mid + 1;
            else high = mid - 1;
        }
        return low;
    }
};