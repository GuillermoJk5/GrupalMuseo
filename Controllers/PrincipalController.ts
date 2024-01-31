class PrincipalController {
    private categoriasService = new CategoriasService();
    private obrasService = new ObraService(new ObrasRepository());
    private selectedCategoryId: number | null = null; 

    public init(): void {
        const selectElement = document.getElementById("categoriaSelect") as HTMLSelectElement;

        this.categoriasService.loadAllCategories((error, categories) => {
            if (error) {
                console.error("Error al cargar las categorías:", error);
            } else {
                this.populateCategoriesSelect(selectElement, categories);
            }
        });

        selectElement.addEventListener("change", () => {
            const selectedValue = selectElement.value;

            if (selectedValue) {
                this.selectedCategoryId = parseInt(selectedValue, 10);
                console.log("ID de la categoría seleccionada:", this.selectedCategoryId);

                this.obrasService.getArtWorks(new Department(this.selectedCategoryId, ""), 0, (error, obras) => {
                    if (error) {
                        console.error("Error al obtener las obras:", error);
                    } else {
                        this.displayArtWorks(obras);
                    }
                });
            } else {
                this.selectedCategoryId = null;
                console.warn("No se ha seleccionado ninguna categoría.");
            }
        });
    }

    private displayArtWorks(obras: ArtWork[]): void {
        const obrasContainer = document.getElementById("obrasContainer") as HTMLDivElement;
        obrasContainer.innerHTML = "";

        obras.forEach((obra) => {
            const tarjetaElement = this.createTarjetaElement(obra);
            obrasContainer.appendChild(tarjetaElement);
        });
    }

    private createTarjetaElement(obra: ArtWork): HTMLDivElement {
        const tarjetaElement = document.createElement("div");
        tarjetaElement.classList.add("tarjeta", "col-2");

        const divImg = document.createElement("div");
        divImg.classList.add("divImg");
        divImg.style.backgroundColor = "red";

        const imgElement = document.createElement("img");
        imgElement.src = obra.primaryImageSmall || ""; 
        imgElement.alt = "Imagen de la obra";
        imgElement.classList.add("img-fluid");

        const divDatos = document.createElement("div");
        divDatos.classList.add("divDatos");

        const createParagraph = (text: string): HTMLParagraphElement => {
            const paragraph = document.createElement("p");
            paragraph.textContent = text;
            return paragraph;
        };

        divDatos.appendChild(createParagraph(obra.title));
        divDatos.appendChild(createParagraph(obra.artistDisplayName));
        divDatos.appendChild(createParagraph(obra.accessionYear.toString()));

        divImg.appendChild(imgElement);
        tarjetaElement.appendChild(divImg);
        tarjetaElement.appendChild(divDatos);

        return tarjetaElement;
    }

    private populateCategoriesSelect(selectElement: HTMLSelectElement, categories: Department[] | null): void {
        selectElement.innerHTML = '<option value="">Categoría</option>';

        categories?.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.departmentId.toString(); 
            option.text = category.displayName;
            selectElement.appendChild(option);
        });
    }    
}

const principalController = new PrincipalController();
document.addEventListener("DOMContentLoaded", () => {
    principalController.init();
});
