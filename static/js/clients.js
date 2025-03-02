document.addEventListener("DOMContentLoaded", () => {
    const clients = [
        'client1.png', 'client2.png', 'client3.png',
        'client4.png', 'client5.png', 'client6.png',
        'client7.png', 'client8.png', 'client9.png'
    ];

    const track = document.getElementById('clientsTrack');

    // Дублируем массив для бесконечности
    const doubleClients = [...clients, ...clients];

    // Генерация HTML
    track.innerHTML = doubleClients.map(logo => `
        <img src="static/images/clients/${logo}"
             class="client-logo"
             alt="Логотип клиента">
    `).join('');

    // Drag-прокрутка
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => isDown = false);
    track.addEventListener('mouseup', () => isDown = false);

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    });
});