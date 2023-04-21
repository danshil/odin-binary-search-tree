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

  delete(value: number, root = this.root) {
    if (!root) {
      return root;
    }
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      if (!root.left) return root.right;
      else if (!root.right) return root.left;
      root.data = minValue(root.right);
      root.right = this.delete(root.data, root.right);
    }
    return root;

    function minValue(root: Node) {
      let minv = root.data;
      while (root.left != null) {
        minv = root.left.data;
        root = root.left;
      }
      return minv;
    }
  }

  find(value: number, root = this.root): Node {
    if (!root) return null;
    else if (root.data === value) return root;
    else if (root.data < value) return this.find(value, root.right);
    else if (root.data > value) return this.find(value, root.left);
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
