class PopUp {
  private popupElement!: HTMLElement;
  private contentElement!: HTMLElement;

  constructor(artwork: ArtWork) {
    artwork=this.artworkformate(artwork);
    this.createPopup(artwork);
  }

  private artworkformate(artwork:ArtWork){
   
    artwork.objectDate = this.ponerdato(artwork.objectDate);
    artwork.objectDate = this.ponerdato(artwork.culture);
    artwork.objectDate = this.ponerdato(artwork.dynasty);
    artwork.objectDate = this.ponerdato(artwork.reign);
    artwork.objectDate = this.ponerdato(artwork.artistGender);
    artwork.objectDate = this.ponerdato(artwork.artistRole);
    artwork.objectDate = this.ponerdato(artwork.region);
    artwork.objectDate = this.ponerdato(artwork.country);
    artwork.objectDate = this.ponerdato(artwork.city);
    artwork.objectDate = this.ponerdato(artwork.artistDisplayName);

    return artwork;
  }

  private ponerdato(campo:string){
    if (campo==""||campo==null) {
      return "sin datos";
  }else{
    return campo;
  }
  }

  private createPopup(artwork: ArtWork): void {
    // Crear elementos del popup
    this.popupElement = document.createElement('div');
    this.popupElement.className = 'popup';
    this.popupElement.style.display = 'block';
    this.popupElement.style.width = 'fit-content'; 
    
    this.contentElement = document.createElement('div');
    this.contentElement.className = 'popup-content';
    
    // Crear elementos para cada parte del contenido
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.id = 'closePopupBtn';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cursor = 'pointer'; 
    
    const titleElement = document.createElement('h1');
    titleElement.id = 'artworkTitle';
    titleElement.textContent = artwork.title;
    
    const imageElement = document.createElement('img');
    imageElement.src = artwork.primaryImage;
    imageElement.alt = 'Artwork Image';
    
    const authorElement = document.createElement('h2');
    authorElement.id = 'artworkAuthor';
    authorElement.textContent = `Autor: ${artwork.artistDisplayName}`;
    
    const detailsElement = document.createElement('p');
    detailsElement.innerHTML = `
        Año: ${artwork.objectDate}<br>
        Cultura: ${artwork.culture}<br>
        Periodo: ${artwork.period}<br>
        Dinastía: ${artwork.dynasty}<br>
        Reinado: ${artwork.reign}<br>
    `;
    
    const artistDetailsElement = document.createElement('h2');
    artistDetailsElement.textContent = 'Detalles del Artista';
    
    const artistDetailsContentElement = document.createElement('p');
    artistDetailsContentElement.innerHTML = `
        Género del Artista: ${artwork.artistGender}<br>
        Rol del Artista: ${artwork.artistRole}<br>
        País: ${artwork.country}<br>
        Región: ${artwork.region}<br>
        Ciudad: ${artwork.city}<br>
    `;
    
    
    // Agregar elementos al contentElement
    this.contentElement.appendChild(closeBtn);
    this.contentElement.appendChild(titleElement);
    this.contentElement.appendChild(imageElement);
    this.contentElement.appendChild(authorElement);
    this.contentElement.appendChild(detailsElement);
    this.contentElement.appendChild(artistDetailsElement);
    this.contentElement.appendChild(artistDetailsContentElement);
    
    // Agregar contentElement al popupElement
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
  }

  getPopupElement(): HTMLElement {
    return this.popupElement;
  }

  closePopup(): void {
    this.popupElement.style.display = 'none';
  }
}
