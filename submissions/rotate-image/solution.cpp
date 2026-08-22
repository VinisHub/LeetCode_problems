class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int row = matrix.size();
        int col = matrix[0].size();
        vector<vector<int>> NewMatrix(row, vector<int>(col));
        for(int i=0;i<row;i++){
            for(int j=0;j<col;j++){
                NewMatrix[i][j] = matrix[row-j-1][i];
            }
        }
        for(int i=0;i<row;i++){
            for(int j=0;j<col;j++){
                matrix[i][j] = NewMatrix[i][j];
            }
        }


    }
};