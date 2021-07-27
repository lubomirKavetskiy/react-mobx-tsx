import { makeObservable, observable, autorun, reaction, when, action } from 'mobx';

class Person {
  @observable
  age: number = 10

  @observable
  isAlive: boolean = true

  constructor() {

    makeObservable(this)

    when(
      () => this.age > 100,
      () => this.bury()
    )
  }

  @action
  bury() {
    this.isAlive = false
  }

  @action
  setAge(age: number) {
    this.age = age
  }
}

const newPerson = new Person()

const autorunDisposer = autorun(
  () => { console.log(newPerson.age, newPerson.isAlive) }
)

const reactionDisposer = reaction(
  () => !newPerson.isAlive,
  () => console.log('person died')
)

newPerson.setAge(101)

setTimeout(() => { reactionDisposer(); autorunDisposer() }, 2000)
setTimeout(() => { newPerson.setAge(50); console.log('we disposed of the reactions (autorun and reaction) on changes') }, 2500)

export { }
