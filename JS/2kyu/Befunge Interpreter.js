function interpret(code) {
    console.log(code);
    let rows = code.split('\n');
    let output = '';
    let stack = [];

    let processing = true;
    let row = 0;
    let col = 0;
    let cur = rows[row][col];
    let directions = ['r', 'l', 'u', 'd'];
    let direction = 'r'; //default direction is to the right
    while (processing) {
        //directional operations
        if (cur.match(/[\>\<\^v?]/)) {
            direction = cur === '>' ? 'r' : cur === '<' ? 'l' : cur === '^' ? 'u' : cur === 'v' ? 'd' : directions[Math.floor(Math.random() * 4)];
        }
        //integers
        if (cur.match(/[0-9]/)) {
            stack.push(parseInt(cur));
        }
        //math operators
        if (cur.match(/[\+\-\*\/\%\`]/)) {
            let a = stack.pop();
            let b = stack.pop();
            let newVal = cur === '+' ? a + b : cur === '-' ? b - a : cur === '*' ? a * b : cur === '/' ? a === 0 ? 0 : Math.floor(b / a) :
                cur === '%' ? a === 0 ? 0 : b % a : cur === '`' ? b > a ? 1 : 0 : null;
            stack.push(newVal);
        }
        //pop and...
        if (cur.match(/[_|$.,]/)) {
            let val = stack.pop();
            cur === '_' ? val === 0 ? direction = 'r' : direction = 'l' : cur === '|' ? val === 0 ? direction = 'd' : direction = 'u' :
                cur === '.' ? output = output.concat(parseInt(val)) : cur === ',' ? output = output.concat(String.fromCharCode(val)) : null;
        }
        //put: Pop y, x and v, then change the character at the position (x,y) in the program to the character with ASCII value v.
        if (cur === 'p') {
            let y = stack.pop();
            let x = stack.pop();
            let v = stack.pop();
            let newRow = rows[y].split('');
            newRow[x] = String.fromCharCode(v);
            rows[y] = newRow.join('');
        }
        //get: Pop y and x, then push ASCII value of the character at that position in the program.
        if (cur === 'g') {
            let y = stack.pop();
            let x = stack.pop();
            stack.push(rows[y][x].charCodeAt(0));
        }
        //logical not Pop a value. If the value is zero, push 1; otherwise, push zero.
        if (cur === '!') {
            let temp = stack.pop() === 0 ? 1 : 0;
            stack.push(temp);
        }
        //string
        if (cur === '"') {
            direction === 'r' ? col++ : col--;
            cur = rows[row][col];
            while (cur !== '"') {
                stack.push(cur.charCodeAt(0));
                direction === 'r' ? col++ : col--;
                cur = rows[row][col];
            }
        }
        //duplicate
        if (cur === ':') {
            let top = stack.pop();
            if (top !== undefined) {
                stack.push(top);
                stack.push(top);
            } else {
                stack.push(0);
            }
        }
        //swap
        if (cur === '\\') {
            let a = stack.pop();
            let b = stack.pop() || 0;
            stack.push(a);
            stack.push(b);
        }
        //trampoline
        if (cur === '#') {
            direction === 'r' ? col++ : direction === 'l' ? col-- : direction === 'u' ? row-- : row++;
            cur = rows[row][col];
        }
        //end of input
        if (cur === '@') {
            processing = false;
        }

        //continue in last specified direction
        direction === 'r' ? col++ : direction === 'l' ? col-- : direction === 'u' ? row-- : row++;
        cur = rows[row][col];
    }

    return output;
}