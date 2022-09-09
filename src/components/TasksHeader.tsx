import styles from './TasksHeader.module.css'

interface TaskHeaderProps{
    numberOfTasks : number,
    concludedTasks: number
}

export default function TasksHeader({numberOfTasks, concludedTasks} : TaskHeaderProps){
    return(
        <header className={styles.tasksHeader}>
            <div className={styles.createdTasks}>
              Tarefas Criadas 
              <span>
                {numberOfTasks}
              </span>
            </div>
            <div className={styles.concludedTasks}>
              Concluídas  
              <span>
                {numberOfTasks != 0  ?  
                  `${concludedTasks} de ${numberOfTasks}` : 
                  concludedTasks}
              </span>
            </div>
        </header>
    )
}