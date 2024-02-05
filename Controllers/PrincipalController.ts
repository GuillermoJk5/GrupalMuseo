class PrincipalController {
    private categoriasService = new DepartmentService();
    private obrasService = new ArtWorkService(new ArtWorkRepository());
    private idArtWorkSer = new IdArtWorkService(); 
    private selectedCategoryId: number | null = null;
    private currentPage: number = 1;
    private pageSize: number = 40;
    private totalArtWorks: number = 0;

    public init(): void {
        const selectElement = document.getElementById("categoriaSelect") as HTMLSelectElement;
        const paginationElement = document.getElementById("paginationContainer");

        this.categoriasService.loadAllCategories((error, categories) => {
            if (error) {
                console.error("Error al cargar las categorías:", error);
            } else {
                if (typeof(categories) !== "undefined") {
                    this.populateCategoriesSelect(selectElement, categories);
                }
            }
        });

        selectElement.addEventListener("change", () => {
            const selectedValue = selectElement.value;

            if(paginationElement?.style.visibility == "hidden"){
                paginationElement.style.visibility = "visible";
            }
            if (selectedValue) {
                this.selectedCategoryId = parseInt(selectedValue, 10);
                this.currentPage = 1; // Reset page when category changes
                this.loadAndDisplayArtWorks();
                
            } else {
                this.selectedCategoryId = null;
                console.warn("No se ha seleccionado ninguna categoría.");
            }
        });

        // Cargar y mostrar obras al iniciar la página
        this.loadAndDisplayArtWorks();
    }

    private loadAndDisplayArtWorks(): void {
        if (this.selectedCategoryId !== null) {
            const offset = (this.currentPage - 1) * this.pageSize;

            this.idArtWorkSer.getDepartmentIds(this.selectedCategoryId, (error, data) => {
                if (error) {
                    console.error("Error al cargar las categorías:", error);
                } else {
                    console.log("Datos obtenidos");
                    this.totalArtWorks = data?.length || 0;
    
                    // Utilizar el método existente getArtWorks del servicio ObraService
                    this.obrasService.getArtWorks(this.selectedCategoryId ?? 1, offset, (error, obras) => {
                        if (error) {
                            console.error("Error al obtener las obras:", error);
                        } else {
                            if (typeof(obras) !== "undefined") {
                                this.displayArtWorks(obras);
                                this.createPagination();
                            }
                        }
                    });
                }
            });
        }
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
        imgElement.src = obra?.primaryImageSmall ??""; 
        imgElement.alt = "Imagen de la obra";
        imgElement.classList.add("img-fluid");

        const divDatos = document.createElement("div");
        divDatos.classList.add("divDatos");

        const createParagraph = (text: string): HTMLParagraphElement => {
            const paragraph = document.createElement("p");
            paragraph.textContent = text;
            return paragraph;
        };

        divDatos.appendChild(createParagraph(obra?.title??""));
        divDatos.appendChild(createParagraph(obra?.artistDisplayName??""));
        divDatos.appendChild(createParagraph(obra?.accessionYear.toString()??""));

        divImg.appendChild(imgElement);
        tarjetaElement.appendChild(divImg);
        tarjetaElement.appendChild(divDatos);

        tarjetaElement.addEventListener("click", () => {
            this.onArtworkClick(obra);
        });

        return tarjetaElement;
    }

    private populateCategoriesSelect(selectElement: HTMLSelectElement, categories: Department[] | null): void {
        selectElement.innerHTML = '<option value="" disabled selected>Categoría</option>';

        categories?.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.departmentId.toString(); 
            option.text = category.displayName;
            selectElement.appendChild(option);
        });
    }

    private createPagination(): void {
        const paginationContainer = document.getElementById("paginationContainer") as HTMLDivElement;
        const totalPages = Math.ceil(this.totalArtWorks / this.pageSize);
    
        const btnPrevious = document.getElementById("btnPrevious") as HTMLAnchorElement;
        const btnNext = document.getElementById("btnNext") as HTMLAnchorElement;
    
        // Explicitly set the "disabled" attribute based on the condition
        if (this.currentPage === 1) {
            btnPrevious.setAttribute("disabled", "true");
        } else {
            btnPrevious.removeAttribute("disabled");
        }
    
        btnPrevious.onclick = () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadAndDisplayArtWorks();
            }
        };
    
        // Explicitly set the "disabled" attribute based on the condition
        if (this.currentPage === totalPages) {
            btnNext.setAttribute("disabled", "true");
        } else {
            btnNext.removeAttribute("disabled");
        }
    
        btnNext.onclick = () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.loadAndDisplayArtWorks();
            }
        };
    
        // Render page numbers
        const pageOne = document.getElementById("pageOne") as HTMLAnchorElement;
        const pageTwo = document.getElementById("pageTwo") as HTMLAnchorElement;
        const pageThree = document.getElementById("pageThree") as HTMLAnchorElement;
    
        const pageLinks = [pageOne, pageTwo, pageThree];
    
        for (let i = 0; i < pageLinks.length; i++) {
            const pageNumber = this.currentPage + i;
            const pageLink = pageLinks[i];
    
            pageLink.textContent = pageNumber.toString();
    
            // Set the "active" class for the current page, remove it for others
            pageLink.classList.toggle("active", pageNumber === this.currentPage);
    
            pageLink.onclick = () => {
                this.currentPage = pageNumber;
                this.loadAndDisplayArtWorks();
            };
    
            if (pageNumber > totalPages) {
                pageLink.style.display = "none";
            }
        }
    }



    //METODO QUE USARÁ GUILLE PARA MOSTRAR LOS DATOS DE LAS OBRAS
    private onArtworkClick(obra: ArtWork): void {
        // Aquí es donde puedes acceder al código de otra clase.
        // Crea una instancia de esa clase y llama a sus métodos o realiza las acciones necesarias.
    
        //const otraClase = new OtraClase(); // Reemplaza 'OtraClase' con el nombre de tu clase
        //otraClase.mostrarInformacion(obra);
    
        // También puedes realizar otras acciones específicas de esta clase si es necesario.
    
        // Log a la consola si es necesario
        console.log("El usuario hizo clic en una obra:", obra);
    }
    
    
    
}

const principalController = new PrincipalController();
document.addEventListener("DOMContentLoaded", () => {
    principalController.init();
});
