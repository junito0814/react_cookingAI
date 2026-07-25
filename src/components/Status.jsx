import styles from "./Status.module.css";

const Status = ({ status }) => {
    let label = "作りたい";
    let color = styles.want;

    if (status === "作った") {
        label = "作った";
        color = styles.done;
    } else if(status === "また作りたい"){
        label = "また作りたい";
        color = styles.wantAgain;
    }
    return <span className={`${styles.badge} ${color}`}>{label}</span>;
}

export default Status;