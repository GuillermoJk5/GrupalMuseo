class PopupController {
  private popupModel: PopUp;

  constructor(artwork: ArtWork) {
    this.popupModel = new PopUp(artwork);
  }

  openPopup(): void {
    // Mostrar el popup
    this.popupModel.getPopupElement().style.display = 'block';
  }

  closePopup(): void {
    // Cerrar el popup desde la instancia de PopUp
    this.popupModel.closePopup();
  }
}


