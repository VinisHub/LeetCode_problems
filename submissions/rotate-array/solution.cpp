class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        vector<int> temp;
        int n = nums.size();
        k = k % n;
        // for(int i=n-k;i<n;i++){
        //     temp.push_back(nums[i]);
        // }    
        // for(int j=0;j<=k;j++){
        //     nums[n-j-1] = nums[n-j-1-k];
        // }
        // for(int l = 0;l<k;l++){
        //     nums[l] = temp[l];
        // }
        for (int i = n - k; i < n; i++) {
            temp.push_back(nums[i]);
        }

        // Shift remaining elements right
        for (int i = n - k - 1; i >= 0; i--) {
            nums[i + k] = nums[i];
        }

        // Put last k elements at front
        for (int i = 0; i < k; i++) {
            nums[i] = temp[i];
        }
        
    }
};