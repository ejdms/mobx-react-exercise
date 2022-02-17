import { makeObservable, action, observable, toJS } from 'mobx'

const random = () => {
	const now = Date.now()
	const delta = Math.floor(Math.random() * 100000)
	return now + delta
}

function saveInLS(todos) {
	localStorage.setItem('todos', JSON.stringify(todos))
}

function getFromLS() {
	const todos = localStorage.getItem('todos')
	if (todos) {
		return JSON.parse(todos)
	}
	return []
}

class TodoStoreClass {
	todos = getFromLS()
	constructor() {
		makeObservable(this, {
			todos: observable,
			add: action,
			remove: action,
			toggle: action,
		})
	}
	add(name) {
		this.todos.push({
			id: random(),
			name,
			completed: false,
		})
		saveInLS(this.todos)
	}
	remove(id) {
		this.todos = this.todos.filter((todo) => todo.id !== id)
		saveInLS(this.todos)
	}
	toggle(id) {
		this.todos = this.todos.map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed
			}
			return todo
		})
		saveInLS(this.todos)
	}
}

const singleton = new TodoStoreClass()

export default singleton
