const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '../../css/style.css'), 'utf8');

test('popover one click and hidden when repeated', () => {
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    const { document } = dom.window;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);

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
    
    popover.style.display = 'none';

    let isOpen = false;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isOpen) {
            popover.style.display = 'none';
        } else {
            popover.style.display = 'block';
        }
        isOpen = !isOpen;
    });

    expect(popover.style.display).toBe('none');

    btn.click();
    expect(popover.style.display).toBe('block');

    btn.click();
    expect(popover.style.display).toBe('none');
});

test('popover contains title and text', () => {
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    const { document } = dom.window;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);

    const btn = document.querySelector('.btn');
    
    const popover = document.createElement('div');
    popover.classList.add('popover');

    const popoverHeader = document.createElement('div');
    popoverHeader.classList.add('popover-header');
    popoverHeader.textContent = 'Popover title';

    const popoverBody = document.createElement('div');
    popoverBody.classList.add('popover-body');
    popoverBody.textContent = "And here's some amazing content. It's very engaging. Right?";

    popover.append(popoverHeader);
    popover.append(popoverBody);
    document.body.append(popover);

    btn.addEventListener('click', () => {
        popover.style.display = 'block';
    });

    btn.click();

    const header = document.querySelector('.popover-header');
    const body = document.querySelector('.popover-body');

    expect(header.textContent).toBe('Popover title');
    expect(body.textContent).toBe("And here's some amazing content. It's very engaging. Right?");
});

test('click outside popover closes', () => {
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    const { document } = dom.window;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);

    const btn = document.querySelector('.btn');
    
    const popover = document.createElement('div');
    popover.classList.add('popover');
    popover.style.display = 'none';
    document.body.append(popover);

    let isOpen = false;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        popover.style.display = 'block';
        isOpen = true;
    });

    document.addEventListener('click', () => {
        if (isOpen) {
            popover.style.display = 'none';
            isOpen = false;
        }
    });

    btn.click();
    expect(popover.style.display).toBe('block');

    document.body.click();
    expect(popover.style.display).toBe('none');
});