import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ContentCard from "../components/ContentCard";
import styles from "./DashboardPage.module.css";

const StatusPage = ({ contents, onDelete }) => {
    const { statusName } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

    const statuses = ["作りたい", "作った", "また作りたい"];

    const filteredContents = contents
        .filter((c) => c.status === statusName)
        .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "oldest") {
                return a.id - b.id;
            }
            return b.id - a.id;
        });

    return (
        <div>
            <h2>{statusName}</h2>

            <div className={styles.searchBarArea}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="商品名で検索"
                    className={styles.searchInput}
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={styles.sortSelect}
                >
                    <option value="newest">新しい順</option>
                    <option value="oldest">古い順</option>
                </select>
                <select
                    value={statusName}
                    onChange={(e) => navigate(`/status/${e.target.value}`)}
                    className={styles.sortSelect}
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {filteredContents.length === 0 ? (
                <p>
                    {searchTerm
                        ? `「${searchTerm}」に一致する商品はありません。`
                        : "まだありません。「生成する」から作ってみましょう。"}
                </p>
            ) : (
                filteredContents.map((item) => (
                    <Link
                        key={item.id}
                        to={`/edit/${item.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <ContentCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            body={item.body}
                            status={item.status}
                            onDelete={onDelete}
                        />
                    </Link>
                ))
            )}
        </div>
    );
};

export default StatusPage;