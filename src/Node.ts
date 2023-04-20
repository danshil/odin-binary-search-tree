export default class Node {
  data: number | null;
  left: Node | null;
  right: Node | null;

  constructor(data: number | null = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
