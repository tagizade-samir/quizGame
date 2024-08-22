import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getTodos(query) {
  await fakeNetwork(`getTodos:${query}`);
  let todos = await localforage.getItem("todos");
  if (!todos) todos = [];
  if (query) {
    todos = matchSorter(todos, query, { keys: ["name", "comment"] });
  }
  return todos.sort(sortBy("last", "createdAt"));
}

export async function createTodo() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  const lastAdded = await localforage.getItem('lastAdded');
  const newLastAdded = lastAdded ? lastAdded + 1 : 1;
  let todo = { id, createdAt: Date.now(), name: `Todo #${newLastAdded}`, comment: '' };
  await localforage.setItem('lastAdded', newLastAdded);
  let todos = await getTodos();
  todos.unshift(todo);
  await set(todos);
  return todo;
}

export async function getTodo(id) {
  await fakeNetwork(`todo:${id}`);
  let todos = await localforage.getItem("todos");
  let todo = todos.find(todo => todo.id === id);
  return todo ?? null;
}

export async function updateTodo(id, updates) {
  await fakeNetwork();
  let todos = await localforage.getItem("todos");
  let todo = todos.find(todo => todo.id === id);
  if (!todo) throw new Error("No todo found for", id);
  Object.assign(todo, updates);
  await set(todos);
  return todo;
}

export async function deleteTodo(id) {
  let todos = await localforage.getItem("todos");
  let index = todos.findIndex(todo => todo.id === id);
  if (index > -1) {
    todos.splice(index, 1);
    await set(todos);
    return true;
  }
  return false;
}

function set(todos) {
  return localforage.setItem("todos", todos);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 1800);
  });
}