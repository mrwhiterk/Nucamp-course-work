var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
var user = auth[0];  
var pass = auth[1];

Challenge #1: What is the function split doing? What does split return? Research the function online.

````Split converts a string into an array by "splitting" on whatever character is passed to the function argument. Split returns an array.

Challenge #2: Why is the professor using (' ') in the first "split"? Why is he using [1]?
``` So by passing ' ' to your function, you're splitting the string wherever those characters are and making array. He is capturing the array item at the second index that was created.

Challenge #3: Why is the function Buffer used, what does "base64" do?
Converting data packets from HTTP request into buffers allows it to be manipulated and parsed like other javascript data types. The 'base64' parameter tells the Buffer constructor that this data is base64 encoded so decode it for us.

Challenge #4: Why is .toString() used?
.toString() method attempts to convert any non-string javascript data-type to a string. We're using it to convert our buffer object into a string.

Challenge #5: Why is .split(':') used?
Were using the split to separate the "[user]:[password]" string that were receiving and separating them into an array.

Final Challenge:  What is the type of the variable auth at the end of this code sequence? What's inside the variable auth at the end?
````

Auth is an array. Auth at index 0 is the username. Auth at index 1 is the password
