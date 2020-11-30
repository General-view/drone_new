// Orders Collapsing

const ordersCollapsing = () => {
    try {
        const orders = document.querySelectorAll(".ua-orders_item");

        orders.forEach(order => {
            let toggler = order.querySelector(".ua-orders_toggler"),
                details = order.querySelector(".ua-orders_details");

            toggler.addEventListener("click", (evt) => {
                order.classList.toggle("rolled");
            });
        });
    } catch(err) {
    }
};
export default ordersCollapsing;