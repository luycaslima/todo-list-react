import todoLogo from '../assets/todo_logo.svg'
import styles from './Header.module.css'

export default function Header(){
    return(
        <div className={styles.headerWrapper}>
            <img src={todoLogo} alt="logo todo list" />
        </div>
    )
}