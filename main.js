const unixLoader = document.getElementById('unix-loader');
const dateLoader = document.getElementById('date-loader');
const unixTime = document.querySelector('.unix-time');
const dateTime = document.querySelector('.date-time');

displayLoading(unixLoader);
displayLoading(dateLoader);

function displayLoading(loader) {
    loader.style.display = 'block';
}

function hideLoading(loader) {
    loader.style.display = 'none';
}

async function getUnixTime() {
    displayLoading(unixLoader);
    let responseData = await fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now');
    let timeStamp = await responseData.json();
    unixTime.innerHTML = 'UnixTimeStamp: ' + timeStamp.UnixTimeStamp;
    hideLoading(unixLoader);
    return timeStamp.UnixTimeStamp;
}

async function getDateTime(unixTimeStamp) {
    displayLoading(dateLoader);
    let responseDate = await fetch('https://showcase.api.linx.twenty57.net/UnixTime/fromunixtimestamp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({UnixTimeStamp: unixTimeStamp})
    });
    let result = await responseDate.json();
    hideLoading(dateLoader);
    dateTime.innerHTML = 'DateTime: ' + result.Datetime;
}

async function getTime() {
    let unixTimeStamp = await getUnixTime();
    await getDateTime(unixTimeStamp);
}

setInterval(getTime, 3000);
