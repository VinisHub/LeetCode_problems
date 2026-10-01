class Solution {
public:

    bool possible(vector<int>& bd, int day, int m, int k) {
        int cnt = 0;
        int flowers = 0;

        for (int i = 0; i < bd.size(); i++) {
            if (bd[i] <= day) {
                flowers++;

                if (flowers == k) {
                    cnt++;
                    flowers = 0;
                }
            } else {
                flowers = 0;
            }
        }

        return cnt >= m;
    }

    int minDays(vector<int>& bloomDay, int m, int k) {

        long long required = 1LL * m * k;

        if (required > bloomDay.size())
            return -1;

        int low = 1;
        int high = *max_element(bloomDay.begin(), bloomDay.end());

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (possible(bloomDay, mid, m, k)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }

        return low;
    }
};