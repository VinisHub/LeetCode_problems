class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string> str;
        for(int num : nums){
            str.push_back(to_string(num));
        }
        sort(str.begin(), str.end(), [](string a ,string b){
            return a + b > b + a;
        });
        if(str[0] == "0") return "0";

        string ans = "";
        for(string s : str){
            ans += s;
        }
         return ans;
    }
};