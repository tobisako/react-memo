import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {

  constructor() {
    super();
    this.todos = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bills",
        complete: false
      }
    ];
  }

  createTodo(text) {
    const id = Date.now();
    this.todos.push({
      id,
      text,
      complete: false
    });
    this.emit("change");
  }

  receiveTodos(todos) {
    this.todos = todos;
    this.emit("change");
  }

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    //console.log("TodoStore received an action", action);
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
      }
      case "RECEIVE_TODOS": {
        this.receiveTodos(action.todos);
      }
    }
  }
}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

//window.todoStore = todoStore;   // テスト用：Consoleで追加テスト：todoStore.createTodo("Foo todo");

window.dispatcher = dispatcher;   // テスト用：dispatcher.dispatch({type: "CREATE_TODO", text: "new todo"});

export default todoStore;

