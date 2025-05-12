const images = [
    'url(/c30/素材/UCLA.webp)',
    'url(/c30/素材/加州理工.jpg)',
    'url(/c30/素材/史丹佛.webp)',
    'url(/c30/素材/喬治亞理工.png)'
  ];
  
  let index = 0;
  const bg = document.querySelector(".background-img");
  
  setInterval(() => {
    bg.style.opacity = 0;
    setTimeout(() => {
      index = (index + 1) % images.length;
      bg.style.backgroundImage = images[index];
      bg.style.opacity = 1;
    }, 1000); 
  }, 4000);
  