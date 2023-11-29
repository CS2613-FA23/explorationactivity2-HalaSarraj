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

 - _Handle Commands:_ Implement the logic for handling each command inside the corresponding `handler` function.

    ```javascript
    handler: function (argv) {
        const greeting = `Hello, ${argv.name}!`;
        const ageMessage = argv.age ? `You are ${argv.age} years old.` : 'Age not provided.';
        console.log(`${greeting} ${ageMessage}`);
        // Add extra code here if you want to do more with this information
    },
    ```

 -_Parse the arguments:_ 

    ```javascript
    yargs.parse();
    ```

3. ** Advanced Features in the Yargs library:**

-**A. Multiple names for the commands**

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

-**B. Default Values for Options:**
In the same example , adding:


```javascript
default: 'Guest',
```
after the type: 'string'; will make the value of name default to 'Guest' unless the user gives another name.

-**C. Adding requirements for args/ validation**
In the same example , add:
```javascript
validate: (value) => value.length > 3,
```
after the type: 'string'. The username must be at least 4 characters long as per the custom validation function.


### **_Question 3:_ What are the functionalities of the package/library?**

#### A. **Command-Line Parsing**
-Yargs simplifies the process of parsing command-line arguments and options.
**Code Snippet for adding numbers in an array from the command line:**

```javascript
yargs.command({
  command: 'calculate',
  describe: 'Perform arithmetic calculations',
  builder: {
    operation: {
      describe: 'Mathematical operation',
      demandOption: true,
      type: 'string',
    },
    numbers: {
      describe: 'List of numbers',
      demandOption: true,
      type: 'array',
    },
  },
  handler: function (argv) {
    const { operation, numbers } = argv;
    const result = performCalculation(operation, numbers);
    console.log(`Result of ${operation}: ${result}`);
  },
});

yargs.parse();

```
**Output:**

    ```bash
$ node app.js calculate --operation add --numbers 3 5 7
Result of add: 15
    ```

#### B. ** Option Customization**
- The library allows the configuration of various options such as setting default values, specifying whether an option is required, and defining custom validation rules.
**Code Snippet to showcase this:**
```javascript
yargs.option('username', {
  describe: 'User username',
  demandOption: true,
  type: 'string',
  default: 'Guest',
  validate: (value) => value.length > 3,
});
yargs.parse();
```

#### C. **Commands and Subcommands**

Yargs supports the creation of commands and subcommands, making the organization of the functions into a hierarchical structure.

**Example:**

```javascript
// main commane here:
yargs.command({
  command: 'file',
  describe: 'Manage files',
  builder: {
// sub command 1
    create: {
      command: 'create',
      describe: 'Create a new file',
      builder: {
        name: {
          describe: 'Name of the file',
          demandOption: true,
          type: 'string',
        },
        content: {
          describe: 'Content of the file',
          demandOption: false,
          type: 'string',
        },
      },
      handler: function (argv) {
        const { name, content } = argv;
        createFile(name, content);
        console.log(`File '${name}' created successfully.`);
      },
    },
// sub command 2
    delete: {
      command: 'delete',
      describe: 'Delete an existing file',
      builder: {
        name: {
          describe: 'Name of the file to delete',
          demandOption: true,
          type: 'string',
        },
      },
      handler: function (argv) {
        const { name } = argv;
        deleteFile(name);
        console.log(`File '${name}' deleted successfully.`);
      },
    },
  },
});

yargs.parse();
    ```

**Output:**

    ```bash
$ node app.js file create --name test.txt --content "Contents of file."
File 'test.txt' created successfully.

$ node app.js file delete --name test.txt
File 'test.txt' deleted successfully.
    ```

#### D. **Providing Choices for Options**

Yargs allows you to restrict the possible values an option can take using the `.choices(key, choices)` method. This ensures that the user can only select from a predefined set of values for a specific option.

**Example:**

```javascript
yargs.option('color', {
  describe: 'Select a color',
  demandOption: true,
  type: 'string',
  choices: ['red', 'green', 'blue'],
});
yargs.parse();
```














