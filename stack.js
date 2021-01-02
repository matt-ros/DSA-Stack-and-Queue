class _Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
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
    this.top = node.next;
    return node.data;
  }
}

function peek(stack) {
  if (stack.top === null) {
    return null;
  }
  return stack.top.data;
}

function isEmpty(stack) {
  if (stack.top === null) {
    return true;
  }
  return false;
}

function display(stack) {
  if (isEmpty(stack)) {
    return console.log('Empty stack');
  }
  let displayString = '';
  let currNode = stack.top;
  while (currNode !== null) {
    displayString = currNode.data + ` -> ${displayString}`;
    currNode = currNode.next;
  }
  displayString += 'TOP';
  return console.log(displayString);
}

let starTrek = new Stack();
starTrek.push('Kirk');
starTrek.push('Spock');
starTrek.push('McCoy');
starTrek.push('Scotty');
display(starTrek);
starTrek.pop();
starTrek.pop();
display(starTrek);

function is_palindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  let stack = new Stack();
  let counter = 0;
  for (let i = 0; i < s.length; i++) {
    stack.push(s.charAt(i));
    counter++;
  }
  for (let k = 0; k < Math.floor(counter / 2); k++) {
    if (s.charAt(k) !== stack.pop()) {
      return false;
    }
  }
  return true;
}

// True, true, true, false
console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
console.log(is_palindrome("Tauhida"));

function matchParenthesesV1(string) {
  let stack = new Stack();
  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) === '(') {
      stack.push(i);
    }
    if (string.charAt(i) === ')') {
      if (isEmpty(stack)) {
        console.log(`Missing the '(' for the ')' located at index ${i}`);
        return false;
      }
      stack.pop();
    }
  }
  if (!isEmpty(stack)) {
    console.log(`Missing the ')' for the '(' located at index ${stack.pop()}`);
    return false;
  }
  return true;
}
// true, false index 6, false index 0, false index 6
console.log(matchParenthesesV1('(((())))'));
console.log(matchParenthesesV1('((())))'));
console.log(matchParenthesesV1('(((()))'));
console.log(matchParenthesesV1('(())()((())()'));

function matchParenthesesV2(string) {
  const openParenMatch = ')';
  const openSquareMatch = ']';
  const openCurlyMatch = '}';
  let stack = new Stack();
  for (let i = 0; i < string.length; i++) {
    let currChar = string.charAt(i);
    if (currChar === '(') {
      stack.push(openParenMatch);
      continue;
    }
    if (currChar === '[') {
      stack.push(openSquareMatch);
      continue;
    }
    if (currChar === '{') {
      stack.push(openCurlyMatch);
      continue;
    }
    if (currChar === ')' || currChar === ']' || currChar === '}') {
      let stackChar = stack.pop();
      if (stackChar !== currChar) {
        console.log(`Error: Expecting ${stackChar} but found ${currChar}`);
        return false;
      }
    }
  }
  if (!isEmpty(stack)) {
    console.log(`Error: Expecting ${stack.pop()} but reached end of string`);
    return false;
  }
  return true;
}

// false, false, true
console.log(matchParenthesesV2('([)]'));
console.log(matchParenthesesV2('([]'));
console.log(matchParenthesesV2('({}[[]]()[])'));

function matchParenthesesV3(string) {
  const openParenMatch = ')';
  const openSquareMatch = ']';
  const openCurlyMatch = '}';
  let stack = new Stack();
  let index = 0;
  while (index < string.length) {
    const currChar = string.charAt(index);
    if (currChar === "'" || currChar === '"') {
      const nextOccurrence = string.indexOf(currChar, index + 1);
      index = nextOccurrence + 1;
      continue;
    }
    if (currChar === '(') {
      stack.push(openParenMatch);
      index++;
      continue;
    }
    if (currChar === '[') {
      stack.push(openSquareMatch);
      index++;
      continue;
    }
    if (currChar === '{') {
      stack.push(openCurlyMatch);
      index++;
      continue;
    }
    if (currChar === ')' || currChar === ']' || currChar === '}') {
      const stackChar = stack.pop();
      if (stackChar !== currChar) {
        console.log(`Error: Expecting ${stackChar} but found ${currChar}`);
        return false;
      }
      index++;
      continue;
    }
  }
  if (!isEmpty(stack)) {
    console.log(`Error: Expecting ${stack.pop()} but reached end of string`);
    return false;
  }
  return true;
}

// false, true, false
console.log(matchParenthesesV3('([)]'));
console.log(matchParenthesesV3('"("[]'));
console.log(matchParenthesesV3('({}[["]]"()[])'));

function sortStack(stack) {
  function findMaxBelowLimit(stack, limit) {
    let currNode = stack.top;
    let currMax = -Infinity;
    while (currNode !== null) {
      if (currNode.data < limit && currNode.data > currMax) {
        currMax = currNode.data;
      }
      currNode = currNode.next;
    }
    return currMax;
  }
  if (isEmpty(stack)) {
    return stack;
  }
  let sortedStack = new Stack();
  let currNode = stack.top;
  let currMax = currNode.data;
  while (currNode !== null) {
    if (currNode.data > currMax) {
      currMax = currNode.data;
    }
    currNode = currNode.next;
  }
  while (currMax !== -Infinity) {
    sortedStack.push(currMax);
    currMax = findMaxBelowLimit(stack, currMax);
  }
  return sortedStack;
}

let unsortedStack = new Stack();
unsortedStack.push(2);
unsortedStack.push(3);
unsortedStack.push(5);
unsortedStack.push(1);
unsortedStack.push(4);
display(sortStack(unsortedStack));