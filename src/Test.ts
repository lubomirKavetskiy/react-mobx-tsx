import { observable, autorun, action, runInAction } from 'mobx';

class Person {
  @observable
  firstName: string

  constructor(name: string) {
    this.firstName = name
  }

  @action updFirstName(updName: string) {
    this.firstName = updName
  }
}

const newPerson = new Person('A')

autorun(() => console.log(newPerson.firstName))

//use decorator @action
newPerson.updFirstName("B")
console.log(newPerson.firstName)

//use runInAction function
runInAction(() => newPerson.firstName = "C")
console.log(newPerson.firstName)

// use action function
const updFirstName = action(() => newPerson.firstName = 'D')
updFirstName()
console.log(newPerson.firstName)

export { }