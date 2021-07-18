import fetch from 'node-fetch'

async function sendSms(phoneNumber, text) {
    fetch("https://notify.eskiz.uz/api/message/sms/send", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "uz-UZ,uz;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbm90aWZ5LmVza2l6LnV6XC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjIyNTYxNTI2LCJleHAiOjE2MjUxNTM1MjYsIm5iZiI6MTYyMjU2MTUyNiwianRpIjoiT00xWlhBbDlmNlJoVkRVciIsInN1YiI6NDE0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.wwI2SEa3_5zSR4X8GxBJz-ld4X7bOWdNix06IaVhlPI",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryDHFbLpH5bEtMWYBA",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
    },
    "referrer": "https://eduon.uz/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": `------WebKitFormBoundaryDHFbLpH5bEtMWYBA\r\nContent-Disposition: form-data; name=\"mobile_phone\"\r\n\r\n${phoneNumber}\r\n------WebKitFormBoundaryDHFbLpH5bEtMWYBA\r\nContent-Disposition: form-data; name=\"message\"\r\n\r\n${text}\r\n------WebKitFormBoundaryDHFbLpH5bEtMWYBA\r\nContent-Disposition: form-data; name=\"from\"\r\n\r\n4546\r\n------WebKitFormBoundaryDHFbLpH5bEtMWYBA--\r\n`,
    "method": "POST",
    "mode": "cors"
});
}


export default sendSms