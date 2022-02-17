import { useRef } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import todoStoreInstance from './store/TodoStore'
import Todo from './Todo'

const App = observer(({ todoStore, postsStore }) => {
	const todoInputRef = useRef(null)
	const todos = toJS(todoStore.todos)

	const posts = toJS(postsStore.posts)
	const arePostsLoading = toJS(postsStore.isLoading)

	function handleClick(e, type, options) {
		switch (type) {
			case 'addTodo':
				const name = todoInputRef.current.value
				todoStore.add(name)
				todoInputRef.current.value = ''
				break
			case 'toggleTodo':
				todoStore.toggle(options?.id)
				break
			case 'deleteTodo':
				todoStore.remove(options?.id)
				break
			case 'getPosts':
				postsStore.get()
				break
			case 'clearPosts':
				postsStore.clear()
				break
			default:
				break
		}
	}
	return (
		<div>
			<h3>TODOS</h3>
			<div>
				<input type="text" ref={todoInputRef} />
				<button onClick={(e) => handleClick(e, 'addTodo')}>add</button>
			</div>
			<ul>
				{todos.map((todo) => (
					<Todo key={todo.id} todoStore={todoStoreInstance} {...todo} />
				))}
			</ul>
			<h3>POSTS</h3>
			<div>
				<button onClick={() => handleClick(null, 'getPosts')}>Get posts</button>
				<button onClick={() => handleClick(null, 'clearPosts')}>
					Clear posts
				</button>
				{arePostsLoading ? (
					<div
						style={{
							height: '60vh',
							backgroundColor: 'rgba(0,0,0,.6)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<span className="rotate">Loading</span>
					</div>
				) : (
					<ul>
						{posts.map((post) => (
							<li key={post.id} style={{ borderTop: '1px solid black' }}>
								<h3>Title: {post.title}</h3>
								<p>{post.body}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
})

export default App
