import ContentCard from "../components/ContentCard";
import styles from "./DashboardPage.module.css";
import { Link } from "react-router-dom";


function DashboardPage({ contents }) {
    const wantCount = contents.filter((c) => c.status === "作りたい").length;
    const doneCount = contents.filter((c) => c.status === "作った").length;
    const wantAgainCount = contents.filter((c) => c.status === "また作りたい").length;

    return (
        <div>
            <h2>生成したコンテンツ（全{contents.length}件）</h2>
            <div className={styles.statusCountArea} >

                <Link to="/status/作りたい">
                    <span>作りたい：{wantCount}件</span>
                </Link>

                <Link to="/status/作った">
                    <span>作った：{ doneCount }件</span>                
                </Link>

                <Link to="/status/また作りたい">
                    <span>また作りたい：{ wantAgainCount }件</span>                
                </Link>
            </div>

            {contents.length === 0 ? (
                <p>まだありません。「生成する」から作ってみましょう。</p>
            ) : (
                    contents.map((item) => (
                        <Link
                            key={item.id}
                            to={`/edit/${item.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                    <ContentCard
                        key={item.id}
                        name={item.name}
                        body={item.body}
                        status={item.status}
                    />
                    </Link>
                ))
            )}
        </div>
    );
}

export default DashboardPage;