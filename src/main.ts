interface Todo {
   readonly id: number
   checked: Boolean
   text: string
}

let todos: Todo[] = []

const input: HTMLInputElement | null = document.getElementById(
   'todo-input'
) as HTMLInputElement | null

const list_container: HTMLElement | null = document.getElementById('todo-list')

const todosHTML = (): string[] =>
   todos.map((todo: Todo) => {
      return `
   <li
   id=${todo.id}
                  class="todo-item rounded bg-blue-200 p-5 flex justify-between items-center my-1"
                  
               >
                  <div>
                     <input
                      ${todo.checked ? 'checked' : ''}
                        type="checkbox"
                        name="todo-check"
                        id="todo-check"
                        class="mr-2"
                        value="todo-check"
                     />
                     <span class="capitalize ${
                        todo.checked ? 'line-through' : ''
                     }" > ${todo.text} </span>
                  </div>
                  <button
                     class="hover:scale-110 active:scale-95 transition-all duration-300 ease-out bg-blue-500 w-5 h-5 flex justify-center items-center rounded-full p-4 text-white"
                  >
                     <i class="fa-solid fa-xmark"></i>
                  </button>
               </li>
  `
   })

input?.addEventListener('keydown', (e: KeyboardEvent) => {
   if (e.key === 'Enter') {
      const todoHTML = e.target as HTMLInputElement
      const todo: string = todoHTML.value
      const todoId: string = String(Math.random() * 100).split('.')?.[1] || ''
      const todoItem: Todo = { checked: false, text: todo, id: todoId }
      if (todo === '') return
      todos.push(todoItem)
      renderHTML()
      todoHTML.value = ''
   }
})

const renderHTML = (): void => {
   ;(list_container as HTMLElement).innerHTML = todosHTML().join('')
}

list_container?.addEventListener('click', (e: MouseEvent) => {
   const target = e.target as HTMLElement
   const todoItem = target.closest('.todo-item')

   if (todoItem) {
      const todoId: string | null = todoItem.getAttribute('id')

      // If checkbox was clicked
      if (target.matches('input[type="checkbox"]')) {
         const checkbox = target as HTMLInputElement
         const isChecked = checkbox.checked

         if (todoId) {
            const todo = todos.find((todo) => todo.id.toString() === todoId)
            if (todo) {
               todo.checked = isChecked
               renderHTML()
            }
         }
      }

      // If delete button was clicked
      if (target.matches('button') || target.matches('i.fa-xmark')) {
         todos = todos.filter((todo) => {
            if (typeof todo.id !== 'string' || typeof todoId !== 'string')
               return
            return todo.id !== todoId
         })
         ;(list_container as HTMLElement).innerHTML = todosHTML().join('')
      }
   }
})
