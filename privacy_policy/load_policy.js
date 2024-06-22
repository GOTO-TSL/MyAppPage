document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const app = queryParams.get('app');
    const privacyPolicySection = document.getElementById('privacy-policy');
    let fileName = '';

    switch(app) {
        case 'shiritori':
            fileName = 'shiritori.md';
            break;
        case 'quiz':
            fileName = 'quiz.md';
            break;
        case 'color':
            fileName = 'color.md';
            break;
        default:
            privacyPolicySection.innerHTML = '<p>無効なアプリ指定です。</p>';
            return;
    }

    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            let htmlContent = '';
            lines.forEach((line, index) => {
                if (index === 0) {
                    htmlContent += `<h1>${line}</h1>`;
                } else if (line.match(/^\d+\.\s/)) {
                    htmlContent += `<h2>${line}</h2>`;
                } else {
                    htmlContent += `<p>${line}</p>`;
                }
            });
            privacyPolicySection.innerHTML = htmlContent;
        })
        .catch(error => {
            console.log(error);
            privacyPolicySection.innerHTML = '<p>プライバシーポリシーの読み込みに失敗しました。</p>';
        });
});
