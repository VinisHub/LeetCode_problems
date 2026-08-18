class Solution {
public:
    int largestInteger(vector<int>& nums, int k) {
        unordered_map<int, int> mpp;
        int n = nums.size();

        for (int i = 0; i <= n - k; i++) {
            unordered_set<int> seen;

            for (int j = i; j < i + k; j++) {
                seen.insert(nums[j]);
            }

            for (int x : seen) {
                mpp[x]++;
            }
        }

        int ans = -1;

        for (auto &[x, count] : mpp) {
            if (count == 1) {
                ans = max(ans, x);
            }
        }

        return ans;
    }
};