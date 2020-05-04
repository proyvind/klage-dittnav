export interface Person {
    id: string;
    firsName: string;
    lastName: string;
    phoneNumber: string;
    adress: Adress;
}

export interface Adress {
    street: string;
    postalCode: string;
    city: string;
}
