interface UserData {
    name: string,
    surname: string,
    city: string,
    country: string,
    username: string,
    password: string,
    CPassword: string
}

interface Country {
    id: number,
    name: string
}


export { UserData,  Country }