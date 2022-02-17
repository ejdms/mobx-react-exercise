import { makeObservable, action, observable } from 'mobx'

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}

class PostsStoreClass {
	posts = []
	isLoading = false
	constructor() {
		makeObservable(this, {
			posts: observable,
			isLoading: observable,
			get: action,
			clear: action,
		})
	}
	async get() {
		this.isLoading = true
		let data = await fetch('https://jsonplaceholder.typicode.com/posts')
		data = await data.json()
		await sleep(2000)
		this.posts = data
		this.isLoading = false
	}
	clear() {
		this.posts = []
	}
}

const singleton = new PostsStoreClass()

export default singleton
