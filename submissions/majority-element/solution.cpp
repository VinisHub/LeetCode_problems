class Solution {
public:
    int majorityElement(vector<int>& nums) {
        unordered_map<int, int> mpp;
        int i = 0;
        while(i < nums.size()){
            mpp[nums[i]]++;
            i++;
        }
        int ans = 0, maxfreq = 0;
        for(auto it : mpp){
            if(it.second > maxfreq){
                 maxfreq = it.second;
                 ans = it.first;

            } 
        }
        return ans;
    }
};