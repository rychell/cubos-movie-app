import { IChip } from './../../@types/IChip';

import styles from './styles.module.css'

const Chip = ({ text }: IChip) => {
    return (
        <span className={styles.chip}>{text}</span>
    )
}

export { Chip }