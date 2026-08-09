class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> ans;
        int temp ,j = 1;
        for(int i=0;i<nums.size()-1;i++){
            temp = target - nums[i];
            j = i + 1;
            while(j < nums.size()){
                if(nums[j]  == temp) {
                    ans.push_back(i);
                    ans.push_back(j);
                }
                j++;
            }
        }
        return ans;
    }
};