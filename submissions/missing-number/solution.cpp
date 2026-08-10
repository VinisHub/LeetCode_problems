class Solution {
public:
    int missingNumber(vector<int>& nums) {
        map<int, int> mpp;
        for(auto it : nums)
            mpp[it]++; 
        
        int ans = 0;
        for(int i=0;i<=nums.size();i++)
            if(mpp[i] == 0) ans = i;
        
        return ans;
    }
};