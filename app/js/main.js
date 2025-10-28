(() => {
  let allPosts = [
    { class: 'bedroom_furniture', image: 'images/blog/1.jpg', date: 'August 15, 2024 | ', author: 'by Ann Summers | ', blockquote: ' “Simplicity is not the goal. It is the by-product of a good idea and modest expectations” ', blockquote_author: 'Paul rand', theme: 'Bedroom Furniture', title: "Red selfies edison bulb four dollar toast humblebrag for the furniture", text: "Everyday carry actually neutra authentic kogi shabby chic migas small batch craft beer. Literally williamsburg tote bag farm-to-table mustache ugh deep v irony. Af man bun copper mug iPhone enamel pin pug selvage hammock palo santo godard thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table" },
    { class: 'design', image: 'images/blog/2.jpg', date: 'August 14, 2024 | ', author: ' by Lux Morningstar | ', theme: ' Design', title: "Red selfies edison bulb ", text: "Everyday carry actually neutra authentic kogi shabby chic migas small batch craft beer. Literally williamsburg tote bag farm-to-table mustache ugh deep v irony. Af man bun copper mug iPhone enamel pin pug selvage hammock palo santo godard thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table" },
    { class: 'dining_room', image: 'images/blog/3.jpg', date: 'August 13, 2024 | ', author: ' by Lux Morningstar | ', theme: 'Dining room interior', title: " Red selfies edison bulb ", text: "Everyday carry actually neutra authentic kogi shabby chic migas small batch craft beer. Literally williamsburg tote bag farm-to-table mustache ugh deep v irony. Af man bun copper mug iPhone enamel pin pug selvage hammock palo santo godard thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table" },
    { class: 'office_furniture', image: 'images/blog/4.jpg', date: 'August 11, 2024 | ', author: ' by Ann Summers | ', theme: ' Office Furniture', title: "Red selfies edison bulb", text: "Everyday carry actually neutra authentic kogi shabby chic migas small batch craft beer. Literally williamsburg tote bag farm-to-table mustache ugh deep v irony. Af man bun copper mug iPhone enamel pin pug selvage hammock palo santo godard thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table" },
    { class: 'design', image: 'images/blog/1.jpg', date: 'August 4, 2024  | ', author: 'by Ann Summers | ', theme: ' Design', title: "Red selfies edison bulb", text: "Everyday carry actually neutra authentic kogi shabby chic migas small batch craft beer. Literally williamsburg tote bag farm-to-table mustache ugh deep v irony. Af man bun copper mug iPhone enamel pin pug selvage hammock palo santo godard thundercats coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin edison bulb farm-to-table" }
  ];

  let currentPosts = [...allPosts];

  const table = document.querySelector('.table');
  const pagination = document.querySelector('#pagination');
  const categoryList = document.querySelector('.blog__category-list');
  const notesOnPage = 2;
  let items = [];
  let activeItem;


  // ФУНКЦІЇ АНІМАЦІЇ

  function offset(el) {
    const rect = el.getBoundingClientRect();
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  const animOnScroll = () => {
    const currentAnimItems = document.querySelectorAll('._anim-items');
    if (currentAnimItems.length === 0) return;

    for (const animItem of currentAnimItems) {
      const animItemHeight = animItem.offsetHeight;
      const animItemOffSet = offset(animItem).top;
      const animStart = 4;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((window.scrollY > animItemOffSet - animItemPoint) && window.scrollY < (animItemOffSet + animItemHeight)) {
        animItem.classList.add(`_active`);
      } else {
        if (!(animItem.classList.contains(`_anim-no-hide`))) {
          animItem.classList.remove(`_active`);
        }
      }
    }
  }

  if (document.querySelectorAll('._anim-items').length > 0) {
    window.addEventListener(`scroll`, animOnScroll);
    setTimeout(animOnScroll, 300);
  }

  // Створення кнопок

  function setupPagination(data) {
    if (!pagination) return;
    pagination.innerHTML = '';
    items = [];
    const countOfItems = Math.ceil(data.length / notesOnPage);

    for (let i = 1; i <= countOfItems; i++) {
      let li_count = document.createElement('li');
      li_count.innerHTML = i;
      pagination.appendChild(li_count);
      items.push(li_count);
    }

    for (let item of items) {
      item.addEventListener('click', function () {
        showPage(this, currentPosts);
        window.scrollTo({ top: offset(table).top, behavior: 'smooth' });
      });
    }
  }


  // ПАГІНАЦІЯ. Відображення контенту сторінки

  function showPage(item, data) {
    if (!table || !data) return;

    if (activeItem) {
      activeItem.classList.remove('active');
    }
    activeItem = item;
    item.classList.add('active');

    const pageNum = +item.innerHTML;
    const start = (pageNum - 1) * notesOnPage;
    const end = start + notesOnPage;
    const notes = data.slice(start, end);

    table.innerHTML = '';

    for (const note of notes) {
      const blog__item = document.createElement('div');
      blog__item.classList.add('blog__item', note.class);


      blog__item.innerHTML = `
                <img class="blog__item-img" src="${note.image}" alt="blog image">
                <div class="blog__item-info">
                    <span class="blog__item-date">${note.date}</span>|
                    <a class="blog__item-author" href="#">${note.author}</a>|
                    <a class="blog__item-theme" href="#">${note.theme}</a>
                </div>
                <h3 class="blog__item-title animation-toLeft _anim-items _anim-no-hide">${note.title}</h3>
                <p class="blog__item-text">${note.text}</p>
            `;

      if (note.blockquote) {
        const blockquote = document.createElement('blockquote');
        blockquote.classList.add("blog__blockquote", "_anim-items", "_anim-no-hide", "animation-opacity");
        blockquote.innerHTML = `${note.blockquote} <div class="blog__blockquote-author">${note.blockquote_author}</div>`;
        blog__item.appendChild(blockquote);
      }

      table.appendChild(blog__item);
    }

    animOnScroll();
  }


  // Підрахунок постів у категоріях

  function updateCategoryCounts() {
    if (!categoryList) return;

    const counts = allPosts.reduce((acc, post) => {
      acc[post.class] = (acc[post.class] || 0) + 1;
      return acc;
    }, {});

    const categoryItems = categoryList.querySelectorAll('.blog__category-item');

    categoryItems.forEach(li => {
      const filterClass = li.dataset['f'];
      const link = li.querySelector('.blog__category-link');

      if (link) {
        let count = counts[filterClass] || 0;

        if (filterClass !== 'all') {
          const currentText = link.textContent.trim();
          link.textContent = `${currentText} (${count})`;
        }
      }
    });
  }


  //  ФІЛЬТРАЦІЯ 

  if (categoryList) {
    categoryList.addEventListener('click', event => {
      if (event.target.tagName !== 'A') return;
      event.preventDefault();

      const li = event.target.closest('li');
      if (!li) return;

      let filterClass = li.dataset['f'];

      if (filterClass === 'all') {
        currentPosts = [...allPosts];
      } else {
        currentPosts = allPosts.filter(post => post.class === filterClass);
      }

      setupPagination(currentPosts);

      if (items.length > 0) {
        showPage(items[0], currentPosts);
      }
    });
  }


  // 7. ІНІЦІАЛІЗАЦІЯ (ПЕРШЕ ЗАВАНТАЖЕННЯ)

  updateCategoryCounts();
  setupPagination(allPosts);
  if (items.length > 0) {
    showPage(items[0], allPosts);
  }

})();



/* | СЛАЙДЕРИ, МЕНЮ, MIXITUP та ПРОГРЕС (БЛОК JQUERY) | */


$(function () {
  // ---- Меню та Сайдбар ----
  $('.header__btn').on('click', function () {
    $('.rightside-menu').removeClass('rightside-menu--close');
  });
  $('.rightside-menu__close').on('click', function () {
    $('.rightside-menu').addClass('rightside-menu--close');
  });

  $('.header__btn-menu').on('click', function () {
    $('.menu').toggleClass('menu--open');
  });

  // ---- Адаптивні зміни елементів ----
  if ($(window).width() < 651) {
    $('.works-path__item--measurements').appendTo($('.works-path__items-box'));
  }

  // ---- Слайдер 1: Top Slider ----
  $('.top__slider').slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true
  });

  // ---- Слайдер 2: Contact Slider ----
  $('.contact-slider').slick({
    slidesToShow: 10,
    slidesToScroll: 10,
    dots: true,
    arrows: false,
    responsive: [
      { breakpoint: 1700, settings: { slidesToShow: 8, slidesToScroll: 8, } },
      { breakpoint: 1400, settings: { slidesToShow: 7, slidesToScroll: 7, } },
      { breakpoint: 1000, settings: { slidesToShow: 6, slidesToScroll: 6, } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3, } },
      { breakpoint: 551, settings: { slidesToShow: 2, slidesToScroll: 2 } }
    ]
  });

  // ---- Слайдер 3: Article Slider ----
  $('.article-slider__box').slick({
    prevArrow: '<button type="button" class="article-slider__arrow article-slider__arrow-left"><img src="/images/arrow-slide-left.png" alt="arrow left"></button>',
    nextArrow: '<button type="button" class="article-slider__arrow article-slider__arrow-right"><img src="/images/arrow-slide-right.png" alt="arrow right"></button>',
  });

  // ---- MixItUp (Галерея) ----
  if ($('.gallery__inner').length) {
    var mixer = mixitup('.gallery__inner', {
      load: {
        filter: '.living'
      }
    });
  }


  /* ПРОГРЕС БАР  */


  var time = 2, cc = 1;
  $(window).scroll(function () {
    $('#counter').each(function () {
      var
        cPos = $(this).offset().top,
        topWindow = $(window).scrollTop();
      if (cPos < topWindow + (document.documentElement.clientHeight - 58)) {
        if (cc < 2) {
          $('.number').addClass('viz');
          $('div').each(function () {
            var
              i = 1,
              num = $(this).data('num'),
              step = 1000 * time / num,
              that = $(this),
              int = setInterval(function () {
                if (i <= num) {
                  that.html(i);
                }
                else {
                  cc = cc + 2;
                  clearInterval(int);
                }
                i++;
              }, step);
          });
        }
      }
    });
  });

}); 