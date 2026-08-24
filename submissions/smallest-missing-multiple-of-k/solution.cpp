class Solution {
public:
    int missingMultiple(vector<int>& nums, int k) {
        int n= nums.size();
        unordered_map<int, int> mp;
        for(auto it : nums){
            mp[it]++;
        }
        for(int i=1;i<=n+1;i++){
            int multiple = k * i;
            if(mp[multiple] == 0){
                return multiple;
            }
        }
        return 1;
    }
};