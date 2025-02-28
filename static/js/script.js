window.addEventListener("load", function () {
  // Получаем все элементы с классом .nav-link
  const navLinks = document.querySelectorAll(".nav-link");

  // Находим максимальную ширину среди всех ссылок
  let maxWidth = 0;
  navLinks.forEach((link) => {
    const width = link.offsetWidth;
    if (width > maxWidth) {
      maxWidth = width;
    }
  });

  // Устанавливаем максимальную ширину для всех ссылок
  navLinks.forEach((link) => {
    link.style.width = maxWidth + "px";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.2 }
  ); // Срабатывает, когда 20% элемента видны

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
});


