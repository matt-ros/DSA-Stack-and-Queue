class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _Node(data, null);
    if (this.first === null) {
      this.first = node;
    }
    if (this.last) {
      this.last.next = node;
    }
    this.last = node;
  }

  dequeue() {
    if (this.first === null) {
      return null;
    }
    const node = this.first;
    this.first = this.first.next;
    if (node === this.last) {
      this.last = null;
    }
    return node.value;
  }
}

class _DLNode {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class QueueDL {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _DLNode(data, null, null);
    if (this.first === null) {
      this.first = node;
    }
    if (this.last) {
      this.last.next = node;
      node.prev = this.last;
    }
    this.last = node;
  }

  dequeue() {
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;
    this.first.prev = null;
    if (node === this.last) {
      this.last.next = null;
    }
    return node.value;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    if (this.top === null) {
      this.top = new _Node(data, null);
      return this.top;
    }

    const node = new _Node(data, this.top);
    this.top = node;
  }

  pop() {
    const node = this.top;
    if (node === null) {
      return null;
    }
    this.top = node.next;
    return node.value;
  }
}

class Queue2Stacks {
  constructor() {
    this.enqStack = new Stack();
    this.deqStack = new Stack();
  }

  enqueue(data) {
    this.enqStack.push(data);
  }

  dequeue() {
    if (this.deqStack.top === null) {
      if (this.enqStack.top === null) {
        return;
      }
      let currNode = this.enqStack.pop();
      while (currNode !== null) {
        this.deqStack.push(currNode);
        currNode = this.enqStack.pop();
      }
    }
    return this.deqStack.pop();
  }
}

function peek(queue) {
  if (queue.first === null) {
    return null;
  }
  return queue.first.value;
}

function isEmpty(queue) {
  if (queue.first === null && queue.last === null) {
    return true;
  }
  return false;
}

function display(queue) {
  if (isEmpty(queue)) {
    return console.log('Empty queue');
  }
  let displayString = 'FRONT -> ';
  let currNode = queue.first;
  while (currNode !== null) {
    displayString += `${currNode.value} -> `;
    currNode = currNode.next;
  }
  displayString += 'BACK';
  return console.log(displayString);
}

// let starTrekQ = new Queue();
// starTrekQ.enqueue('Kirk');
// starTrekQ.enqueue('Spock');
// starTrekQ.enqueue('Uhura');
// starTrekQ.enqueue('Sulu');
// starTrekQ.enqueue('Chekov');
// display(starTrekQ);
// starTrekQ.dequeue();
// starTrekQ.dequeue();
// display(starTrekQ);
// let starTrekQDL = new QueueDL();
// starTrekQDL.enqueue('Kirk');
// starTrekQDL.enqueue('Spock');
// starTrekQDL.enqueue('Uhura');
// starTrekQDL.enqueue('Sulu');
// starTrekQDL.enqueue('Chekov');
// display(starTrekQDL);
// let starTrekQ2S = new Queue2Stacks();
// starTrekQ2S.enqueue('Kirk');
// starTrekQ2S.enqueue('Spock');
// starTrekQ2S.enqueue('Uhura');
// starTrekQ2S.enqueue('Sulu');
// starTrekQ2S.enqueue('Chekov');
// console.log(starTrekQ2S.dequeue());
// starTrekQ2S.enqueue('Scotty');
// console.log(starTrekQ2S.dequeue())
// console.log(starTrekQ2S.dequeue())
// console.log(starTrekQ2S.dequeue())
// console.log(starTrekQ2S.dequeue())
// console.log(starTrekQ2S.dequeue())

function squareDance(queue) {
  const spares = new Queue();
  let currDancer = queue.dequeue();
  if (currDancer === null) {
    return 'Empty queue';
  }
  let currGender = currDancer.charAt(0);
  let nextDancer = queue.dequeue();
  if (nextDancer === null) {
    return currGender === 'F' ? 'There is 1 female dancer waiting' : 'There is 1 male dancer waiting';
  }
  while (nextDancer !== null) {
    let nextGender = nextDancer.charAt(0);
    if (currGender !== nextGender) {
      console.log(`${currDancer} dancing with ${nextDancer}`);
      if (isEmpty(spares)) {
        currDancer = queue.dequeue();
        if (currDancer === null) {
          break;
        }
      }
      else {
        currDancer = spares.dequeue();
      }
      currGender = currDancer.charAt(0);
    }
    else {
      spares.enqueue(nextDancer);
    }
    nextDancer = queue.dequeue();
  }
  if (!currDancer && isEmpty(spares)) {
    return 'All dancers paired';
  }
  let counter = 1;
  let spareDancer = spares.dequeue();
  while (spareDancer !== null) {
    counter++;
    spareDancer = spares.dequeue();
  }
  return currGender === 'F' ? `${counter} female dancers waiting` : `${counter} male dancers waiting`;
}

const danceQueue = new Queue();
danceQueue.enqueue('F Jane');
danceQueue.enqueue('M Frank');
danceQueue.enqueue('M John');
danceQueue.enqueue('M Sherlock');
danceQueue.enqueue('F Madonna');
danceQueue.enqueue('M David');
danceQueue.enqueue('M Christopher');
danceQueue.enqueue('F Beyonce');
console.log(squareDance(danceQueue));