import Header from './components/Header'
import './global.css'
import {ChangeEvent, FormEvent,InvalidEvent, useState} from 'react'
import {PlusCircle} from 'phosphor-react'
import styles from './App.module.css'
import Task from './components/Task'
import TasksHeader from './components/TasksHeader'
import {v4 as uuidv4} from 'uuid'
import NoTasks from './components/NoTasks'

interface TaskObject{
  id: string
  isCompleted: Boolean,
  title: string
}

export default function App() {
  const [tasks,setTasks] = useState(Array<TaskObject>) 

  const [newTask,setNewTask] = useState('')
  const [concludedTasks,setConcludedTasks] = useState(0)
  const isNewTaskEmpty = newTask.length === 0 

  function handleCompletedTask(id : string){
    //criar uma lista nova, que armazena muda a task clicada para concluida e subsitui a lista existente
    const newTasksList = tasks.map(task => {  
        if (task.id == id){
          const newTask = task
          newTask.isCompleted = !newTask.isCompleted
          return newTask
        }
        return task
    })
    setTasks(newTasksList)

    const newConcludedTasks = tasks.reduce((completedTasks, task) =>{
      if(task.isCompleted){
        completedTasks++
      }

      return completedTasks
    },0)
    setConcludedTasks(newConcludedTasks)
  }

  function handleDeleteTask(id: string){
    const newTaskListWithoutDeleted = tasks.filter(task =>{
      return (task.id != id)
    })
    setTasks(newTaskListWithoutDeleted)
    
    //Conta o número de tarefas que estão concluidas
    const newConcludedTasks = newTaskListWithoutDeleted.reduce((completedTasks, task) =>{
      if(task.isCompleted){
        completedTasks++
      }
      return completedTasks
    },0)
    setConcludedTasks(newConcludedTasks)
  }

  function handleCreateNewTask(e : FormEvent){
    e.preventDefault()
    const task = {
        id: uuidv4(),
        title: newTask,
        isCompleted: false,
      }
    setTasks([...tasks,task])
    setNewTask('')
  }

  //Armazena o que está sendo digitado no input
  function handleNewTaskChange(e : ChangeEvent<HTMLInputElement>){
    e.target.setCustomValidity('')
    setNewTask(e.target.value)
  }
  //Impede que envie uma tarefa vazia e notifica o usuário
  function handleNewInvalidTask(e: InvalidEvent<HTMLInputElement>){
    e.target.setCustomValidity('Insira uma tarefa válida!')
  }

  return (
    <div>
      <Header />
      <div>
        <form 
          className={styles.taskForm}
          onSubmit={handleCreateNewTask}
          >
          <input 
            name="task-todo"
            placeholder='Adicione uma tarefa'
            onChange={handleNewTaskChange}
            value={newTask}
            onInvalid={handleNewInvalidTask}
            required
          />
          <button 
            type='submit'
            disabled={isNewTaskEmpty}
          >
            Criar
            <PlusCircle
              size={22}
            />
          </button>
        </form>
        <main className={styles.tasksWrapper}>
          <TasksHeader 
            numberOfTasks={tasks.length} 
            concludedTasks={concludedTasks}
          />
          {tasks.length != 0 ? 
            <div className={styles.tasksList}>
              {tasks.slice(0).reverse().map(task => {
                return(
                  <Task 
                    key={task.id}
                    id= {task.id}
                    title={task.title}
                    isCompleted={task.isCompleted}
                    onDeleteTask= {handleDeleteTask}
                    onConcludedTask = {handleCompletedTask}
                  />
                )
              })}
            </div> :
            <NoTasks/>
          }
        </main>
      </div>
    </div>
  )
}

