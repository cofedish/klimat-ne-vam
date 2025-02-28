$(document).ready(function(){
    // Главная карусель
    $('.slider').slick({
        autoplay: true,
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button class="slick-prev">←</button>',
        nextArrow: '<button class="slick-next">→</button>',
    });

    // Карусель клиентов
    $('.clients-carousel').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    // Плавная прокрутка
    $('nav a').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Отправка формы
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: $('#name').val(),
            phone: $('#phone').val()
        };
        fetch('https://example.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            $('#form-message').text('Форма успешно отправлена!');
            console.log('Успех:', data);
            $(this).trigger('reset');
        })
        .catch(error => {
            $('#form-message').text('Ошибка при отправке формы.');
            console.error('Ошибка:', error);
        });
    });
});