class LinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = this.head;
        this.length = 1;
    }

    push(value) {
        const newNode = new Node(value);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++
        return this;
    }

    pop() {
        if(!this.head) {
            return undefined;
        }
        let temp = this.head;
        let pre = this.head;
        while(temp.next) {
            pre = temp;
            temp = temp.next;
        }
        this.tail = pre;
        this.tail.next = null;
        this.length--
        if(this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return this;
    }

    unshift(value) {
        const newNode = new Node(value);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++
        return this;
    }

    shift() {
        if(!this.head) {
            return undefined;
        }
        let temp = this.head;
        this.head = this.head.next;
        this.length--
        if(this.length === 0) {
            this.head= null;
            this.tail = null;
        }
        temp.next = null;
        return this;
    }

    get(index) {
        if(index < 0 || index >= this.length) {
            return undefined;
        }
        let temp = this.head;
        for(let i = 0; i < index; i++){
            temp = temp.next;
        }
        return temp;
    }

    set(index, value) {
        let temp = this.get(index);
        if(temp) {
            temp.value = value;
            return true;
        }
        return false;
    }

    insert(index, value) {
        if(index === 0) return this.unshift(value);
        if(index === this.length-1) return this.push(value);
        if(index < 0 || index >= this.length) return false;

        const newNode = new Node(value);
        let temp = this.get(index-1);

        newNode.next = temp.next;
        temp.next = newNode;

        this.length++
        return this;
    }

    remove(index) {
        if(index === 0) return this.shift();
        if(index === this.length-1) return this.pop();
        if(index < 0 || index >= this.length) return undefined;

        let temp = this.get(index);
        let pre = this.get(index - 1);

        pre.next = temp.next;
        temp.next = null;
        this.length--
        return this;
    }

    reverse() {
        let temp = this.head;
        this.head= this.tail;
        this.tail = temp;
        let prev = null;
        let next = temp.next;

        for(let i = 0; i < this.length; i++) {
            next = temp.next;
            temp.next = prev;
            prev = temp;
            temp = next;
        }
        return this;
    }

    findMiddleNode() {
        if(!this.head) return null;

        //with LL length
        // const middle = Math.floor(this.length/2);
        // let temp = this.get(middle);
        // return temp;

        //without LL length
        let slow = this.head;
        let fast = this.head;
        while(fast !== null || fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    hasLoop() {
        if(!this.head) return false;
        let slow = this.head;
        let fast = this.head;
        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
            if(slow === fast) {
                return true;
            }
        }
        return false;
    }

    findKthFromEnd(k) {
        let slow = this.head;
        let fast = this.head;
 
        for (let i = 0; i < k; ++i) {
            if (fast === null) {
                return null;
            }
            fast = fast.next;
        }
 
        while (fast !== null) {
            slow = slow.next;
            fast = fast.next;
        }
        return slow;
    }

    partitionList(k) {
       if(!this.head) return;
       let dummy_1 = new Node(0);
       let dummy_2 = new Node(0);
       let prev1 = dummy_1;
       let prev2 = dummy_2;
       let current = this.head;
       while (current !== null) {
        if(current.value < k) {
            prev1.next = current;
            prev1 = prev1.next;
        }
        else {
            prev2.next = current;
            prev2 = prev2.next;
        }
        current = current.next;
       }
       prev2.next = null;
       prev1.next = dummy_2;
       this.head = dummy_1;
       return this;
    }

    removeDuplicates() {
        if(!this.head) return undefined;
        let mySet = new Set();
        let current = this.head;
        let prev = null;
        while(current !== null) {
            if(mySet.has(current.value)){
                prev.next = current.next;
                this.length -= 1;
            }
            else {
                mySet.add(current.value);
                prev = current;
            }
            current = current.next;
        }
        return this;
    }

    binaryToDecimal() {
        let num = 0;
        let current = this.head;
        while(current !== null) {
            num = num * 2 + current.value;
            current = current.next;
        }
        return num;
    }

    reverseBetween(a, b) {
        if(!this.head || this.head.next === null){
            return undefined;
        }
        let dummyNode = new Node(0);
        dummyNode.next = this.head;
        let prev = dummyNode;
        for(let i = 0; i < a; i++) {
            prev = prev.next;
        }
        let current = prev.next;
        for(let i = 0; i < (b - a); i++) {
            let temp = current.next;
            current.next = temp.next;
            temp.next = prev.next;
            prev.next = temp;
        }
        this.head = dummyNode.next;
        return this;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

let newLinkedList = new LinkedList(1);
newLinkedList.push(2);
newLinkedList.push(3);
newLinkedList.push(4);
newLinkedList.push(5);
newLinkedList.push(6);
//console.log(newLinkedList.pop());


//newLinkedList.insert(2, 12);
console.log(newLinkedList);
console.log(newLinkedList.reverseBetween(0, 3));
