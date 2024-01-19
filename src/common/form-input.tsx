import styles from "./common.module.scss";

const InputForm = ({ type, value, onChange, id, name, placehloder }: { type: string, value: string | number, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, id: string, name: string, placehloder: string }) => {
    return (
        <input className={styles.inputForm} type={type} value={value} onChange={onChange} id={id} name={name} placeholder={placehloder} />
    )
}

export default InputForm;