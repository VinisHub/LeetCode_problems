class Solution {
public:
    int missingInteger(vector<int>& nums) {
        int sum = nums[0];
        int n = nums.size();
        int i = 1;
        while(i < n && nums[i] == nums[i-1] + 1){
            sum += nums[i];
            i++;
        }
        unordered_set<int> st(nums.begin(), nums.end());
        while(st.count(sum)){
            sum++;
        }
        return sum;

    }
};