
var createCounter = function(init) {
    var test = init
    function reset(){
        test = init
            console.log(test)
            return test
        }


    function increment(){
        test= test+1
        console.log(test)
        return test
    }


    function  decrement(){
        test-=1
            console.log(test)
            return test
        }

    return { reset: reset, increment: increment, decrement: decrement };
};


  const counter = createCounter(5)
  counter.increment(); // 6
  counter.reset(); // 5
  counter.increment(); // 6
  counter.increment(); // 7
  counter.increment(); // 8 
  counter.decrement() // 7

