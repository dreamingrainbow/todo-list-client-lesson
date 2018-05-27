# Create React App Todo List Client
In this lesson we learn how to create a todo list using state and local storage.


## Our Todo List Client App

First step, lets create our app.

`create-react-app todo-list-client`

Let's move in to our projects and add a few basic dependencies.
`cd todo-list-client`

## Our Dependencies

`npm i jquery bootstrap font-awesome reactstrap`

Lets start coding...

Let's open up the `index.js` file and clean it up, and add our dependencies in the application global scope of the application.

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

This will get our font-awesome and bootstrap added to our global scope, and remove all the extra stuff added by create-react-app.

Next, we update our `App.js` file.

Lets start by adding our imports

```JavaScript
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
```

These two bring in React, and our reactstrap module. So now we can see our class like so.

```JavaScript
class App extends Component {
    render(){
      return(
        'Standard Template'
      );
    }
}
```

We can remove the contents of the return, and add our own.

```JavaScript
    <Container fluid className="justify-content-center align-content-center">
    <section className="text-center">
        <Row>
          <Col className="py-3">
              <h1>To Do List</h1>
          </Col>
        </Row>            
        <Row>
          <Col>
              <input type="text" name="todo" ref="todo" onChange={this.setTodo.bind(this)}/><button onClick={this.addTodo.bind(this)}>+</button>
          </Col>
        </Row>
        <Row className="my-3 py-5">
          <Col>
              {this.renderTodoList()}
          </Col>
        </Row>
        </section>
    </Container>
```

In this snippet we add our title to the page, an input to take a new todo, a buttun to add it and we render our list.

To get all of this working we can start in our contructor and set our initial state.

```JavaScript
  constructor (props) {
    super(props);
    this.state = {
      todoList : JSON.parse(localStorage.getItem('TodoList')) || []
    }
  }
```

In our constructor we set the todoList to be the stored TodoList or we start a new one. Our TodoList is an array of Todo's. Now we can add the `setTodo` method to our App class. 


```JavaScript
  setTodo() { 
    const todo  = this.refs.todo.value;
    this.setState({ todo : { todo, completed : false, created : Date.now()} });  
  }
```
In out setTodo we take the value of our todo input and store it to state. Now we need our `addTodo` method. Allowing a user to add the todo to storage.

```JavaScript  
  addTodo() {
    if(this.state.todo === undefined ) return null;    
    this.refs.todo.value = '';
    let todoList = this.state.todoList;
    todoList.push(this.state.todo);
    localStorage.setItem('TodoList', JSON.stringify(this.state.todoList));
    this.setState({todoList, todo:null});
  }
```  
In the `addTodo` method we grab the value of the todo from state, and add it to our todo list. We also, update the value, to null and update state, as well as our storage.

Now that we have a way to add them we will need to create our 'removeTodo` method to remove the todo's from the todo list.  

```JavaScript
  removeTodo(e){
    let todoIndex = e.target.dataset.todo | e.target.parentNode.dataset.todo;
    const newTodoList = this.state.todoList.filter((todo, i) => todoIndex !== i);
    localStorage.setItem('TodoList', JSON.stringify(newTodoList));
    this.setState({
      todoList : newTodoList
    });
  }
```

Within the `removeTodo` method we filter our todo list removing the todo with the index set by the `data-todo` property. After getting our updated Todo List we update state and our storage.

Now we will need to render our todo list items. We will use the `renderTodoList` method to render our todo list.

```JavaScript
  renderTodoList() {
    return this.state.todoList.map((todo, i) => {
      const s = this.toggleCompleted.bind(this);
      const t = this.removeTodo.bind(this);
      return <Row key={i} >
      <Col onClick={s} data-todo={i}>{(new Date(todo.created)).toDateString()} {todo.todo}
       {todo.completed ? <i className="fa fa-check"></i> : null}
       {todo.completed ? (new Date(todo.completed)).toDateString() : null}
      </Col>
      <Col onClick={t} data-todo={i} title="Click to remove"><i className="fa fa-close"></i></Col>
       </Row>
      });
  }
```

In the `renderTodoList` method we map our todo list, adding our remove button and our `toggleCompleted` which is our last method to create.

```JavaScript
  toggleCompleted(e) {
    const todoIndex = Number(e.target.dataset.todo);    
    const todoList = this.state.todoList;
    if(!todoList[todoIndex].completed) {
      todoList[todoIndex].completed = Date.now();
      localStorage.setItem('TodoList', JSON.stringify(todoList));      
      this.setState({todoList});
    }
  }
```

In our `toggleCompleted` method we set the completed property of the todo object to the current date, we then update state, and our storage.

That's it we have built our todo list app in React using local storage to persist the data.

## Run Our Todo List App

`npm start`

