#include<math.h>
bool isPalindrome(int x) {
    int num = x;
    int ori = x;

    //if x is negative return false
    if(x < 0) return false;
    //find no of digits
    int digits = 0;
    while(num != 0){
        num = num/10;
        digits++;
    }
    int reverse = 0;
    while(x != 0){
        reverse += (x % 10) * pow(10, --digits);
        x /= 10;
    }
    if(ori == reverse){
        return true;
    }
    else return false;
}