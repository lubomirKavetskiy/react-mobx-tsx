import { makeObservable, observable, autorun, action } from 'mobx';

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

  @action updFirstName(upd_first_name: string) {
    this.firstName = upd_first_name
  }

  @action updLastName(upd_last_name: string) {
    this.lastName = upd_last_name
  }

  @action updFullName(upd_first_name: string, upd_last_name: string) {
    this.firstName = upd_first_name
    this.lastName = upd_last_name
  }
}

const newPerson = new Person('A', 'a')

autorun(() => { console.log(newPerson.firstName, newPerson.lastName) })

newPerson.updFirstName("B")
newPerson.updLastName("b")
newPerson.updFullName("C", "c")

export { }
