import Client from "getaddress-api";

export async function fetchAddresses(postalCode, apiKey) {
    const api = new Client(apiKey);

    try {
        const addresses = await api.find(postalCode);
        
        return addresses;
    } catch (error) {
        throw error;
    }
}
