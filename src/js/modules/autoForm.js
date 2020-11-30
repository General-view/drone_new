// Autosubstitution order form

const autoForm = () => {
    try{
        const modalOrder = document.querySelector(".modal-order-confirm"),
          inputContractor = modalOrder.querySelector("#order-contractor"),
          inputContractorId = modalOrder.querySelector("#order-contractor-id"),
          inputPrice = modalOrder.querySelector("#order-price");

        const operatorsItems = document.querySelectorAll(".operators-item");
            operatorsItems.forEach(item => {

            item.addEventListener("click", (evt) => {
                if (evt.target && evt.target.classList.contains("order-place-btn")) {
                    let contractor = item.querySelector(".operators-item_name").innerText,
                        id = item.querySelector(".operators-item_name-id").innerText,
                        
                        price = (item.querySelector(".operators-item_new-price") || 
                        item.querySelector(".operators-item_price")).innerText;

                    inputContractor.value = contractor;
                    inputContractorId.value = id;
                    inputPrice.value = price;
                }
            });
        });
    } catch(err) {
    } 
};

export default autoForm;