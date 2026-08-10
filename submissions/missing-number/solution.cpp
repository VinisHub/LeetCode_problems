class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int sum = 0;
        int n = nums.size();
        
        for(auto i : nums) sum += i;
        
        int actS = n*(n + 1)/2;

        return actS-sum;
    }
};