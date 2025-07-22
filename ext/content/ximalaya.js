import CryptoJS from 'crypto-js';

if (document.readyState !== 'loading'){

  const intervalId = setInterval(()=>{
    const soundList = document.querySelector("div#anchor_sound_list");
    if (soundList){
      const pagination = soundList.querySelector("ul.pagination-page");
      if (pagination){
        clearInterval(intervalId);    
        //this need a bit rework
        //xmly use ajax to show the new album, and will destroy the track list, along with my buttons.
        //so maybe keep this interval alive, check if the button not exist and then add it back.

        function sanitize(filename){
          return filename.replace(/[<>:"\/\\|?*\x00-\x1F]/g, ' ');
        }

        function getSounds(){
          const album = document.querySelector("h1.title").textContent;

          const lis = Array.from(soundList.querySelectorAll("div.sound-list > ul > li"));
          const sounds = lis.map((li)=>{
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
          //sounds = sounds.splice(0, 5);
          /*
          console.log("set sounds", sounds);
          chrome.storage.local.set({ sounds }).then(() => {
            console.log("set sounds completed", sounds);
          });
          */

        }

        function decryptUrl(encryptedUrl) {
            return CryptoJS.AES.decrypt({
                ciphertext: CryptoJS.enc.Base64url.parse(encryptedUrl)
            }, CryptoJS.enc.Hex.parse('aaad3e4fd540b0f79dca95606e72bf93'), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);
        }

        function decryptUrl_20250720(encryptedUrl) {
          const o = new Uint8Array([183, 174, 108, 16, 131, 159, 250, 5, 239, 110, 193, 202, 153, 137, 251, 176, 119, 150, 47, 204, 97, 237, 1, 71, 177, 42, 88, 218, 166, 82, 87, 94, 14, 195, 69, 127, 215, 240, 225, 197, 238, 142, 123, 44, 219, 50, 190, 29, 181, 186, 169, 98, 139, 185, 152, 13, 141, 76, 6, 157, 200, 132, 182, 49, 20, 116, 136, 43, 155, 194, 101, 231, 162, 242, 151, 213, 53, 60, 26, 134, 211, 56, 28, 223, 107, 161, 199, 15, 229, 61, 96, 41, 66, 158, 254, 21, 165, 253, 103, 89, 3, 168, 40, 246, 81, 95, 58, 31, 172, 78, 99, 45, 148, 187, 222, 124, 55, 203, 235, 64, 68, 149, 180, 35, 113, 207, 118, 111, 91, 38, 247, 214, 7, 212, 209, 189, 241, 18, 115, 173, 25, 236, 121, 249, 75, 57, 216, 10, 175, 112, 234, 164, 70, 206, 198, 255, 140, 230, 12, 32, 83, 46, 245, 0, 62, 227, 72, 191, 156, 138, 248, 114, 220, 90, 84, 170, 128, 19, 24, 122, 146, 80, 39, 37, 8, 34, 22, 11, 93, 130, 63, 154, 244, 160, 144, 79, 23, 133, 92, 54, 102, 210, 65, 67, 27, 196, 201, 106, 143, 52, 74, 100, 217, 179, 48, 233, 126, 117, 184, 226, 85, 171, 167, 86, 2, 147, 17, 135, 228, 252, 105, 30, 192, 129, 178, 120, 36, 145, 51, 163, 77, 205, 73, 4, 188, 125, 232, 33, 243, 109, 224, 104, 208, 221, 59, 9]);
          const a = new Uint8Array([204, 53, 135, 197, 39, 73, 58, 160, 79, 24, 12, 83, 180, 250, 101, 60, 206, 30, 10, 227, 36, 95, 161, 16, 135, 150, 235, 116, 242, 116, 165, 171]);
      
          encryptedUrl = encryptedUrl.replace(/_/g, '/').replace(/-/g, '+');
          const padding = '='.repeat((4 - encryptedUrl.length % 4) % 4);
          const encryptedData = atob(encryptedUrl + padding);
      
          if (encryptedData.length < 16) {
            return encryptedUrl;
          }
      
          const data = new Uint8Array(encryptedData.slice(0, -16).split('').map(char => char.charCodeAt(0)));
          const iv = new Uint8Array(encryptedData.slice(-16).split('').map(char => char.charCodeAt(0)));
      
          const decryptedData = new Uint8Array(data.length);
          for (let i = 0; i < decryptedData.length; i++) {
            decryptedData[i] = o[data[i]];
          }
      
          for (let i = 0; i < decryptedData.length; i += 16) {
            const block = decryptedData.slice(i, i + 16);
            for (let j = 0; j < block.length; j++) {
              decryptedData[i + j] = block[j] ^ iv[j];
            }
          }
      
          for (let i = 0; i < decryptedData.length; i += 32) {
            const block = decryptedData.slice(i, i + 32);
            for (let j = 0; j < block.length; j++) {
              decryptedData[i + j] = block[j] ^ a[j];
            }
          }
      
          return new TextDecoder().decode(decryptedData);
        }      

        async function dlLocal(blob, fileName){
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
        }

        async function getTrackInfo(track){
          const url = `https://www.ximalaya.com/mobile-playpage/track/v3/baseInfo/${new Date().getTime()}?` + new URLSearchParams({
            //"device": "www2", //seems we have 2 servers, www2 and web, www2 is return busy 2025/07/20
            "device": "web",
            "trackId": track.id,
            "trackQualityLevel": 2  //high quality
          });

          let result;
          try{
            const res = await fetch(url, {
              method: 'GET',
              headers: {
                "referer": `"https://www.ximalaya.com/sound/${track.id}`,
              }
            });
              
            result = await res.json();
            console.log("result = ", result);
          }
          catch(ex){
            console.log(ex);
          }

          let urls = result["trackInfo"]["playUrlList"];
          const bestUrl = urls[0];
          track.decrypedUrl = await decryptUrl(bestUrl.url);
          track.ext = bestUrl.type.substring(0, 3);
        }

        async function fetchTrack(track){
          const res = await fetch(track.decrypedUrl);
          track.blob = await res.blob();
        }

        const buttonDl = document.createElement('button');
        buttonDl.innerText = 'Download';
        buttonDl.className = 'xui-btn';
  
        pagination.parentElement.prepend(buttonDl);

        async function sleep(n){
          return new Promise((resolve)=>{
            setTimeout(()=>resolve(), n)
          });
        }

        async function dlPage(sounds){
          buttonDl.disabled = true;
          buttonDl.classList.add('disabled');

          let n = 0;
          for (let track of sounds){
            n = n + 1;
            //if (n>3) break;
            buttonDl.innerText = `Downloading ${track.num} ${track.title}`;

            await sleep(1000);
            await getTrackInfo(track);
            await fetchTrack(track);
            await dlLocal(track.blob, `${track.num}-${track.title}.${track.ext}`);

          }
          buttonDl.innerText = 'Download';
          buttonDl.classList.remove('disabled');
          buttonDl.disabled = false;
        }

        buttonDl.addEventListener('click', async () => {
          let sounds = getSounds();
          await dlPage(sounds);

          for (let i=0; i<100; i++){
            const nextPage = document.querySelector("ul.pagination-page > li.active").nextElementSibling;
            if (nextPage) {
              nextPage.querySelector("a").click();
  
              let newSounds = getSounds();
              while (newSounds[0].id === sounds[0].id){
                await sleep(1000);
                newSounds = getSounds();
              }
              sounds = newSounds;
              await dlPage(sounds);
            }
            else break;
          }
        });
      }
    }
  }, 1000);

}


