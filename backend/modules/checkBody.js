function checkBody(body, keys) {
    let isValid = true;

    for (const field of keys) {
        if (!body[field] || body[field] === '') {
            isValid = false;
        }
    }

    return isValid;
}
// create function verif if it's a email
function verifEmail(email) {
    let isValid = true;
    const regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!regex.test(email)) {
        isValid = false;
    }
    return isValid;
}
module.exports = { checkBody, verifEmail };