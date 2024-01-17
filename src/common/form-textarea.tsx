import styles from './common.module.scss'

const InputTextarea = ({name, id, placeholder, value, onChange}: any) => {
    return (
        <textarea className={styles.inputTextarea} name={name} placeholder={placeholder} value={value} onChange={onChange} id={id}></textarea>
    )
}

export default InputTextarea