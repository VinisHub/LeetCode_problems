class Solution {
public:
    int mostFrequentEven(vector<int>& nums) {
        map<int, int> mpp;
        for(int i=0;i<nums.size();i++){
            if(nums[i] % 2 == 0) mpp[nums[i]]++;
        }
        int mxfreq = 0, ans = 0;
        for(auto it : mpp){
            if(mxfreq < it.second){
                mxfreq = it.second;
                ans = it.first;
            }
            if(mxfreq == it.second){
                ans = min(it.first, ans);
            }
        }
        if(mpp.empty()) return -1;
        return ans;
    }
};