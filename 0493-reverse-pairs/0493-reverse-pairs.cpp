class Solution {
public:
    int count = 0;
    void merge(vector<int>& nums, int low, int mid, int high) {
        // Create temp numsays
        vector<int> temp;
        int left = low, right = mid + 1;

        // Merge two sorted halves
        while (left <= mid && right <= high) {
            if (nums[left] <= nums[right])
                temp.push_back(nums[left++]);
            else
                temp.push_back(nums[right++]);
        }

        // Copy remaining elements from left half
        while (left <= mid)
            temp.push_back(nums[left++]);

        // Copy remaining elements from right half
        while (right <= high)
            temp.push_back(nums[right++]);

        // Copy sorted elements back to original array
        for (int i = low; i <= high; i++)
            nums[i] = temp[i - low];
    }
    void countPairs(vector<int>& nums, int low, int mid, int high){
        int right = mid + 1;
        for(int i =low;i<=mid;i++){
            while(right <= high && nums[i] > 2LL * nums[right]) right++;
            count += right - (mid+1);
        }
    }
    // Recursive merge sort function
    void mergeSort(vector<int>& nums, int low, int high) {
        if (low >= high)
            return;

        // Find the middle index
        int mid = (low + high) / 2;

        // Recursively sort left half
        mergeSort(nums, low, mid);

        // Recursively sort right half
        mergeSort(nums, mid + 1, high);

        countPairs(nums, low, mid, high);
        // Merge the two sorted halves
        merge(nums, low, mid, high);
    }

    int reversePairs(vector<int>& nums) {
        int n = nums.size();
        mergeSort(nums, 0, n-1);
        return count;
    }
};