class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        int mx = 0;
        unordered_set<int> mp;

        for (auto it : nums)
            mp.insert(it);

        for (auto it : mp) {

            if (mp.find(it - 1) == mp.end()) {

                int count = 1;
                int current = it;

                while (mp.find(current + 1) != mp.end()) {
                    current++;
                    count++;
                }

                mx = max(mx, count);
            }
        }

        return mx;

    }
};