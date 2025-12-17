import "./style.css";

export default function Header() {
  return (
    <header className="header">
      {/* 左侧 */}
      <div className="header-left">
        <span className="header-title">云服务器</span>
        <span className="header-lock">🔒</span>
      </div>

      {/* 右侧 */}
      <div className="header-right">
        <span className="header-badge">AI</span>

        <button className="icon-btn" aria-label="star">
          ⭐
        </button>
        <button className="icon-btn" aria-label="share-user">
          👤
        </button>
        <button className="icon-btn" aria-label="notify">
          🔔
        </button>

        <button className="btn">分享</button>
        <button className="btn primary">编辑</button>
      </div>
    </header>
  );
}
