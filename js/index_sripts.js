// review__slider start

const
    slider = document.querySelector('.review__slider'),
    track = document.querySelector('.review__track'),
    btnLeft = document.querySelector('#btn-left'),
    btnRight = document.querySelector('#btn-right'),
    items = document.querySelectorAll('.review__item'),
    dot = document.querySelector('.review__blue-dot'),
    itemsCount = items.length;

let
    position = 0,
    first = true,
    posX1 = 0,
    shift = 0,
    itemWidth = slider.clientWidth;

let
    getEvent = function () {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    };

const
    setPosition = () => {
        track.style.transform = `translateX(${position}px)`;
        dot.style.transform = `translateX(${Math.abs((position / itemWidth * 14))}px)`;
    },
    setPosition_touch = () => {
        track.style.transform = `translateX(${position - shift / 10}px)`;
        dot.style.transform = `translateX(${Math.abs(((position - shift / 10) / itemWidth * 14))}px)`;
    },
    checkBtns = () => {
        btnLeft.disabled = position == 0;
        btnRight.disabled = position <= -(itemWidth * (itemsCount - 1));
    },
    setSize = () => {
        items.forEach((item) => {
            item.style.minWidth = `${itemWidth}px`;
        });
    };

setSize();
checkBtns();

window.addEventListener('resize', () => {
    itemWidth = slider.clientWidth;
    position = 0;
    setPosition();
    setSize();
});

btnLeft.addEventListener('click', () => {
    position += itemWidth;
    setPosition();
    checkBtns();
});


btnRight.addEventListener('click', () => {
    position -= itemWidth;
    setPosition();
    checkBtns();
});

track.addEventListener('mouse', () => {
    position -= itemWidth;
    setPosition();
    checkBtns();
});

track.addEventListener('touchmove', () => {
    let evt = getEvent();
    if (first) {
        posX1 = evt.clientX;
        first = false;
    }
    else {
        shift += posX1 - evt.clientX;
    }
    setPosition_touch();
});

track.addEventListener('touchend', () => {

    if ((position + (shift / 10)) < position) {
        position += itemWidth;
    }
    else {
        position -= itemWidth;
    }

    shift = 0;
    first = true;

    if (position > 0) position = 0;
    if (position <= -(itemWidth * (itemsCount - 1))) position = -(itemWidth * (itemsCount - 1));

    setPosition();
    checkBtns();
});

// review__slider end