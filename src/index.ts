import Tree from './Tree';

const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
Tree.prettyPrint(tree.root);
console.log(tree.depth(tree.find(8)));
// console.log(tree.levelOrder());
// console.log(tree.levelOrderRecursive());

// const tree1 = new Tree();
// tree1.buildTree([25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90]);
// Tree.prettyPrint(tree1.root);
// console.log(tree1.preorder());
// console.log(tree1.inorder());
// console.log(tree1.postorder());
// console.log(tree1.isBalanced());

// const tree2 = new Tree(2);
// tree2.insert(1);
// Tree.prettyPrint(tree2.root);

// const tree3 = new Tree([3, 5, 19, 20]);
// tree3.insert(4);
// Tree.prettyPrint(tree3.root);

// const blankTree1 = new Tree();
// blankTree1.insert(5);
// blankTree1.insert(1000);
// blankTree1.insert(2000);
// blankTree1.insert(3000);
// blankTree1.insert(4000);
// blankTree1.insert(2500);
// blankTree1.insert(2499);
// blankTree1.insert(2498);
// blankTree1.insert(2);
// Tree.prettyPrint(blankTree1.root);

const log = (string: any): void => console.log(string);

const randomTree = new Tree(randomNumbers());
// Tree.prettyPrint(randomTree.root);
// log(randomTree.isBalanced())
// log(randomTree.levelOrder())
// log(randomTree.preorder())
// log(randomTree.postorder())
// log(randomTree.inorder())
for (let i = 0; i < 200; i++) {
  randomTree.insert(Math.floor(Math.random() * 1000));
}
log(randomTree.height(randomTree.root));
log(randomTree.isBalanced());
randomTree.rebalance();
log(randomTree.isBalanced());
log(randomTree.height(randomTree.root));
log(randomTree.levelOrder());
log(randomTree.preorder());
log(randomTree.postorder());
log(randomTree.inorder());

function randomNumbers(d = 100, n = 20) {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(Math.floor(Math.random() * 10 * d));
  }
  return array;
}
