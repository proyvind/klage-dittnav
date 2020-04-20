const getOptions = {
    method: 'GET'
};

const postOptions = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: ''
};

export async function get(resource: string) {
    let response = await fetch(resource, getOptions);
    try {
        let data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
export async function post(resource: string, item: any) {
    postOptions.body = JSON.stringify(item);

    let response = await fetch(resource, postOptions);
    try {
        let data = await response;
        return data;
    } catch (error) {
        return error;
    }
}
