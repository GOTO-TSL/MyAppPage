document.addEventListener("DOMContentLoaded", () => {
    fetch("data/apps.json")
        .then(response => response.json())
        .then(apps => {
            const appList = document.getElementById("app-list");
            apps.forEach(app => {
                const appElement = document.createElement("div");
                appElement.className = "app";
                appElement.innerHTML = `
                    <div class="app-header">
                        <img src="images/${app.icon}" alt="${app.name}">
                        <div class="app-details">
                            <h3>${app.name} (${app.genre})</h3>
                            <p>${app.description}</p>
                        </div>
                    </div>
                    <div class="app-store-links">
                        ${app.storeLinks.map(link => link.platform === "App Store" ? 
                            `<a href="${link.url}" target="_blank"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ja-jp?size=250x83&amp;releaseDate=1629244800" alt="Download on the App Store"></a>` : 
                            `<a href="${link.url}" target="_blank"><img src="https://play.google.com/intl/ja/badges/static/images/badges/ja_badge_web_generic.png" alt="Get it on Google Play"></a>`).join(" ")}
                    </div>
                    <div class="app-privacy">
                        <a href="privacy/${app.privacyPolicy}" target="_blank">プライバシーポリシー</a>
                    </div>
                `;
                appList.appendChild(appElement);
            });
        });
});