// Pagination Contructor Seacrh Results

const searchPagination = () => {
    const searchPaginationDetails = ({resPerPage = 5}) => {
        const searchRes = document.querySelectorAll(".operators-item"),
              pagPagesWrap = document.querySelector(".pagination");
    
        let   activePage = 1,
              resCount = searchRes.length,
              resPages = Math.floor(resCount / resPerPage) + (resCount % resPerPage != 0 ? 1 : 0);
    
    
              
        pagPagesWrap.innerHTML = "";
    
        for (let i = 1; i <= resPages; i++) {
            const pagPage = document.createElement("li");
            pagPage.classList.add("page-item");
            pagPage.innerHTML = `
            <a class="page-link" href="#">${i}</a>
            `;
            pagPagesWrap.appendChild(pagPage);
        }
    
        const pagPages = document.querySelectorAll(".page-item");
    
        function updateResPage() {
            searchRes.forEach((res, i) => {
                if (i + 1 > resPerPage * activePage || i < resPerPage * (activePage < 2 ? 0 : activePage - 1)) {
                    res.classList.add("hide");
                    res.classList.remove("show");
                } else {
                    res.classList.remove("hide");
                    res.classList.add("show");
                }
            });
        }
        
        updateResPage();
    
        function updateAll(page) {
            updateResPage();
            // setPagLimits();
            pagPages.forEach(item => {
                item.classList.remove("active");
            });
            pagPages[page].classList.add("active");
            document.documentElement.scrollTop = 0;
        }
        pagPages.forEach((page, i) => {
            if (i + 1 == activePage) {
                page.classList.add("active");
            }
    
            page.addEventListener("click", (evt) => {
                evt.preventDefault();
    
                activePage = i + 1;
                updateAll(i);
            });
        });
    };
    
    try {
        searchPaginationDetails({resPerPage: 5});
    } catch(err) {
    }
};

export default searchPagination;