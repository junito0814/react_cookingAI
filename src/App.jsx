import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashboardPage from "./pages/DashboardPage";
import GeneratePage from "./pages/GeneratePage";
import EditPage from "./pages/EditPage";
import StatusPage from "./pages/StatusPage";

function App() {

  // ① 起動時：localStorage から読み込む（無ければ空配列）
  const [contents, setContents] = useState(() => {
    const saved = localStorage.getItem("contents");
    return saved ? JSON.parse(saved) : [];
  });

  // ② contents が変わるたび：localStorage に保存する
  useEffect(() => {
    localStorage.setItem("contents", JSON.stringify(contents));
  }, [contents]);


  // 新しい1件を、リストの先頭に追加する
  function addContent(newItem) {
    setContents([newItem, ...contents]);
  }

  // id の1件だけを、changes の内容で書き換える
  function updateContent(id, changes) {
    setContents(
      contents.map((c) => (c.id === id ? { ...c, ...changes } : c))
    );
  }

  // id の1件を削除する
  function deleteContent(id) {
    setContents(contents.filter((c) => c.id !== id));
  }

  // いいね状態を切り替える
  function toggleLike(id) {
    setContents(
      contents.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c))
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 24, }}>
      <h1 style={{ color: "orange" }}>料理お助けAI</h1>
      <NavBar />

      <Routes>
        <Route path="/" element={<DashboardPage contents={contents} onDelete={deleteContent} onToggleLike={toggleLike} />} />
        <Route path="/generate" element={<GeneratePage onAdd={addContent} />} />
        <Route
          path="/edit/:id"
          element={<EditPage contents={contents} onUpdate={updateContent} />}
        />
        <Route path="/status/:statusName" element={<StatusPage contents={contents} onDelete={deleteContent} />}></Route>
      </Routes>
    </div>
  );
}

export default App;