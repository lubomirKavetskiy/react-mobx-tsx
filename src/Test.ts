import { makeObservable, observable, when, action, computed, reaction } from 'mobx';

// class Person {
//   @observable
//   dollars = 100

//   constructor() {
//     makeObservable(this)
//   }

//   @computed
//   get euros() {
//     return this.dollars * .9
//   }

//   @action
//   withdraw() {
//     this.dollars -= 10
//   }
// }

// const newPerson = new Person()

// console.log('Before Observing - Not Cached', newPerson.euros);
// console.log('Before Observing - Not Cached', newPerson.euros);

// const dispose = autorun(
//   () => { console.log(newPerson.euros) }
// )

// console.log('After Observing - Cached', newPerson.euros);
// console.log('After Observing - Cached', newPerson.euros);
// console.log('After Observing - Cached', newPerson.euros);
// console.log('After Observing - Cached', newPerson.euros);

// newPerson.withdraw()

// dispose()

// # Each todo should have:
//     - id
//     - name
//     - isCompleted
// # Each todo should be able to move between completed and not completed state
// # Each todo should be able to update the name
// # Print Log on Todo completed state change
// # Add ability to add and remove todo
// # Add ability to get list of completed todos and not completed todos
// # Print log every time new todo is added or removed with the current status: total, completed, incomplete
// # Print log only once when all todos are completed

let initId = 0;

class Todo {
  id = initId++

  private disposer: () => void

  constructor(name: string) {
    makeObservable(this)

    this.name = name

    //will trigger after every change of isCompleted
    this.disposer = reaction(
      () => this.isCompleted,
      () => console.log(`Todo '${this.name}' is changed to ${this.isCompleted ? 'Complete' : 'Incomplete'}`)
    )
  }

  @observable
  name = ''

  @observable
  isCompleted = false

  @action
  changeName(name: string) {
    this.name = name
  }

  @action
  toggle() {
    this.isCompleted = !this.isCompleted
  }

  dispose() {
    this.disposer()
  }
}

class TodoList {
  constructor() {
    makeObservable(this)

    //will trigger after every change of list.length
    reaction(
      () => this.list.length,
      () => console.log(`Total: ${this.list.length}, Completed: ${this.completed.length}, Incompleted: ${this.incompleted.length}`)
    )

    //will invoke just ONCE
    when(
      () => !!this.list.length && this.list.every(todo => Boolean(todo.isCompleted)),
      () => console.log('all todos are completed')
    )
  }

  getTodo(name: string): Todo | undefined {
    return this.list.find(todo => todo.name === name)
  }

  @observable
  list: Todo[] = []

  @action
  addTodo(name: string) {
    this.list.push(new Todo(name))
  }

  @action
  delTodo(name: string) {
    const todoToDel = this.getTodo(name)

    //dispose of its reaction after deleting of it
    todoToDel?.dispose()

    if(todoToDel) {
      this.list.splice(this.list.indexOf(todoToDel), 1)
    }
  }

  @computed
  get completed() {
    return this.list.filter(todo => Boolean(todo.isCompleted))
  }

  @computed
  get incompleted() {
    return this.list.filter(todo => !todo.isCompleted)
  }
}

const list = new TodoList();

list.addTodo('a')
list.addTodo('b')
list.addTodo('c')
list.delTodo('b')
list.getTodo('a')?.toggle()
list.getTodo('c')?.toggle()

export { }
