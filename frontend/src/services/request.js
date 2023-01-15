function request(endpoint) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(process.env.REACT_APP_API_URL + endpoint);
        const result = await response.json();

        if (response.ok && response.status === 200) {
            resolve(result);
        } else {
            reject(result);
        }
    });
}

export const get = (endpoint) => request(endpoint);
