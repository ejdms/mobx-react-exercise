import { observer } from 'mobx-react-lite'

const Todo = observer(({ todoStore, id, name, completed }) => {
	function handleClick(e, type, options) {
		switch (type) {
			case 'toggleTodo':
				todoStore.toggle(options?.id)
				break
			case 'deleteTodo':
				todoStore.remove(options?.id)
				break
			default:
				break
		}
	}
	return (
		<li key={id} onClick={() => handleClick(null, 'toggleTodo', { id })}>
			[{completed ? 'x' : ' '}]{name}
			<button
				style={{ marginLeft: 50 }}
				onClick={() => handleClick(null, 'deleteTodo', { id: id })}
			>
				delete
			</button>
		</li>
	)
})

export default Todo
