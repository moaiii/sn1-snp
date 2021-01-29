(async function() {
  document
    .getElementById('snp-slider')
    .addEventListener('change', function(event) {
      const url = window.location.pathname.split('/').slice(1, 3);
      const newNumber = Math.ceil((100 - event.target.value) / 5) * 5

      if (url.length === 1) {
        window.location.href = '/scotland/' + newNumber;
      } else {
        url[1] = Math.ceil((100 - event.target.value) / 5) * 5;
        window.location.href = '/' + url.join("/");
      }
    });

  // region selector

  const regionSelect = document.getElementById('region-select');

  regionSelect.addEventListener('change', async (event) => {
    const {selectedIndex, options} = event.target;
    const nextRegion = options[selectedIndex].text;
    window.location.href = '/' + nextRegion + '/0';
  });

  // menu toggle 

  const menu = document.getElementById('menu');
  const header = document.getElementById('header');
  const content = document.getElementById('content');
  const menuOpen = document.getElementById('menu-open-button');
  const menuClosed = document.getElementById('menu-close-button');

  menuOpen.addEventListener('click', async (event) => {
    menu.classList.add('--open');
    header.classList.add('--blur');
    content.classList.add('--blur');
  });

  menuClosed.addEventListener('click', async (event) => {
    menu.classList.remove('--open')
    header.classList.remove('--blur');
    content.classList.remove('--blur');
  });
    
  if (window.outerWidth < 462) {
    Array.from(document.getElementsByClassName('header-const-seats'))
      .map(elem => elem.innerText = 'Const seats');
    
    document.getElementById('sub-title').innerText = 'Move the slider to see how a 2nd indy list party can create a big majority at Holyrood!';
  }

  // init region 

  const regionFromUrl = decodeURI(window.location.pathname.split('/')[1] || 'scotland');

  regionSelect.value = regionFromUrl;

})()