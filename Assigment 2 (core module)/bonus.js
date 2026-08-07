
function findKthPositive(arr, k) {
    let current = 1;
    let index = 0;

    while (k > 0) {

        
        if (index < arr.length && arr[index] === current) {
            index++;
        } 
        
        
        
        
        else {
            k--;
            if (k === 0) {
                return current;
            }
        }

        current++;
    }
}