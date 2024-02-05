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
    this.popupElement.style.display = 'block';
    
    this.contentElement = document.createElement('div');
    this.contentElement.className = 'popup-content';
    
    // Creating elements for each part of the content
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.id = 'closePopupBtn';
    closeBtn.innerHTML = '&times;';
    
    const titleElement = document.createElement('h1');
    titleElement.id = 'artworkTitle';
    titleElement.textContent = artwork.title;
    
    const imageElement = document.createElement('img');
    imageElement.src = artwork.primaryImage;
    imageElement.alt = 'Artwork Image';
    
    const authorElement = document.createElement('h2');
    authorElement.id = 'artworkAuthor';
    authorElement.textContent = `Author: ${artwork.artistDisplayName}`;
    
    const detailsElement = document.createElement('p');
    detailsElement.innerHTML = `
        Year: ${artwork.objectDate}<br>
        Measurements: ${artwork.measurements}<br>
        Culture: ${artwork.culture}<br>
        Period: ${artwork.period}<br>
        Dynasty: ${artwork.dynasty}<br>
        Reign: ${artwork.reign}<br>
    `;
    
    const artistDetailsElement = document.createElement('h2');
    artistDetailsElement.textContent = 'Artist Details';
    
    const artistDetailsContentElement = document.createElement('p');
    artistDetailsContentElement.innerHTML = `
        Artist Gender: ${artwork.artistGender}<br>
        Artist Role: ${artwork.artistRole}<br>
    `;
    
    const locationElement = document.createElement('p');
    locationElement.innerHTML = `
        Country: ${artwork.country}<br>
        Region: ${artwork.region}<br>
        City: ${artwork.city}<br>
    `;
    
    // Appending elements to contentElement
    this.contentElement.appendChild(closeBtn);
    this.contentElement.appendChild(titleElement);
    this.contentElement.appendChild(imageElement);
    this.contentElement.appendChild(authorElement);
    this.contentElement.appendChild(detailsElement);
    this.contentElement.appendChild(artistDetailsElement);
    this.contentElement.appendChild(artistDetailsContentElement);
    this.contentElement.appendChild(locationElement);
    
    // Appending contentElement to popupElement
    this.popupElement.appendChild(this.contentElement);
    
  
    // Agregar el contenido al popup
    this.popupElement.appendChild(this.contentElement);

    // Agregar el popup al cuerpo del documento
    document.body.appendChild(this.popupElement);

  /// Configurar el evento de cierre del popup
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


}

getPopupElement(): HTMLElement {
  return this.popupElement;
}

closePopup(): void {
  this.popupElement.style.display = 'none';
}
}
  
    