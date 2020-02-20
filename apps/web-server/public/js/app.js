const renderToPage = (data) => {
    document.querySelector('.error').innerHTML = '';
    const location = document.querySelector('.location');
    const address = document.querySelector('.address');
    const forecast = document.querySelector('.forecast');

    location.innerHTML = data.location;
    address.innerHTML = `You searched for: ${data.address}`;
    forecast.innerHTML = data.body;
};

const showError = (e) => {
    document.querySelector('.error').innerHTML = e;
};

const fetchWeather = () => {

    const address = document.querySelector('#addressField').value;

    fetch(`/weather?address=${address}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    return showError(data.error);
                }
                renderToPage(data);
            });
        });
};

const keyTrigger = (evt) => {
    if (evt.code === 'Enter') {
        fetchWeather();
    }
};

window.addEventListener('keydown', keyTrigger);
