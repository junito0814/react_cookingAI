import styles from "./ContentCard.module.css";
import Status from "./Status";

function ContentCard({ name, body, status }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.name}>{name}</h3> 
            <Status status={ status } />
            <p className={styles.body}>{body}</p>
        </div>
    );
}

export default ContentCard;