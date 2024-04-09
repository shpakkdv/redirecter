const ipAddressRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const mainLogoElement = document.getElementById('siteLogo');
mainLogoElement.src = siteLogo || "";

const mainElement = document.getElementsByTagName('main')[0];

/** @type {Record<string, { img?: string; ips: [ip: string, name: string][]>}} */
const allSections = sections || [];

Object.entries(allSections).forEach(([key, sectionData]) => {
  const { img, ips } = sectionData;

  const sectionElement = document.createElement('div');
  sectionElement.className = 'section';

  if (img) {
    const imgElement = document.createElement('img');
    imgElement.src = img;
    imgElement.alt = key;
    imgElement.className = 'sectionLogo';
    sectionElement.appendChild(imgElement);
  }

  const titleElement = document.createElement('p');
  titleElement.className = 'title'
  titleElement.innerText = `${key}:`;
  sectionElement.appendChild(titleElement);


  const listElement = document.createElement('ol');
  ips.forEach(([ip, name]) => {
    const ipElement = document.createElement('li');
    ipElement.innerHTML = `<b>${ip}</b> - ${name}`;

    if (!ipAddressRegExp.test(ip)) {
      console.error(`IP-адрес "${ip}" не действительный.`);
    }

    const goToButton = document.createElement('a');
    goToButton.target = '_blank';
    goToButton.href = `http://${ip}/`;
    goToButton.className = 'goTo';
    goToButton.innerText = 'Подключиться';
    ipElement.appendChild(goToButton);

    listElement.appendChild(ipElement);
  });
  sectionElement.appendChild(listElement);

  mainElement.appendChild(sectionElement);
});
