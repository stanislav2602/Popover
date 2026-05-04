import "../css/style.css";

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.btn');
    const popover = document.createElement('div');
    popover.classList.add('popover');

    const popoverHeader = document.createElement('div');
    popoverHeader.classList.add('popover-header');
    popoverHeader.textContent = 'Popover title';

    const popoverBody = document.createElement('div');
    popoverBody.classList.add('popover-body');
    popoverBody.textContent = "And here's some amazing content. It's very engaging. Right?";

    const popoverArrow = document.createElement('div');
    popoverArrow.classList.add('popover-arrow');

    popover.append(popoverHeader);
    popover.append(popoverBody);
    popover.append(popoverArrow);

    document.body.append(popover);

    let isOpen = false;

    const open = () => {
        const btnRect = btn.getBoundingClientRect();

        popover.style.display = 'block';
        popover.style.visibility = 'hidden';

        const popoverHeight = popover.offsetHeight;
        const popoverWidth = popover.offsetWidth;

        const offset = 10;
        
        const top = btnRect.top + window.scrollY - popoverHeight - offset;
        const left = btnRect.left + window.scrollX + btnRect.width / 2 - popoverWidth / 2;

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
        popover.style.visibility = 'visible';

        isOpen = true;
    };

    const close = () => {
        popover.style.display = 'none';
        popover.style.visibility = '';
        isOpen = false;      
    };

    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (isOpen) {
            close();
        } else {
            open();
        }
    });

    document.addEventListener('click', (e) => {
        if (isOpen && e.target !== btn && !popover.contains(e.target)) {
            close();
        }
    });
});
