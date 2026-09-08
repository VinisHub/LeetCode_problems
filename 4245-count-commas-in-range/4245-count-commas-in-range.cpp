class Solution {
public:
    int countCommas(int n) {
        int cms = 0;
        int digits = 0;
        int ori = n;

        while(ori > 0){
            digits++;
            ori /= 10;
        }

        if(digits <= 3) return 0;
        else return (n - 1000) + 1;
    }
};