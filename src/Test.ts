import { makeObservable, observable, autorun, action, computed } from 'mobx';

class Person {
  @observable
  dollars = 100

  constructor() {
    makeObservable(this)
  }

  @computed
  get euros() {
    return this.dollars * .9
  }

  @action
  withdraw() {
    this.dollars -= 10
  }
}

const newPerson = new Person()

console.log('Before Observing - Not Cached', newPerson.euros);
console.log('Before Observing - Not Cached', newPerson.euros);

const dispose = autorun(
  () => { console.log(newPerson.euros) }
)

console.log('After Observing - Cached', newPerson.euros);
console.log('After Observing - Cached', newPerson.euros);
console.log('After Observing - Cached', newPerson.euros);
console.log('After Observing - Cached', newPerson.euros);

newPerson.withdraw()

dispose()

export { }
