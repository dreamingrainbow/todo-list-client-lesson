import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      todoList : JSON.parse(localStorage.getItem('TodoList')) || []
    }
  }
  
  setTodo() { 
    const todo  = this.refs.todo.value;
    this.setState({ todo : { todo, completed : false, created : Date.now()} });  
  }
  
  addTodo() {
    if(this.state.todo === undefined ) return null;    
    this.refs.todo.value = '';
    let todoList = this.state.todoList;
    todoList.push(this.state.todo);
    localStorage.setItem('TodoList', JSON.stringify(this.state.todoList));
    this.setState({todoList, todo:null});
  }

  removeTodo(e){
    let todoIndex = e.target.dataset.todo | e.target.parentNode.dataset.todo;
    const newTodoList = this.state.todoList.filter((todo, i) => todoIndex !== i);
    console.log(todoIndex, newTodoList);
    localStorage.setItem('TodoList', JSON.stringify(newTodoList));    
    this.setState({
      todoList : newTodoList
    });
  }

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

  toggleCompleted(e) {
    const todoIndex = Number(e.target.dataset.todo);    
    const todoList = this.state.todoList;
    if(!todoList[todoIndex].completed) {
      todoList[todoIndex].completed = Date.now();
      localStorage.setItem('TodoList', JSON.stringify(todoList));      
      this.setState({todoList});
    }
  }


  render() {
    return (
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
    );
  }
}

export default App;
