class Solution {
public:
    string intToRoman(int num) {
        unordered_map<int, string> mp = {
            {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
            {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
            {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}
        };
        vector<int> order = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        
        string result = "";
        for (int val : order) {
            while (num >= val) {
                num -= val;
                result += mp[val];   // O(1) average lookup
            }
        }
        return result;
    }
};