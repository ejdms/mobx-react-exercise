import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as stores from './store'
import './index.css'
// import { configure } from 'mobx'

// configure({
// 	useProxies: 'never',
// })

ReactDOM.render(
	<React.StrictMode>
		<App {...stores.default} />
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
