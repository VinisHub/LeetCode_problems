class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        int k = n;
        vector<int> temp;
        for(int i=0;i<n;i++){
            temp.push_back(nums[i]);
            temp.push_back(nums[n+i]);
        }
        return temp;
    }
};