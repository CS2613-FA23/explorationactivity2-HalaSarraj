# Exploring Javascript's Yargs library

## **_Question 1_: Which package/library did you select?**
- The selected package/library for this exploration activity is Yargs.

## **_Question 2:_ What is the package/library?**
- _What purpose does it serve?_: Yargs is a Node.js library designed for building interactive command-line interfaces (CLIs). It simplifies the process of parsing command-line arguments and options, making it easier to create user-friendly command-line applications.

- _How do you use it?_: To use Yargs, you start by defining commands, options, and arguments using its syntax. The library then handles the parsing of command-line input.

1. **Setting up by importing:** Start by importing the Yargs library in your Node.js application.

    ```javascript
    const yargs = require('yargs');
    ```

2. **Define commands, options, and arguments using Yargs' syntax.** 

    - _Define Commands:_ For a program that would ask for a String for the user's name (required) then a number for the age (optional), the syntax of defining the command would be:

    ```javascript
    yargs.command({
      command: 'greet',
      describe: 'Greet a user',
      builder: {
        name: {
          describe: 'User name',
          demandOption: true,
          type: 'string',
        },
        age: {
          describe: 'User age',
          demandOption: false,
          type: 'number',
        },
      },
    });
    ```

3. _Handle Commands:_ Implement the logic for handling each command inside the corresponding `handler` function.

    ```javascript
    handler: function (argv) {
        const greeting = `Hello, ${argv.name}!`;
        const ageMessage = argv.age ? `You are ${argv.age} years old.` : 'Age not provided.';
        console.log(`${greeting} ${ageMessage}`);
        // Add extra code here if you want to do more with this information
    },
    ```

4. _Parse the arguments:_ 

    ```javascript
    yargs.parse();
    ```

3. ** Advanced Features in the Yargs library **
**A. Multiple names for the commands**

```javascript
yargs.command({
  command: ['greet', 'hello'],
  describe: 'Greet a user',
  handler: function (argv) {
    console.log(`Hello, ${argv.name}!`);
  },
});
```
In this example, both greet and hello can be used interchangeably

**B. Default Values for Options**
In the same example , adding:


```javascript
default: 'Guest',
```
after the type: 'string'; will make the value of name default to 'Guest' unless the user gives another name.

**C. Adding requirements for args/ validation**
In the same example , add:
```javascript
validate: (value) => value.length > 3,
```
after the type: 'string'. The username must be at least 4 characters long as per the custom validation function.




