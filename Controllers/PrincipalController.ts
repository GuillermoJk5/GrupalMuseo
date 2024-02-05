class PrincipalController {
    private categoriasService = new DepartmentService(); // Service for categories
    private obrasService = new ArtWorkService(new ArtWorkRepository()); // Service for artworks
    private idArtWorkSer = new IdArtWorkService(); // Service for artwork IDs
    private selectedCategoryId: number | null = null; // Selected category ID
    private currentPage: number = 1; // Current page number
    private pageSize: number = 40; // Number of artworks per page
    private totalArtWorks: number = 0; // Total number of artworks
    private paginationElement = document.getElementById("paginationContainer"); // Pagination container element

    public init(): void {
        const selectElement = document.getElementById("categoriaSelect") as HTMLSelectElement;

        // Load categories and populate the select element
        this.categoriasService.loadAllCategories((error, categories) => {
            if (error) {
                console.error("Error loading categories:", error);
            } else {
                if (typeof(categories) !== "undefined") {
                    this.populateCategoriesSelect(selectElement, categories);
                }
            }
        });

        // Add event listener for category selection change
        selectElement.addEventListener("change", () => {
            const selectedValue = selectElement.value;

            if (selectedValue) {
                this.selectedCategoryId = parseInt(selectedValue, 10);
                this.currentPage = 1; // Reset page when category changes
                this.loadAndDisplayArtWorks();
            } else {
                this.selectedCategoryId = null;
                console.warn("No category selected.");
            }
        });

    }

    // Load and display artworks based on the selected category and current page
    private loadAndDisplayArtWorks(): void {
        if (this.selectedCategoryId !== null) {
            const offset = (this.currentPage - 1) * this.pageSize;

            this.idArtWorkSer.getDepartmentIds(this.selectedCategoryId, (error, data) => {
                if (error) {
                    console.error("Error loading category IDs:", error);
                } else {
                    console.log("Data obtained");
                    this.totalArtWorks = data?.length || 0;

                    // Use the existing getArtWorks method from the ArtWorkService
                    this.obrasService.getArtWorks(this.selectedCategoryId ?? 1, offset, (error, obras) => {
                        if (error) {
                            console.error("Error getting artworks:", error);
                        } else {
                            if (typeof(obras) !== "undefined") {
                                this.displayArtWorks(obras);
                                this.createPagination();
                                // Show pagination if it was hidden
                                if (this.paginationElement?.style.visibility == "hidden") {
                                    this.paginationElement.style.visibility = "visible";
                                }
                            }
                        }
                    });
                }
            });
        }
    }

    // Display artworks in the HTML container
    private displayArtWorks(obras: ArtWork[]): void {
        const obrasContainer = document.getElementById("obrasContainer") as HTMLDivElement;
        obrasContainer.innerHTML = "";

        obras.forEach((obra) => {
            const tarjetaElement = this.createTarjetaElement(obra);
            obrasContainer.appendChild(tarjetaElement);
        });
    }

    // Create and return a card element for an artwork
    private createTarjetaElement(obra: ArtWork): HTMLDivElement {
        const tarjetaElement = document.createElement("div");
        tarjetaElement.classList.add("tarjeta", "col-2");

        const divImg = document.createElement("div");
        divImg.classList.add("divImg");
        divImg.style.backgroundColor = "red";

        const imgElement = document.createElement("img");
        imgElement.src = obra?.primaryImageSmall ?? "";
        imgElement.alt = "Artwork Image";
        imgElement.classList.add("img-fluid");

        const divDatos = document.createElement("div");
        divDatos.classList.add("divDatos");

        const createParagraph = (text: string): HTMLParagraphElement => {
            const paragraph = document.createElement("p");
            paragraph.textContent = text;
            return paragraph;
        };

        divDatos.appendChild(createParagraph(obra?.title ?? ""));
        divDatos.appendChild(createParagraph(obra?.artistDisplayName ?? ""));
        divDatos.appendChild(createParagraph(obra?.accessionYear.toString() ?? ""));

        divImg.appendChild(imgElement);
        tarjetaElement.appendChild(divImg);
        tarjetaElement.appendChild(divDatos);

        tarjetaElement.addEventListener("click", () => {
            this.onArtworkClick(obra);
        });

        return tarjetaElement;
    }

    // Populate the category select element with options
    private populateCategoriesSelect(selectElement: HTMLSelectElement, categories: Department[] | null): void {
        selectElement.innerHTML = '<option value="" disabled selected>Category</option>';

        categories?.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.departmentId.toString();
            option.text = category.displayName;
            selectElement.appendChild(option);
        });
    }

    // Create and render the pagination based on current page and total pages
    private createPagination(): void {
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

    // METHOD THAT GUILLERMO WILL USE TO DISPLAY ARTWORK DATA
    private onArtworkClick(obra: ArtWork): void {
        const popupController = new PopupController(obra);
        popupController.openPopup();

        // Log to console if needed
        console.log("User clicked on an artwork:", obra);
    }
}

// Create an instance of PrincipalController and initialize it on DOMContentLoaded event
const principalController = new PrincipalController();
document.addEventListener("DOMContentLoaded", () => {
    principalController.init();
});
