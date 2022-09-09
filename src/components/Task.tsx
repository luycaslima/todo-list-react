import styles from './Task.module.css'
import {Check,Circle ,Trash}from 'phosphor-react'

interface TaskProps{
    id: string
    isCompleted: Boolean,
    title: string
    onDeleteTask: (id:string) => void
    onConcludedTask: (id:string) => void
}
export default function Task({id , isCompleted, title ,onDeleteTask, onConcludedTask} : TaskProps ){
    
    function deleteTask() {
        onDeleteTask(id)
    }

    function concludeTask(){
        onConcludedTask(id)
    }

    return(
        <div className={styles.taskWrapper}>
            <div>
                <span className=
                    {isCompleted ? 
                        styles.taskCompleted : 
                        styles.taskNotCompleted 
                    } 
                    onClick = {concludeTask}>
                    {isCompleted ? 
                        <span>
                            <Check size={20}/>
                        </span> : 
                        <Circle size={22}/> 
                    }
                </span>
                <p className={
                    isCompleted ? 
                        styles.taskTextCompleted : 
                        styles.taskTextNotCompleted 
                }>
                        {title}
                </p>
            </div>
            
            <button onClick={deleteTask}>
                <Trash size={22}/>
            </button>
        </div>
    )
}