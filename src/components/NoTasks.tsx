import {ClipboardText} from 'phosphor-react'
import styles from './NoTasks.module.css'

export default function NoTasks(){
    return(
        <div className={styles.noTasksWrapper}>
            <ClipboardText size={64}/>
            <span>Você ainda não tem tarefas cadastradas</span>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}