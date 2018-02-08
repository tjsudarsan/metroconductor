const baseURL = "http://192.168.43.186:4000";

export async function initializeBus(busNo, onDuty) {
    let result = await fetch(baseURL + '/initializebus',{
        method: 'POST',
        headers: {
            'Accept': 'applicaton/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            busNo,
            onDuty
        })
    });
    
    return result.json();
}
