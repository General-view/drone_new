// Count uploading files

const countUploads = () => {
    try {
        const inputWraps = document.querySelectorAll('.input-file-wrap');
        
        inputWraps.forEach(item => {
            let input = item.querySelector(".custom-file-input"),
                labelText = item.querySelector(".input-file-text"),
                labelValue = labelText.innerText;
            
            input.addEventListener("change", (evt) => {
                let countFiles;
                if (evt.target.files && evt.target.files.length >= 1) {
                    countFiles = evt.target.files.length;
                }
                countFiles ? labelText.innerText = `${labelValue}:  ${countFiles}` : labelText.innerText = labelValue;
            });
        });
    } catch(err) {
    }
};
export default countUploads;