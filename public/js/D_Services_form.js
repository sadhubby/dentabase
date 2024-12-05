document.addEventListener("DOMContentLoaded", () => {
    const addServiceButton = document.querySelector('#add-service'); 
    const serviceFormContainer = document.querySelector('.services-form-file'); 
    const cancelButton = document.querySelector('.cancel-button'); 
    const doneButton = document.querySelector('.done-button'); 

    const serviceNameInput = document.querySelector('#service-name');
    const priceInput = document.querySelector('#price');
    const orthodonticSelect = document.querySelector('#orthodontic');

    addServiceButton.addEventListener('click', () => {
        serviceFormContainer.style.display = 'block'; 
    });

    cancelButton.addEventListener('click', () => {
        serviceFormContainer.style.display = 'none';
        resetFormFields(); 
    });

    doneButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const serviceName = serviceNameInput.value.trim();
        const price = parseFloat(priceInput.value.trim());
        const orthodontic = orthodonticSelect.value;

        if (!serviceName) {
            alert("Service name is required!");
            return;
        }

        if (!price || isNaN(price) || price <= 0) {
            alert("Please enter a valid price!");
            return;
        }

        try {
            const response = await fetch('/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceName,
                    price,
                    type: orthodontic,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create service');
            }

            const newService = await response.json();
            console.log('Service created successfully:', newService);

            location.reload();

        } catch (error) {
            console.error('Error creating service:', error);
            alert('Error creating service: ' + error.message);
        } finally {
            resetFormFields();
            serviceFormContainer.style.display = 'none';
        }
    });

    function resetFormFields() {
        serviceNameInput.value = '';
        priceInput.value = '';
        orthodonticSelect.value = 'non-ortho';
    }
});
