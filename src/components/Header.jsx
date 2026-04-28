import useI18n from '@/useI18n';

export default function Header() {
  const { t } = useI18n();

  return (
    <header>
      <div className="header-main">
        <div className="header-left">
          <h1>{t("header.title")}</h1>
          <div className="header-meta">
            <span className="meta-tag">[QR TOOL]</span>
            <span className="meta-tag accent">[V1.0]</span>
          </div>
        </div>
        <div className="header-right">
          <div className="status-block">
            <span className="status-dot"></span>
            <span className="status-label">SYS</span>
            <span className="status-value">ONLINE</span>
          </div>
          <div className="header-line"></div>
          <div className="header-stats">
            <span className="stat">[RAW]</span>
          </div>
        </div>
      </div>
      <div className="header-bar"></div>
    </header>
  );
}
