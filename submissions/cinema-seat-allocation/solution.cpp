class Solution {
public:
    int maxNumberOfFamilies(int n, vector<vector<int>>& reservedSeats) {
        unordered_map<int, unordered_set<int>> reserved;

        // Store reserved seats by row
        for (auto &seat : reservedSeats) {
            reserved[seat[0]].insert(seat[1]);
        }

        int ans = 0;

        // Rows with no reservations can fit 2 groups
        ans = (n - reserved.size()) * 2;

        // Process only rows that contain reservations
        for (auto &[row, seats] : reserved) {
            bool left = true;   // 2,3,4,5
            bool middle = true; // 4,5,6,7
            bool right = true;  // 6,7,8,9

            for (int s : {2, 3, 4, 5}) {
                if (seats.count(s)) {
                    left = false;
                    break;
                }
            }

            for (int s : {4, 5, 6, 7}) {
                if (seats.count(s)) {
                    middle = false;
                    break;
                }
            }

            for (int s : {6, 7, 8, 9}) {
                if (seats.count(s)) {
                    right = false;
                    break;
                }
            }

            if (left && right) {
                ans += 2;
            } else if (left || middle || right) {
                ans += 1;
            }
        }

        return ans;
    }
};