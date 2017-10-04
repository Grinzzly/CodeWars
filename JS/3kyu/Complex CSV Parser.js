function parseCSV(input, separator, quote) {
    separator = separator || ',';
    quote = quote || '"';
    if (input === '') return [[""]];
    let res = [];
    let temp = '', in_quote = false;
    let qnum = 0;
    for (let i = 0; i < input.length; i++)
    {
        if (i === 0)
            res.push([]);
        if (input[i] === separator && !in_quote)
        {
            res[res.length-1].push(temp);
            temp = '';
        }
        else if (input[i] === quote && !in_quote)
        {
            in_quote = true;
            qnum += 1;
        }
        else if (input[i] === quote && in_quote)
        {
            if (qnum % 2 === 1 && (input[i+1] === separator || input[i+1] === '\n'))
            {
                in_quote = false;
                qnum = 0;
            }
            else
            {
                if (i > 0 && input[i-1] === quote && input[i] === quote)
                {
                    qnum += 1;
                    continue;
                }
                temp += input[i];
                qnum += 1;
            }
        }
        else if (input[i] === '\n' && !in_quote)
        {
            res[res.length-1].push(temp);
            temp = '';
            res.push([]);
        }
        else
        {
            if (i > 0 && input[i-1] === quote && input[i] === quote)
                continue;
            temp += input[i];
        }
        if (i === input.length-1)
        {
            if (temp[temp.length-1] === quote)
                temp = temp.substring(0, temp.length-1);
            res[res.length-1].push(temp);
        }
    }
    return res;
}