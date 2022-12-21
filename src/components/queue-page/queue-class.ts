export class Queue<T> {
  stack: string[];
  head: number | null;
  tail: number | null;

  constructor() {
    this.stack = [' ', ' ', ' ', ' ', ' ', ' ', ' '];
    this.head = null;
    this.tail = null;
  }

  add(value: string) {
    if (this.tail === null || this.head === null) {
      this.stack[0] = value;
      this.head = 0;
      this.tail = 0;
      return this;
    }
    if ((this.head === 0 && this.tail === 6) || this.tail + 1 === this.head) {
      alert('В данном примере очередь ограничена 7 элементами. Пожалуйста, удалите один или несколько элементов, чтобы добавить новый элемент.');
      return this;
    }
    if (this.tail === 6) {
      this.stack[0] = value;
      this.tail = 0;
      return this;
    }
    this.stack[this.tail + 1] = value;
    this.tail = this.tail + 1;
    return this;
  }

  delete() {
    if (this.tail === null || this.head === null) {
      return this;
    }
    if (this.head === this.tail) {
      this.clear();
      return this;
    }

    if (this.head === 6) {
      this.stack[0] = ' ';
      this.head = 0;
      return this;
    }
    this.stack[this.head] = ' ';
    this.head = this.head + 1;
    return this;
  }

  clear() {
    this.stack = [' ', ' ', ' ', ' ', ' ', ' ', ' '];
    this.head = null;
    this.tail = null;
    return this;
  }
}
