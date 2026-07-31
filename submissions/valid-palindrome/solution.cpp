class Solution {
public:
    bool isPalindrome(string s) {
        string clean;
        for(char c : s){ 
            if(isalnum(c)) clean += tolower(c);
        }
        int i=0;
        int j = clean.length() - 1;
            while(i <= j){
                if(clean[i] == clean[j]){
                    i++;
                    j--;
                }
                else return false;
            }
            return true;
        
    }
};