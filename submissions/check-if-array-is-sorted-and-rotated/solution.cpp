class Solution {
public:
    bool check(vector<int>& nums) {
        vector<int> b, sorted = nums;
        int x;
        sort(sorted.begin(), sorted.end());
        for(int i=0;i<nums.size();i++){
            x = i;
            for(int j=0;j<nums.size();j++){
                b.push_back(nums[(j+x) % nums.size()]);
            }
            if(sorted == b) return true;
            b.clear();
        }
        return false;
    }
};