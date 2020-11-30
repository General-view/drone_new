// UA services activation

const servicesActivation = () => {
        
    try {
        const services = document.querySelectorAll(".ua-services-item");
        services.forEach(cat => {
            let toggler = cat.querySelector(".ua-form_group-toggler"),
                switchedGroup = cat.querySelector(".ua-form_group-settings");

            !toggler.checked ? switchedGroup.setAttribute("disabled", true) : switchedGroup.removeAttribute("disabled");

            toggler.addEventListener("change", () => {
                !toggler.checked ? switchedGroup.setAttribute("disabled", true) : switchedGroup.removeAttribute("disabled");
            });
        });
    } catch(err) {
    }
};
export default servicesActivation;