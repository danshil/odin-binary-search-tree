import Tree from './Tree';

const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
Tree.prettyPrint(tree.root);
console.log(tree.find(5));

// const tree2 = new Tree(2);
// tree2.insert(1);
// Tree.prettyPrint(tree2.root);

// const tree3 = new Tree([3, 5, 19, 20]);
// tree3.insert(4);
// Tree.prettyPrint(tree3.root);

// const blankTree1 = new Tree();
// blankTree1.insert(1);
// blankTree1.insert(1000);
// blankTree1.insert(2000);
// Tree.prettyPrint(blankTree1.root);

// const randomTree = new Tree();
// for (let i = 0; i < 200; i++) {
//   randomTree.insert(Math.floor(Math.random() * 100));
// }
// Tree.prettyPrint(randomTree.root);
// randomTree.find(33)
// randomTree.delete(33);
// Tree.prettyPrint(randomTree.root);
