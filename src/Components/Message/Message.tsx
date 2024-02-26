import styles from './Message.module.css';

interface IMessageProps {
	msg: string,
	type: string
}

function Message({msg, type}: IMessageProps) {
	return (
			<div className={`${styles.message} ${styles[type]}`}>
				<p>{msg}</p>
			</div>
	)
}
export default Message