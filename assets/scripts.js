const STORE_BADGES = {
    "App Store": {
        src: "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ja-jp?size=250x83&releaseDate=1629244800",
        alt: "App Store からダウンロード",
        className: "badge--appstore"
    },
    "Google Play": {
        src: "https://play.google.com/intl/ja/badges/static/images/badges/ja_badge_web_generic.png",
        alt: "Google Play で手に入れよう",
        className: "badge--play"
    }
};

const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[ch]);

const renderStoreLinks = (storeLinks = []) => {
    if (storeLinks.length === 0) {
        return `<span class="app-coming-soon">Coming soon</span>`;
    }
    return storeLinks
        .map((link) => {
            const badge = STORE_BADGES[link.platform];
            if (!badge) return "";
            return `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(link.platform)} で ${badge.alt}">
                <img class="${badge.className}" src="${badge.src}" alt="${badge.alt}" loading="lazy">
            </a>`;
        })
        .join("");
};

const renderApp = (app) => {
    const el = document.createElement("article");
    el.className = "app";
    el.innerHTML = `
        <div class="app-header">
            <img class="app-icon" src="images/${escapeHtml(app.icon)}" alt="" width="72" height="72" loading="lazy">
            <div class="app-details">
                <h3 class="app-name">${escapeHtml(app.name)}</h3>
                <span class="app-genre">${escapeHtml(app.genre)}</span>
            </div>
        </div>
        <p class="app-description">${escapeHtml(app.description)}</p>
        <div class="app-footer">
            <div class="app-store-links">${renderStoreLinks(app.storeLinks)}</div>
            <a class="app-privacy" href="privacy/${escapeHtml(app.privacyPolicy)}" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
        </div>
    `;
    return el;
};

document.addEventListener("DOMContentLoaded", async () => {
    const appList = document.getElementById("app-list");
    const appCount = document.getElementById("app-count");
    const year = document.getElementById("year");

    if (year) year.textContent = String(new Date().getFullYear());

    try {
        const response = await fetch("data/apps.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const apps = await response.json();

        appList.replaceChildren(...apps.map(renderApp));
        if (appCount) appCount.textContent = `${apps.length} apps`;
    } catch (error) {
        console.error("Failed to load apps.json", error);
        appList.innerHTML = `<p class="app-list__error">アプリ一覧を読み込めませんでした。時間をおいて再度お試しください。</p>`;
    } finally {
        appList.removeAttribute("aria-busy");
    }
});
