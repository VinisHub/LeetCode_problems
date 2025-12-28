/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
void inorder(struct TreeNode* root, int* arr, int* index) {
    if (root == NULL) return;

    inorder(root->left, arr, index);
    arr[(*index)++] = root->val;
    inorder(root->right, arr, index);
}

int* inorderTraversal(struct TreeNode* root, int* returnSize) {
    // inorder traversal = left -> root -> right
    int* arr = (int*)malloc(100 * sizeof(int)); // max nodes ≤ 100
    *returnSize = 0;

    inorder(root, arr, returnSize);

    return arr;
}




