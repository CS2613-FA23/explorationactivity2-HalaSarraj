const yargs = require('yargs'); 
const fs = require('fs'); 
  
const taks_file = 'tasks.json'; 
  
// If file already exists, just load the tasks
// Otherwise, create the file and initialize it with an empty array
let tasks = loadTasks(); 
  
//print
const printTasks = () => { 
  console.log('Tasks:'); 
  tasks.forEach((task, index) => { 
    console.log(`${index + 1}. [${task.completed ? '✔' : '❌'}] ${task.description}`); 
  }); 
}; 
  
// check all tasks ticked off 
const AllTasksComplete = () => { 
  return tasks.every((task) => task.completed); 
}; 
  
//load
function loadTasks() { 
  try { 
    const tasksData = fs.readFileSync(taks_file, 'utf8'); 
    return JSON.parse(tasksData); 
  } catch (error) { 
    return []; 
  } 
} 
  
//save tasks to the file
function saveTasks() { 
  const tasksData = JSON.stringify(tasks, null, 2); 
  fs.writeFileSync(taks_file, tasksData); 
} 
  
//using yargs
yargs 
  .command({ 
    command: 'add', 
    describe: 'Add a new task', 
    builder: { 
      task: { 
        describe: 'Task description', 
        demandOption: true, 
        type: 'string', 
      }, 
    }, 
    handler: function (argv) { 
      tasks.push({ description: argv.task, completed: false }); 
      saveTasks(); 
      console.log('Task added:', argv.task); 
    }, 
  }) 
  //index taken from user will start from one so the program is more user-friendly
  .command({ 
    command: 'completed', 
    describe: 'Mark a task as completed', 
    builder: { 
      index: { 
        describe: 'Index of the completed task', 
        demandOption: true, 
        type: 'number', 
      }, 
    }, 
    handler: function (argv) { 
      const index = argv.index - 1; 
      if (index >= 0 && index < tasks.length) { 
        tasks[index].completed = true; 
        saveTasks(); 
        console.log('Task marked as completed:', tasks[index].description); 
  
        // Once all tasks are complete, print out this message
        if (AllTasksComplete()) { 
          console.log("Good job!! You have completed all of your tasks. What a productive day!"); 
          process.exit(0); 
        } 
      } else { 
        console.log('Invalid task index.'); 
      } 
    }, 
  }) 
  .command({ 
    command: 'print', 
    describe: 'Print all tasks', 
    handler: function () { 
      printTasks(); 
    }, 
  }) 
  .command({ 
    command: 'clear', 
    describe: 'Clear all tasks', 
    handler: function () { 
      tasks = [];
      saveTasks(); 
      console.log('All tasks cleared.'); 
    }, 
  }) 
  .command({ 
    command: 'exit', 
    describe: 'Exit the program', 
    handler: function () { 
      console.log('Bye.'); 
      process.exit(0); 
    }, 
  }) 
  .help() 
  .argv; 
  
// Always printed to show options 
console.log('Welcome to the To-Do List Manager!'); 
console.log('Commands: add, completed, print, clear, exit'); 
 
