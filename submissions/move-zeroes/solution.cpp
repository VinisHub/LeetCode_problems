class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int n = nums.size();
        int temp;
        vector<int> mpp(n, 0);
        for(int i=0;i<n;i++){
            if(nums[i] == 0){
                mpp[i] = 1;
            }
        }
        for(int j=n-1;j>=0;j--){
            if(mpp[j] == 1){
                int p = j;
                while(p<n-1){
                nums[p] = nums[p+1];
                p++;
                }
                nums[p] = 0;
            }
        }    
    }
};