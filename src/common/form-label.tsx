import styles from './common.module.scss';

const LabelForm = ({ labelText }: { labelText: any }) => {
    return (
        <label className={styles.formLabel}>{labelText}</label>
    )
}

export default LabelForm;