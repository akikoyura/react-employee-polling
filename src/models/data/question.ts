import Option from "./option"

export default class Question {
    id: string;
    author: string;
    timestamp: number;
    optionOne: Option;
    optionTwo: Option;

    constructor(id: string, author: string, timestamp: number, optionOne: Option, optionTwo: Option) {
        this.id = id;
        this.author = author;
        this.timestamp = timestamp;
        this.optionOne = optionOne;
        this.optionTwo = optionTwo;
    }
}