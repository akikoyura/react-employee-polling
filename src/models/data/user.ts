export default class User {
    id: string;
    password: string;
    name: string;
    avatarURL: string;
    answers: Record<string, string>;
    questions: string[];

    constructor(id: string, password: string, name: string, avatarURL: string, answers: Record<string, string>, questions: string[]) {
        this.id = id;
        this.password = password
        this.name = name;
        this.avatarURL = avatarURL;
        this.answers = answers;
        this.questions = questions;
    }
}