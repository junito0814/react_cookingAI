import { useNavigate } from "react-router-dom";
import styles from "./ContentCard.module.css";
import Status from "./Status";

function ContentCard({ id, name, body, status, liked, onDelete, onToggleLike }) {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <div className={styles.cardActions}>
                <button
                    type="button"
                    className={styles.editButton}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/edit/${id}`);
                    }}
                >
                    編集
                </button>
                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={(e) => {
                        e.preventDefault();
                        onDelete(id);
                    }}
                >
                    削除
                </button>
            </div>
            <button
                type="button"
                className={liked ? styles.likeButtonActive : styles.likeButton}
                onClick={(e) => {
                    e.preventDefault();
                    onToggleLike(id);
                }}
            >
                {liked ? "❤️ いいね" : "♡ いいね"}
            </button>
            <h3 className={styles.name}>{name}</h3>
            <Status status={status} />
            <p className={styles.body}>{body}</p>
        </div>
    );
}

export default ContentCard;