const baseURL = "https://mtcticketing.herokuapp.com";

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

export async function checkWallet(uid,fare) {
    let result = await fetch(baseURL + '/checkewallet',{
        method: 'POST',
        headers: {
            'Accept': 'applicaton/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            uid,
            fare
        })
    });
    
    return result.json();
}

export async function payTicket(uid,fare,from,to,noOfTickets){
    let result = await fetch(baseURL + '/generateticket',{
        method: 'POST',
        headers: {
            'Accept': 'applicaton/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            uid,
            fare,
            from,
            to,
            noOfTickets
        })
    });
    
    return result.json();
}