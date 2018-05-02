export default class User{
    constructor(firstName, lastName, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.results={
            'easy': 0,
            'normal': 0,
            'hard': 0,
        }
    }
}