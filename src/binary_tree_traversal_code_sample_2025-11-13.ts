class TreeNode<T> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    constructor(val: T) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function inorderTraversal<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    function traverse(node: TreeNode<T> | null) {
        if (!node) return;
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    }
    traverse(root);
    return result;
}

function preorderTraversal<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    function traverse(node: TreeNode<T> | null) {
        if (!node) return;
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
    }
    traverse(root);
    return result;
}

function postorderTraversal<T>(root: TreeNode<T> | null): T[] {
    const result: T[] = [];
    function traverse(node: TreeNode<T> | null) {
        if (!node) return;
        traverse(node.left);
        traverse(node.right);
        result.push(node.val);
    }
    traverse(root);
    return result;
}

// Example Usage:
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log("Inorder:", inorderTraversal(root));
console.log("Preorder:", preorderTraversal(root));
console.log("Postorder:", postorderTraversal(root));