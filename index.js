const ipAddressRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const mainElement = document.getElementsByTagName('main')[0];

/** @type {Record<string, [ip: string, name: string][]>} */
const allSections = sections || [];

Object.entries(allSections).forEach(([key, sectionData]) => {
  const sectionElement = document.createElement('div');
  sectionElement.className = 'section';

  const titleElement = document.createElement('p');
  titleElement.className = 'title'
  titleElement.innerText = `${key}:`;
  sectionElement.appendChild(titleElement);

  const listElement = document.createElement('ol');
  sectionData.forEach(([ip, name]) => {
    const ipElement = document.createElement('li');
    ipElement.innerHTML = `<b>${ip}</b> - ${name}`;

    const goToButton = document.createElement('button');
    goToButton.addEventListener('click', () => {
      if (ipAddressRegExp.test(ip)) {
        window.location.href = `http://${ip}/`
      } else {
        window.alert('IP-адрес не действительный.');
      }
    });

    goToButton.className = 'goTo'
    goToButton.innerText = '➡️';
    ipElement.appendChild(goToButton);

    listElement.appendChild(ipElement);
  });
  sectionElement.appendChild(listElement);

  mainElement.appendChild(sectionElement);
});
