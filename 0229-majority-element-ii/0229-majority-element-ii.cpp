class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        unordered_map<int, int> mp;
        vector<int> ans;
        for(auto it : nums){
            mp[it]++;
        }
        int threshold = nums.size()/3;
        
        for (auto const& pair : mp) {
            int elt = pair.first;
            int count = pair.second;

            if(count > threshold) ans.push_back(elt);
        }
        return ans;

    }
};