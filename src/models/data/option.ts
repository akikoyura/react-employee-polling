export default class Option {
    votes: string[];
    text: string;

    constructor(votes: string[], text: string) {
        this.votes = votes;
        this.text = text;
    }
}