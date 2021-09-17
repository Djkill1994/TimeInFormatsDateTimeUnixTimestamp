const unixLoader = document.getElementById('unix-loader');
const dateLoader = document.getElementById('date-loader');
const unixTime = document.querySelector('.unix-time');
const dateTime = document.querySelector('.date-time');

// displayLoading(unixLoader)
// displayLoading(dateLoader)

function displayLoading(x) {
    let load = x.style.display = 'block';
}

function hideLoading(x) {
    let load = x.style.display = 'none';
}

async function getUnixTime() {
    displayLoading(unixLoader)
    let url = 'https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now';
    let response = await fetch(url, {
        mode: "no-cors"
    });
    let commits = await response.json();
    unixTime.innerHTML = 'UnixTimeStamp: ' + commits.UnixTimeStamp;
    hideLoading(unixLoader)
    return commits.UnixTimeStamp;
}

async function getDateTime(unixTimeStamp) {
    displayLoading(dateLoader)
    let url = 'https://showcase.api.linx.twenty57.net/UnixTime/fromunixtimestamp';
    let responseDate = await fetch(url, {
        method: 'POST',
        mode: "no-cors",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({UnixTimeStamp: unixTimeStamp})
    });
    let result = await responseDate.json();
    hideLoading(dateLoader)
    dateTime.innerHTML = 'DateTime: ' + result.Datetime;
}

async function getTime() {
    let unixTimeStamp = await getUnixTime()
    await getDateTime(unixTimeStamp)
}

setInterval(getTime,3000);
