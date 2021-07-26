import { makeObservable, observable, autorun, runInAction } from 'mobx';

const awaitForPromise = () => new Promise(resolve => setTimeout(resolve, 1000))

class Person {
  @observable
  firstName: string

  @observable
  lastName: string

  constructor(first_name: string, last_name: string) {
    this.firstName = first_name
    this.lastName = last_name
    makeObservable(this)
  }
}

const newPerson = new Person('A', 'a')

autorun(() => { console.log(newPerson.firstName, newPerson.lastName) })

runInAction(async () => {
  newPerson.firstName = "B"

  await awaitForPromise()

  newPerson.lastName = "b"
})

export { }
