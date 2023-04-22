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
    const sortedArray = this.sortArray(array);
    this.treeify(sortedArray);
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

  levelOrder(callback = this.returnData) {
    const queue: Array<Node> = [this.root];
    const ordered: Array<Node> = [];

    while (queue[0]) {
      const node = queue[0];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      ordered.push(queue.shift());
    }
    return callback(ordered);
  }

  levelOrderRecursive(callback = this.returnData) {
    const recursion = (
      queue: Array<Node> = [this.root],
      ordered: Array<Node> = []
    ): Array<Node> => {
      const node: Node = queue.shift();
      if (!node) return ordered;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      ordered.push(node);
      return recursion(queue, ordered);
    };
    return callback(recursion());
  }

  preorder(callback = this.returnData) {
    const iter = (node = this.root, order: Array<Node> = []): Array<Node> => {
      if (!node) return order;
      order.push(node);
      if (node.left) iter(node.left, order);
      if (node.right) iter(node.right, order);
      return order;
    };
    return callback(iter());
  }

  inorder(callback = this.returnData) {
    const iter = (node = this.root, order: Array<Node> = []): Array<Node> => {
      if (!node) return order;
      if (node.left) iter(node.left, order);
      order.push(node);
      if (node.right) iter(node.right, order);
      return order;
    };
    return callback(iter());
  }

  postorder(callback = this.returnData) {
    const iter = (node = this.root, order: Array<Node> = []): Array<Node> => {
      if (!node) return order;
      if (node.left) iter(node.left, order);
      if (node.right) iter(node.right, order);
      order.push(node);
      return order;
    };
    return callback(iter());
  }

  depth(value: Node, root = this.root): number {
    if (!root || !value) return -1;
    let counter = -1;
    if (
      value === root ||
      (counter = this.depth(value, root.left)) >= 0 ||
      (counter = this.depth(value, root.right)) >= 0
    )
      return counter + 1;
    return counter;
  }

  height(node: Node): number {
    if (!node) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced(): boolean {
    const innerCheck = (node: Node = this.root): number => {
      if (!node) return 0;
      let leftTree = innerCheck(node.left);
      if (leftTree === -1) return -1;
      let rightTree = innerCheck(node.right);
      if (rightTree === -1) return -1;
      if (Math.abs(leftTree - rightTree) > 1) return -1;
      return Math.max(leftTree, rightTree) + 1;
    };
    return innerCheck() === -1 ? false : true;
  }

  rebalance() {
    this.treeify(this.inorder());
  }

  private returnData(nodes: Node[]): any {
    return nodes.map((node) => node.data);
  }

  private sortArray(array: Array<number>): Array<number> {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  private treeify(
    array: Array<number>,
    start: number = 0,
    end: number = array.length - 1
  ): Node | null {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    if (mid === Math.floor((array.length - 1) / 2)) this.root = node;
    node.left = this.treeify(array, start, mid - 1);
    node.right = this.treeify(array, mid + 1, end);
    return node;
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
