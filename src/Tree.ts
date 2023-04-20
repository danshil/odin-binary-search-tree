import Node from './Node';

export default class Tree {
  root: Node;

  constructor(data?: number | Array<number>) {
    if (typeof data === 'number') {
      this.root = new Node(data);
    } else if (Array.isArray(data)) {
      this.buildTree(data);
    } else {
      this.root = null;
    }
  }

  buildTree(array: Array<number>) {
    const sortedArray = Tree.sortArray(array);

    const treeify = (
      array: Array<number>,
      start: number = 0,
      end: number = array.length - 1
    ): Node | null => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);

      if (mid === Math.floor((array.length - 1) / 2)) this.root = node;
      node.left = treeify(array, start, mid - 1);
      node.right = treeify(array, mid + 1, end);
      return node;
    };

    treeify(sortedArray);
  }

  insert(value: number) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    let node = null;
    let temp = this.root;
    while (temp) {
      if (temp.data > value) {
        node = temp;
        temp = temp.left;
      } else if (temp.data < value) {
        node = temp;
        temp = temp.right;
      } else {
        console.warn('@insert(): duplicate insert prevented');
        return;
      }
    }
    if (node.data > value) {
      node.left = new Node(value);
    } else {
      node.right = new Node(value);
    }
  }

  delete(value: number) {
    if (!this.root) {
      console.warn('@delete(): no root present');
      return;
    }
    let curr = this.root;
    let prev = null;
    let isLeft = true;
    while (curr) {
      if (curr.data > value) {
        prev = curr;
        curr = curr.left;
        isLeft = true;
      } else if (curr.data < value) {
        prev = curr;
        curr = curr.right;
        isLeft = false;
      } else {
        break;
      }
    }
    if (curr?.data !== value) {
      return;
    }
    // node is a leaf
    if (curr.left === null && curr.right === null) {
      isLeft ? (prev.left = null) : (prev.right = null);
    }
    // node has one child
    else if (curr.left === null) {
      isLeft ? (prev.left = curr.right) : (prev.right = curr.right);
    } else if (curr.right === null) {
      isLeft ? (prev.left = curr.left) : (prev.right = curr.left);
    }
    // node has two children

    console.log({ value, curr, prev, isLeft });
  }

  static sortArray(array: Array<number>): Array<number> {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  static prettyPrint(node: Node, prefix = '', isLeft = true): void {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}
