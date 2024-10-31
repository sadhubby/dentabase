async function submitData(){
    const birthdate_string = document.getElementById('birthdate');
    const[month, day, year] = birthdate_string.split('/');
    const birthdate = new Date(`${month}/${day}/${year}`);

    

    const patientData = {
        birthdate,

    }
}