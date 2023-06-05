export class APIHelper {
    constructor({
        baseUrl = '',
        apiToken = '',
    }) {
        this.request = async ({ path = '', method = 'GET', parameters = {} }) => {
            if (path.startsWith('/'))
                path = path.substring(1);
            let response = await fetch(`${baseUrl}/${path}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': apiToken,
                },
                body: method == 'POST' ? JSON.stringify(parameters) : undefined,
            });
            response = await response.json();
            return response;
        }
    }
}