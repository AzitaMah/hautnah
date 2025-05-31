// Warten, bis das gesamte DOM geladen ist
document.addEventListener("DOMContentLoaded", function () {

  let isMobile = window.innerWidth < 600;
  let intervalId = null;

  // Bildpaare für Desktop (zwei nebeneinander)
  const imagePairs = [
    ['./img/Banner1.jpg', './img/Banner2.jpg'],
    ['./img/Banner3.jpg', './img/Banner4.jpg']
  ];

  // Einzelbilder für Mobile-Ansicht (eins nach dem anderen)
  const smalImages = [
    './img/Banner1.jpg',
    './img/Banner2.jpg',
    './img/Banner3.jpg',
    './img/Banner4.jpg'
  ];
  // Bildelemente aus dem DOM holen
  const leftImg = document.querySelector('.img-left');
  const rightImg = document.querySelector('.img-right');
  const smalImg = document.querySelector('.img-smal');

  let currentIndex = 0; // aktuelles Bildpaar für Desktop
  let smalIndex = 0; // aktuelles Bildpaar für Mobile

  // Bilder für Desktop laden und sichtbar machen
  function showDesktopImages() {
    leftImg.onload = () => {
      leftImg.classList.add('active');
    };
    rightImg.onload = () => {
      rightImg.classList.add('active');
    };
    leftImg.src = imagePairs[currentIndex][0];
    rightImg.src = imagePairs[currentIndex][1];
  }

  // Entfernt Klassen und zwingt Browser, Layout neu zu berechnen (Animation reset)
  function resetImages() {
    leftImg.classList.remove('active', 'fade-out');
    rightImg.classList.remove('active', 'fade-out');
    void leftImg.offsetWidth;
    void rightImg.offsetWidth;
  }
  // Nächster Slide für Desktop: Blende Bilder aus, lade neue, blende ein
  function nextDesktopSlide() {
    leftImg.classList.add('fade-out');
    rightImg.classList.add('fade-out');
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % imagePairs.length;
      leftImg.src = imagePairs[currentIndex][0];
      rightImg.src = imagePairs[currentIndex][1];
      resetImages();
      leftImg.classList.add('active');
      rightImg.classList.add('active');
    }, 2000); //ACHTUNG! identische Zeit wie beim CSS-Übergang
  }
// Nächstes Bild für Mobile-Ansicht
  function updateMobileImage() {
    smalImg.classList.remove('active', 'fade-out');
    void smalImg.offsetWidth;
    smalImg.classList.add('fade-out');

    setTimeout(() => {
      smalIndex = (smalIndex + 1) % smalImages.length;
      smalImg.src = smalImages[smalIndex];
      smalImg.classList.remove('fade-out');
      smalImg.classList.add('active');
    }, 2000);//ACHTUNG! identische Zeit wie beim CSS-Übergang
  }

  // Slideshow starten, je nach Gerät
  function startSlideshow() {
    clearInterval(intervalId);
    if (isMobile) {
      smalImg.src = smalImages[smalIndex];
      smalImg.classList.add('active');
      intervalId = setInterval(updateMobileImage, 8000);
      leftImg.style.display = 'none';
      rightImg.style.display = 'none';
      smalImg.style.display = 'block';
    } else {
      showDesktopImages();
      intervalId = setInterval(nextDesktopSlide, 8000);
      leftImg.style.display = 'block';
      rightImg.style.display = 'block';
      smalImg.style.display = 'none';
    }
  }
// Reagiert auf Bildschirmgrößenänderung (z. B. beim Drehen eines Geräts)
  window.addEventListener('resize', () => {
    const currentlyMobile = window.innerWidth < 600;
    if (currentlyMobile !== isMobile) {
      isMobile = currentlyMobile;
      startSlideshow();
    }
  });

  // Initialstart/ Direkt beim Laden starten
  startSlideshow();
  
  // ==========================
  // Navigation (Burger-Menü)
  // ==========================
  window.myFunction = function () {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  };
});
