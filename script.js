const imagePairs = [
    ['./img/Banner1.jpg', './img/Banner2.jpg'],
    ['./img/Banner3.jpg', './img/Banner4.jpg']
  ];
  
  let currentIndex = 0;
  
  const leftImg = document.querySelector('.img-left');
  const rightImg = document.querySelector('.img-right');
  
  // Initiale Bilder setzen, aber sicherstellen, dass sie sichtbar sind
  leftImg.src = imagePairs[0][0]; // Banner1.jpg
  rightImg.src = imagePairs[0][1]; // Banner2.jpg
  
  // Bilder sofort sichtbar machen, bevor irgendwelche Animationen starten
  leftImg.onload = () => {
    leftImg.classList.add('active');
  };
  rightImg.onload = () => {
    rightImg.classList.add('active');
  };
  
  // Funktion zum Zurücksetzen der Bilder
  function resetImages() {
    leftImg.classList.remove('active', 'fade-out');
    rightImg.classList.remove('active', 'fade-out');
    
    // Reflow erzwingen, damit die Animation neu gestartet werden kann
    void leftImg.offsetWidth;
    void rightImg.offsetWidth;
  }
  
  // Funktion für den Bildwechsel
  function nextSlide() {
    // Zuerst den "fade-out"-Effekt anwenden, damit die Bilder verschwinden
    leftImg.classList.add('fade-out');
    rightImg.classList.add('fade-out');
    
    // Warten, bis die "fade-out"-Animation abgeschlossen ist (2s)
    setTimeout(() => {
      // Bildwechsel
      currentIndex = (currentIndex + 1) % imagePairs.length;
      leftImg.src = imagePairs[currentIndex][0];
      rightImg.src = imagePairs[currentIndex][1];
    
      // Bilder zurücksetzen und neue "active"-Klasse hinzufügen
      resetImages();
      leftImg.classList.add('active');
      rightImg.classList.add('active');
    }, 2000); // fade-out dauert 2s
  }
  
  // Alle 8 Sekunden den Bildwechsel auslösen
  setInterval(nextSlide, 8000);
  