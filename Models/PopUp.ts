class PopUp {
  private popupElement!: HTMLElement;
  private contentElement!: HTMLElement;

  constructor(artwork: ArtWork) {
    this.createPopup(artwork);
  }

  private createPopup(artwork: ArtWork): void {
    // Crear elementos del popup
    this.popupElement = document.createElement('div');
    this.popupElement.className = 'popup';
    

    this.contentElement = document.createElement('div');
    this.contentElement.className = 'popup-content';

    this.contentElement.innerHTML = `
        <span class="close-btn" id="closePopupBtn">&times;</span>
        <h1 id="artworkTitle">${artwork.title}</h1>
        <img src="${artwork.primaryImage}" alt="Artwork Image">
        <h2 id="artworkAuthor">Author: ${artwork.artistDisplayName}</h2>
        <p>
          Year: ${artwork.objectDate}<br>
          Measurements: ${artwork.measurements}<br>
          Culture: ${artwork.culture}<br>
          Period: ${artwork.period}<br>
          Dynasty: ${artwork.dynasty}<br>
          Reign: ${artwork.reign}<br>
        </p>
        <h2>Artist Details</h2>
        <p>
          Artist Gender: ${artwork.artistGender}<br>
          Artist Role: ${artwork.artistRole}<br>
        </p>
        <p>
          Country: ${artwork.country}<br>
          Region: ${artwork.region}<br>
          City: ${artwork.city}<br>
        </p>
      `;
  
         // Agregar el contenido al popup
    this.popupElement.appendChild(this.contentElement);

    // Agregar el popup al cuerpo del documento
    document.body.appendChild(this.popupElement);

  // Configurar el evento de cierre del popup
  const closePopupBtn = this.popupElement.querySelector('#closePopupBtn');
  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
      this.closePopup();
    });
  }

  // Agregar el contenido al popup
  this.popupElement.appendChild(this.contentElement);

  // Agregar el popup al cuerpo del documento
  document.body.appendChild(this.popupElement);

  // Centrar el popup
  this.centerPopup();
}

private centerPopup(): void {
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  const popupWidth = this.popupElement.offsetWidth;
  const popupHeight = this.popupElement.offsetHeight;

  const leftPosition = (windowWidth - popupWidth) / 2;
  const topPosition = (windowHeight - popupHeight) / 2;

  this.popupElement.style.left = `${leftPosition}px`;
  this.popupElement.style.top = `${topPosition}px`;
}

getPopupElement(): HTMLElement {
  return this.popupElement;
}

closePopup(): void {
  this.popupElement.style.display = 'none';
}
}
  
    