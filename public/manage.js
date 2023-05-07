
// hvis der klikkes på slet bruger knappen, så slettes brugeren.
document.getElementById("delete").addEventListener('click', (event) => {
    event.preventDefault();
    // fetch til at slette brugeren.
    fetch('/users', { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          window.location.href = '/index.html';
        } else {
          console.log('Der opstod en fejl under sletning af brugeren');
        }
      })
      .catch(error => console.log(error));
  });