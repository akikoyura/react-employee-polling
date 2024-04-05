import {_saveQuestion, _saveQuestionAnswer} from "../src/mocks/_DATA";

describe("_saveQuestion Unit Testing", () => {
    it("should return the formatted questions", async () => {
        const response = await _saveQuestion({
            optionOneText: "A",
            optionTwoText: "B",
            author: {
                id: 'johndoe',
                password: "123456",
                name: 'johndoe',
                avatarURL: '/src/assets/images/avatar.jpg',
                answers: {
                    "8xf0y6ziyjabvozdd253nd": 'optionOne',
                    "6ni6ok3ym7mf1p33lnez": 'optionOne',
                    "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                    "loxhs1bqm25b708cmbf3g": 'optionTwo'
                },
                questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
            }
        });

        expect(response).toBeTruthy();
    });

    it("should produce an error when the provided parameters are not valid", async () => {
        const response = await _saveQuestion(undefined).catch(e => e);

        expect(response).toBe("Please provide 2 answers of the question and its author")
    });

    it("should produce an error when the provided parameters are not valid", async () => {
        const response = await _saveQuestion({
            optionOneText: undefined,
            optionTwoText: undefined,
            author: undefined,
        }).catch(e => e);

        expect(response).toBe("Please provide 2 answers of the question and its author")
    });

    it("should yield an error when at least one parameter property is invalid", async () => {
        const response = await _saveQuestion({
            optionOneText: undefined,
            optionTwoText: "C",
            author: {
                id: 'johndoe',
                password: "123456",
                name: 'johndoe',
                avatarURL: '/src/assets/images/avatar.jpg',
                answers: {
                    "8xf0y6ziyjabvozdd253nd": 'optionOne',
                    "6ni6ok3ym7mf1p33lnez": 'optionOne',
                    "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                    "loxhs1bqm25b708cmbf3g": 'optionTwo'
                },
                questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
            }
        }).catch(e => e);

        expect(response).toBe("Please provide 2 answers of the question and its author")
    });
})

describe("Unit Testing for _saveQuestionAnswer Function", () => {
    it("should return true for correct parameters", async () => {

        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("should produce an error when at least one property is invalid", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "johndoe",
            qid: undefined,
            answer: "OptionTwo"
        }).catch(e => e);

        expect(response).toBe("Please provide the answer, user and question id");
    });

    it("should produce an error when all properties are invalid", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: undefined,
            qid: undefined,
            answer: undefined
        }).catch(e => e);

        expect(response).toBe("Please provide the answer, user and question id");
    });
});