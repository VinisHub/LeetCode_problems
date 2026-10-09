class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int low = *max_element(weights.begin(), weights.end());
        int high;
        int sum = 0;
        for(int i=0;i<weights.size();i++){
            sum += weights[i];
        }
        high = sum;
        while(low <= high){
            int mid = low + (high - low)/2;
            int cntDays = Days(weights, mid);
            if(cntDays <= days) high = mid - 1;
            else low = mid + 1;
        }
        return low;
    }
    int Days(vector<int>& w, int cap){
        int days = 1, load = 0;
        for(int i=0;i<w.size();i++){
            if(w[i] + load > cap){
                days++;
                load = w[i];
            }
            else load += w[i];
        }
        return days;
    }
};