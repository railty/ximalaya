import CryptoJS from 'crypto-js';

// --- Configuration ---
const LABELS = {
  downloadAll: '下载全部', // Download All
  downloadPage: '下载本页', // Download Page
  list: '本地文件列表', // List
  downloading: '正在下载' // Downloading
};

// --- Utilities ---

function sanitize(filename) {
  return filename.replace(/[<>:"\/\\|?*\x00-\x1F]/g, ' ');
}

async function sleep(n) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), n)
  });
}

function safeClick(el) {
  if (!el) return;
  console.log("Safe clicking:", el);
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  el.dispatchEvent(event);
}

function decryptUrl(encryptedUrl) {
  return CryptoJS.AES.decrypt({
    ciphertext: CryptoJS.enc.Base64url.parse(encryptedUrl)
  }, CryptoJS.enc.Hex.parse('aaad3e4fd540b0f79dca95606e72bf93'), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
}

// --- Ximalaya Logic ---

function getSounds(soundList) {
  const album = document.querySelector("h1.title").textContent;
  const lis = Array.from(soundList.querySelectorAll("div.sound-list > ul > li"));
  const sounds = lis.map((li) => {
    const divs = Array.from(li.querySelectorAll(":scope > div"));
    const num = divs[0].textContent.trim();
    const href = divs[1].querySelector("a").href;
    const title = divs[1].querySelector("a").title;
    const id = href.match(/\/sound\/(\d+)/)[1];

    return {
      href,
      title: sanitize(title),
      num,
      id,
      album: sanitize(album)
    }
  });
  return sounds;
}

async function getTrackInfo(track) {
  const url = `https://www.ximalaya.com/mobile-playpage/track/v3/baseInfo/${new Date().getTime()}?` + new URLSearchParams({
    "device": "web",
    "trackId": track.id,
    "trackQualityLevel": 2  //high quality
  });

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        "referer": `https://www.ximalaya.com/sound/${track.id}`,
      }
    });

    const result = await res.json();
    console.log("result = ", result);
    let urls = result["trackInfo"]["playUrlList"];
    const bestUrl = urls[0];
    track.decrypedUrl = await decryptUrl(bestUrl.url);
    track.ext = bestUrl.type.substring(0, 3);
  }
  catch (ex) {
    console.error(ex);
  }
}

async function fetchTrack(track) {
  const res = await fetch(track.decrypedUrl);
  track.blob = await res.blob();
}

async function dlLocal(blob, fileName) {
  if (existingFiles.includes(fileName)) {
    console.log("File already exists, skipping download:", fileName);
    return;
  }
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

async function dlPage(sounds, button) {
  const originalText = button.innerText;
  button.disabled = true;
  button.classList.add('disabled');

  for (let track of sounds) {
    const baseName = `${track.num}-${track.title}`;
    if (existingFiles.some(f => f.startsWith(baseName))) {
      console.log(`Skipping ${baseName} - already exists in folder.`);
      continue;
    }

    button.innerText = `${LABELS.downloading} ${track.num} ${track.title}`;
    await sleep(1000);
    await getTrackInfo(track);
    await fetchTrack(track);
    await dlLocal(track.blob, `${track.num}-${track.title}.${track.ext}`);
  }

  button.innerText = originalText;
  button.classList.remove('disabled');
  button.disabled = false;
}

let existingFiles = [];
async function listFiles() {
  try {
    const dirHandle = await window.showDirectoryPicker();
    existingFiles = [];
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'file') {
        existingFiles.push(entry.name);
      }
    }
    console.log("Files already in folder:", existingFiles);
    return existingFiles;
  } catch (err) {
    console.error("Error picking directory:", err);
  }
}

// --- Main Flow ---

// --- Main Flow ---

function initUI() {
  const soundList = document.querySelector("div#anchor_sound_list");
  if (!soundList) return;

  const pagination = soundList.querySelector("ul.pagination-page");
  if (!pagination) return;

  // Check if buttons already exist to avoid duplicate injection
  if (document.getElementById('xm-dl-all')) return;

  const container = pagination.parentElement;

  const buttonDl = document.createElement('button');
  buttonDl.id = 'xm-dl-all';
  buttonDl.innerText = LABELS.downloadAll;
  buttonDl.className = 'xui-btn';
  buttonDl.style.marginRight = '10px';

  const buttonPage = document.createElement('button');
  buttonPage.id = 'xm-dl-page';
  buttonPage.innerText = LABELS.downloadPage;
  buttonPage.className = 'xui-btn';
  buttonPage.style.marginRight = '10px';

  const buttonList = document.createElement('button');
  buttonList.id = 'xm-dl-list';
  buttonList.innerText = LABELS.list;
  buttonList.className = 'xui-btn';

  container.prepend(buttonList);
  container.prepend(buttonPage);
  container.prepend(buttonDl);

  buttonList.addEventListener('click', async () => {
    await listFiles();
  });

  buttonPage.addEventListener('click', async () => {
    let sounds = getSounds(soundList);
    await dlPage(sounds, buttonPage);
  });

  buttonDl.addEventListener('click', async () => {
    let sounds = getSounds(soundList);
    await dlPage(sounds, buttonDl);

    for (let i = 0; i < 100; i++) {
      const nextPage = document.querySelector("ul.pagination-page > li.active").nextElementSibling;
      if (nextPage) {
        safeClick(nextPage.querySelector("a"));

        let newSounds = getSounds(soundList);
        while (newSounds[0].id === sounds[0].id) {
          await sleep(500);
          const btnClose = Array.from(document.querySelectorAll("button.geetest_close")).find(btn => btn.offsetParent !== null);
          if (btnClose) {
            safeClick(btnClose);
            await sleep(1500);
            safeClick(nextPage.querySelector("a"));
            await sleep(2000);
            newSounds = getSounds(soundList);
          }
          await sleep(1000);
          newSounds = getSounds(soundList);
        }
        sounds = newSounds;
        await dlPage(sounds, buttonDl);
      }
      else break;
    }
  });
}

const observer = new MutationObserver((mutations) => {
  if (document.querySelector("div#anchor_sound_list")) {
    initUI();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial check
if (document.readyState !== 'loading') {
  initUI();
}


