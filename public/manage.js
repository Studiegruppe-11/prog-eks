document.getElementById("delete").addEventListener('click', (event) => {
    event.preventDefault();
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