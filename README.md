# yqlworker
HTML worker 'like' interface that runs your JS code in the cloud (Yahoo YQL)

# Usage
1. Setup your executable in an accessible URL.
2. The code that you can use right now is E4X, an extension of EcmaScript to work with XML documents, as this is a limitation of the Javascript that can be run on YQL servers. [More information](https://developer.yahoo.com/yql/guide/yql-execute-bestpractices.html#yql-execute-asynchronous_calls).
3. When writing your worker code, declare a global variable `result` that will be returned to your client.
4. If we want to pass variables to our worker, we will use the familiar `postMessage`, the JSON object passed will be available to the worker in a global variable called `message`.

# Examples
## primes.html
In this example the worker is on [this url](http://pastebin.mozilla.org/8760055).

We will calculate the next prime number from `10000` and the factor of number `12141231232`.


```
var prime = nextPrime(10000);

result = {
  prime: prime,
  factor: factor(12141231232)
};
```

## echo.html
This is an example on how to send parameters to the worker. Our worker remote code is living [here](http://pastebin.mozilla.org/8760293).

It just send the same result as passed as parameter:
```
var result = message;
```
