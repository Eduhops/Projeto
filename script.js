// Inicialize o EmailJS
emailjs.init("YOUR_EMAILJS_USER_ID");

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);

    // Envie o e-mail
    emailjs.sendForm('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', data)
        .then(function(response) {
            document.getElementById('form-message').textContent = 'Mensagem enviada com sucesso!';
            storeData(data);  // Armazene os dados no banco de dados
        }, function(error) {
            document.getElementById('form-message').textContent = 'Falha ao enviar a mensagem.';
            console.error('Erro ao enviar o e-mail:', error);
        });
});

function storeData(formData) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/store-data', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(new URLSearchParams(formData).toString());

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Dados armazenados com sucesso.');
        } else {
            console.error('Erro ao armazenar os dados:', xhr.responseText);
        }
    };
}
