"use strict";

import autoForm from "./modules/autoForm";
import countUploads from "./modules/countUploads";
import ordersCollapsing from "./modules/ordersCollapsing";
import searchPagination from "./modules/searchPagination";
import servicesActivation from "./modules/servicesActivation";


window.addEventListener("DOMContentLoaded", () => {

    autoForm();
    countUploads();
    ordersCollapsing();
    searchPagination();
    servicesActivation();    
});