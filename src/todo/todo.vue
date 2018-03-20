<template>
	<section class="real-app">
		<input type="text" class="add-input" autofouce placeholder="做什么" @keyup.enter="addTodo">
		<item :todo="todo" v-for="todo in filterTodo" :key="todo.id" @del="deleteTodo"></item>
		<tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAll="clearAllCompletd"></tabs>
	</section>
</template>
<script>
import Item from './items.vue'
import Tabs from './tabs.vue'
let id = 0;
	export default {
		components:{
			Item,
			Tabs
		},
		computed: {
			filterTodo () {
				if (this.filter === 'all') {
					return this.todos
				}
				const completed = this.filter === 'completed';
				return this.todos.filter(todo => completed === todo.completed)
			}
		},
		data () {
			return {
				todos: [],
				filter: 'all'
			}
		},
		methods: {
			addTodo (e) {
				this.todos.unshift({
					id: id++,
					content: e.target.value.trim(),
					completed: false
				})
				e.target.value = ''
			},
			deleteTodo (id) {
				this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
			},
			toggleFilter (state) {
				this.filter = state
			},
			clearAllCompletd () {
				this.todos = this.todos.filter(todo => !todo.completed)
			}
		}
	}
</script>
<style lang="stylus" scoped>
.real-app
    width: 600px
    margin: 0 auto
    box-shadow: 0 0 5px #666	
   .add-input 
        position: relative
        margin: 0px
        width: 100%
        border: none
        font-size: 24px
        outline: none 
        color: inherit
        font-family: inherit 
        font-weight: inherit
        line-height: 1.4rem
        box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
        box-sizing border-box
        padding 16px 16px 16px 60px
</style>