document.getElementById('callbackForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const button = form.querySelector('button');
    const originalText = button.textContent;

    // Данные формы
    const payload = {
        name: form.name.value.trim(),
        phone_number: form.phone.value.trim(),
        type_of_service: 'all'
    };

    // Валидация
    if (!payload.name || !payload.phone_number) {
        alert('Заполните все поля!');
        return;
    }

    try {
        button.textContent = 'Отправка...';
        button.disabled = true;

        // Отправка на API
        const response = await fetch('https://api.climatvam-nsk.ru/callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Ошибка сервера');

        alert('Заявка отправлена, совсем скоро мы с вами свяжемся!');
        form.reset();

    } catch (error) {
        alert('Ошибка: ' + error.message);
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
});
