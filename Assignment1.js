function mergesort(list) //Iterative Implementation (No Recursion)
{
    let sorted = Array.from(list);
    let n = sorted.length;
    let buffer = new Array(n);

    for(let size = 1; size < n; size *= 2)
    {
        for(let leftStart = 0; leftStart < n; leftStart += 2*size)
        {
            let left = leftStart,
                right = Math.min(left + size, n),
                leftLimit = right,
                rightLimit = Math.min(right + size, n);

            merge(left, right, leftLimit, rightLimit, sorted, buffer);
        }

        let temp = sorted;
        sorted = buffer;
        buffer = temp;
    }
    return sorted;
}

function merge(left, right, leftLimit, rightLimit, sorted, buffer)
{
    let i = left;
    while(left < leftLimit && right < rightLimit)
    {
        if(sorted[left] <= sorted[right])
        {
            buffer[i++] = sorted[left++];
        }
        else
        {
            buffer[i++] = sorted[right++];
        }
    }

    while(left < leftLimit)
    {
        buffer[i++] = sorted[left++];
    }
    while(right < rightLimit)
    {
        buffer[i++] = sorted[right++];
    }
}

console.log(mergesort([30, 20, 10, 50, 22, 33, 55]));

