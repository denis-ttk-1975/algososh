export class LinkedListNode<T> {
  _value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this._value = value;
    this.next = next;
  }
}

export class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;

  constructor(initialValues?: T[]) {
    this.head = null;
    this.tail = null;

    initialValues?.forEach((elem) => this.append(elem));
  }

  append(value: T) {
    const node = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    return this;
  }

  prepend(value: T) {
    const node = new LinkedListNode(value);
    node.next = this.head;
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    return this;
  }

  deleteFirst() {
    if (!this.head) {
      return null;
    }
    const nodeToDelete = this.head;

    if (!!this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return nodeToDelete;
  }

  deleteLast(): LinkedListNode<T> | null {
    if (!this.tail) {
      return null;
    }
    const nodeToDelete = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return nodeToDelete;
    }

    let temporalNode = this.head;

    while (!!temporalNode?.next) {
      if (!temporalNode.next.next) {
        this.tail = temporalNode;
        temporalNode.next = null;
      } else {
        temporalNode = temporalNode.next;
      }
    }
    return nodeToDelete;
  }

  addIndex(index: number): LinkedListNode<T> | null {
    return null;
  }

  deleteIndex(index: number): LinkedListNode<T> | null {
    return null;
  }

  toArray() {
    const nodeArray = [];
    let temporalNode = this.head;

    while (!!temporalNode) {
      nodeArray.push(temporalNode);
      temporalNode = temporalNode.next;
    }

    return nodeArray;
  }
}
