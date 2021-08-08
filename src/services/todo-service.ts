export default class Todoservice {
  async addTodo() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert('todo saved in server');
  }

  async delTodo() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert('todo removed in server');
  }
}
