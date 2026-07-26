import { useState } from "react";
import ContentCard from "../components/ContentCard";
import styles from "./DashboardPage.module.css";
import { Link } from "react-router-dom";


function DashboardPage({ contents, onDelete, onToggleLike }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const wantCount = contents.filter((c) => c.status === "作りたい").length;
    const doneCount = contents.filter((c) => c.status === "作った").length;
    const wantAgainCount = contents.filter((c) => c.status === "また作りたい").length;
    const totalLikeCount = contents.filter((c) => c.liked).length;
    const filteredContents = contents
        .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((item) => selectedStatus === "all" || item.status === selectedStatus)
        .sort((a, b) => {
            if (sortOrder === "oldest") {
                return a.id - b.id;
            }
            return b.id - a.id;
        });

    return (
        <div>
            <div className={styles.pageHeader}>
                <h2>生成したコンテンツ（全{contents.length}件）</h2>
                <span className={styles.likeSummary}>総いいね：{totalLikeCount}件</span>
            </div>

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
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className={styles.sortSelect}
                >
                    <option value="all">全て</option>
                    <option value="作りたい">作りたい</option>
                    <option value="作った">作った</option>
                    <option value="また作りたい">また作りたい</option>
                </select>
            </div>

            <div className={styles.statusCountArea} >
                <span>作りたい：{wantCount}件</span>
                <span>作った：{doneCount}件</span>
                <span>また作りたい：{wantAgainCount}件</span>
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
                            liked={item.liked}
                            onDelete={onDelete}
                            onToggleLike={onToggleLike}
                        />
                    </Link>
                ))
            )}
        </div>
    );
}

export default DashboardPage;