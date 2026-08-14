class Solution {
public:
    int longestSubsequence(vector<int>& nums) {
        int n = nums.size();
        bool hasNoZero = false;
        int x = 0;
        for(auto it : nums){
            x ^= it;
            if(it != 0){
                hasNoZero = true;
            }
        }
        if(!hasNoZero){
            return 0;
        }
        if(x == 0) return n-1;
        else return n;


    }
};