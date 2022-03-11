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
    shift = 0,
    itemWidth = slider.clientWidth,
    startTouch = undefined,
    lastTouch = undefined;

let
    getEvent = function () {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    };

const
    setPosition = () => {
        track.style.transform = `translateX(${position}px)`;
        dot.style.transform = `translateX(${Math.abs((position / itemWidth * 14))}px)`;
    },
    setPositionByTouch = () => {
        track.style.transform = `translateX(${shift}px)`;
        dot.style.transform = `translateX(${(-shift / itemWidth * 14)}px)`;
    },
    checkBtns = () => {
        btnLeft.disabled = position == 0;
        btnRight.disabled = position <= -(itemWidth * (itemsCount - 1));
    },
    setSize = () => {
        items.forEach((item) => {
            item.style.minWidth = `${itemWidth}px`;
        });
    },
    swap = (side) => {
        position += itemWidth * side;
        setPosition();
        checkBtns();
    };

setSize();
checkBtns();

window.addEventListener('resize', () => {
    itemWidth = slider.clientWidth;
    position = 0;
    setPosition();
    setSize();
    track.style.transition = "1.2s ease";
    dot.style.transition = "1.2s ease";
});

btnLeft.addEventListener('click', () => {
    swap(1);
});

btnRight.addEventListener('click', () => {
    swap(-1);
});

track.addEventListener('touchstart', () => {
    let evt = getEvent();
    startTouch = evt.clientX;

    dot.style.transition = "none";
    track.style.transition = "none";
});

track.addEventListener('touchmove', () => {
    let evt = getEvent();
    lastTouch = evt.clientX;

    shift = position - (startTouch - lastTouch);
    setPositionByTouch();
});

track.addEventListener('touchend', () => {
    dot.style.transition = "0.5s";
    track.style.transition = "0.5s";
    
    if (Math.abs(startTouch - lastTouch) >= 100) {
        if (lastTouch > startTouch && (position != 0)) {
            swap(1);
        }
        else if (lastTouch < startTouch && position > -((itemsCount - 1) * itemWidth)) {
            swap(-1);
        }
    }
    setPosition();
});

// review__slider end
