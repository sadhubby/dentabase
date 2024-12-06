document.addEventListener("DOMContentLoaded", () => {
    const addServiceButton = document.querySelector('#add-service');
    const serviceFormContainer = document.querySelector('.services-form-file');
    const cancelButton = document.querySelector('.cancel-button');
    const doneButton = document.querySelector('.done-button');

    const serviceNameInput = document.querySelector('#service-name');
    const priceInput = document.querySelector('#price');
    const orthodonticSelect = document.querySelector('#orthodontic');

    const saveChangesButton = document.querySelector('#save-changes');
    const rows = document.querySelectorAll('tbody tr');
    const originalData = {};
    const modifiedData = {}; 

    rows.forEach(row => {
        const serviceId = row.dataset.id;
        const serviceName = row.querySelector('.name.service-text').value.trim();
        const price = parseFloat(row.querySelector('.phone.service-text').value.trim());
        originalData[serviceId] = { service: serviceName, price };
    });

    rows.forEach(row => {
        const serviceId = row.dataset.id;
        const serviceNameInput = row.querySelector('.name.service-text');
        const priceInput = row.querySelector('.phone.service-text');

        serviceNameInput.addEventListener('input', () => {
            trackChanges(serviceId, serviceNameInput.value.trim(), 'service');
        });

        priceInput.addEventListener('input', () => {
            trackChanges(serviceId, parseFloat(priceInput.value.trim()), 'price');
        });
    });

    function trackChanges(serviceId, value, key) {
        if (!modifiedData[serviceId]) {
            modifiedData[serviceId] = { ...originalData[serviceId] };
        }
        modifiedData[serviceId][key] = value;

        if (modifiedData[serviceId][key] === originalData[serviceId][key]) {
            delete modifiedData[serviceId][key];
        }
        if (Object.keys(modifiedData[serviceId]).length === 0) {
            delete modifiedData[serviceId];
        }
    }

    saveChangesButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const updates = Object.entries(modifiedData).map(([id, changes]) => ({
            id,
            ...changes,
        }));

        if (updates.length === 0) {
            alert('No changes detected.');
            return;
        }

        try {
            const response = await fetch('/services/update-multiple', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ updates }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to save changes');
            }

            const result = await response.json();
            console.log('Changes saved successfully:', result);

            location.reload();

        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes: ' + error.message);
        }
    });

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
