class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int n = nums.size();
        int temp;
        for(int i = n-2;i>=0;i--){
            if(nums[i] == 0){
                for(int j=i;j<n-1;j++){
                    temp = nums[j];
                    nums[j] = nums[j+1];
                    nums[j+1] = temp;
                }
            }
        }
    }
};