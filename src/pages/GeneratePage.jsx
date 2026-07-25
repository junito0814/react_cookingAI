import { useState } from "react";
import ContentCard from "../components/ContentCard";
import "../App.css";

function App({onAdd}) {
    const [name, setName] = useState("");
    const [feel, setFeature] = useState("和食");
    const [passion, setTone] = useState("簡単");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState([]); // 生成物のリスト


    async function handleGenerate() {
        setLoading(true);
        setResult("");

        const prompt = `あなたは料理の案を出す係です。
                    ${name}の食材を使って、
                    気分${feel}、
                    手間：${passion}を汲み取って、
                    料理名、具材、、所要時間、工程、ワンポイントアドバイスを
                    具体的にわかりやすく見やすいレイアウトで300文字程度で書いてください。
                    `;

        const key = import.meta.env.VITE_GROQ_API_KEY;
        console.log("KEYある?", !!key, "／ gsk_で始まる?", key?.startsWith("gsk_"));

        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await res.json();
        const text = data.choices[0].message.content;
        // 新しい生成物を1件つくる
        const newItem = {
            id: Date.now(),      // 重複しない id（ミリ秒の数）
            name: name,
            body: text,
            status: "作りたい",
        };

        console.log("status:", res.status, "body:", data);

        if (!res.ok) {
            setResult("エラー " + res.status + "：" + (data.error?.message || "不明"));
            setLoading(false);
            return;
        }
        setResult(data.choices[0].message.content);
        // 既存リストの先頭に追加（元の配列は壊さず、新しい配列を作る）
        // setContents([newItem, ...contents]);
        onAdd(newItem);
        setLoading(false);
    }

    return (
        <div style={{ padding: 24, maxWidth: 480, backgroundColor:"#ffffff", borderRadius:"8%"}} className="page">

            <div className="form">
                <div className="item">
                    <span>使いたい食材 : </span>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="item">
                    <span>どんな気分か : </span>
                    <select value={feel} onChange={(e) => setFeature(e.target.value)}>
                        <option value="和食">和食</option>
                        <option value="中華">中華</option>
                        <option value="洋食">洋食</option>
                        <option value="なんでも">なんでも</option>
                    </select>
                </div>

                <div className="item">
                    <span>手間 : </span>
                    <select value={passion} onChange={(e) => setTone(e.target.value)}>
                        <option value="簡単">簡単</option>
                        <option value="ちょっと頑張る">ちょっと頑張る</option>
                        <option value="本気">本気</option>
                    </select>
                </div>

                <div className="item">
                    <button onClick={handleGenerate} disabled={loading} >
                        {loading ? "生成中…" : "生成する"}
                    </button>
                </div>

                <p>
                    生成すると「ダッシュボード」に追加されます
                </p>

            </div>
        </div>
    );
}


export default App;