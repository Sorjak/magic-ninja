

export default class API {
    BASE_URL = `${import.meta.env.VITE_API_BASE}:${import.meta.env.VITE_API_PORT}`;
    API_URL = `${this.BASE_URL}/api`
    IMAGE_URL = `${import.meta.env.VITE_IMAGE_URL}`;

    async fetchData(path) {
        try {
            const uri = `${this.API_URL}/${path}`;

            const response = await fetch(uri);
            if (!response.ok) {
                throw new Error('Got non 200 response');
            }
            
            return await response.json();

        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async pushData(path, method, json) {
        try {
            const uri = `${this.API_URL}/${path}`;
            const response = await fetch(uri, { 
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: json
            });

            if (!response.ok) {
                throw new Error('Got non 200 response');
            }

            console.log(response);
            return await response.json();
    
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async uploadFile(formData) {
        try {
            const uri = `${this.API_URL}/upload`;
            const response = await fetch(uri, { 
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Got non 200 response');
            }

            return await response.json();
    
        } catch (err) {
            console.error(err);
            return err;
        }
    }
}