import User from "../models/data/user.ts"
import Question from "../models/data/question.ts"

let users: Record<string, User> = {
    sarahedo: createUser(
        'sarahedo',
        'Sarah Edo',
        '/src/assets/images/avatar.jpg',
        {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    ),
    tylermcginnis: createUser(
        'tylermcginnis',
        'Tyler McGinnis',
        '/src/assets/images/avatar.jpg',
        {
            "vthrdm985a262al8qx3do": 'optionOne',
            "xj352vofupe1dqz9emx13r": 'optionTwo',
        },
        ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
    ),
    mtsamis: createUser(
        'mtsamis',
        'Mike Tsamis',
        '/src/assets/images/avatar.jpg',
        {
            "xj352vofupe1dqz9emx13r": 'optionOne',
            "vthrdm985a262al8qx3do": 'optionTwo',
            "6ni6ok3ym7mf1p33lnez": 'optionOne'
        },
        ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
    ),
    zoshikanlu: createUser(
        'zoshikanlu',
        'Zenobia Oshikanlu',
        '/src/assets/images/avatar.jpg',
        {
            "xj352vofupe1dqz9emx13r": 'optionOne',
        },
        []
    ),
    johndoe: createUser(
        'johndoe',
        'johndoe',
        '/src/assets/images/default.jpg',
        {
            "xj352vofupe1dqz9emx13r": 'optionTwo',
            "vthrdm985a262al8qx3do": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne'
        },
        ["xj352vofupe1dqz9emx13r", "6ni6ok3ym7mf1p33lnez"]
    ),
}

let questions: Record<string, Question> = {
    "8xf0y6ziyjabvozdd253nd": createQuestion('8xf0y6ziyjabvozdd253nd', 'sarahedo', 1467166872634,
        {
            votes: ['sarahedo'],
            text: 'Build our new application with Javascript',
        },
        {
            votes: [],
            text: 'Build our new application with Typescript'
        }),
    "6ni6ok3ym7mf1p33lnez": createQuestion('6ni6ok3ym7mf1p33lnez', 'johndoe', 1468479767190,
        {
            votes: [],
            text: 'hire more frontend developers',
        },
        {
            votes: ['mtsamis', 'sarahedo'],
            text: 'hire more backend developers'
        }),
    "am8ehyc8byjqgar0jgpub9": createQuestion('am8ehyc8byjqgar0jgpub9', 'sarahedo', 1488579767190,
        {
            votes: [],
            text: 'conduct a release retrospective 1 week after a release',
        }, {
            votes: ['sarahedo'],
            text: 'conduct release retrospectives quarterly'
        }
    ),
    "loxhs1bqm25b708cmbf3g": createQuestion('loxhs1bqm25b708cmbf3g', 'tylermcginnis', 1482579767190, {
        votes: [],
        text: 'have code reviews conducted by peers',
    }, {
        votes: ['sarahedo'],
        text: 'have code reviews conducted by managers'
    }),
    "vthrdm985a262al8qx3do": createQuestion('vthrdm985a262al8qx3do', 'tylermcginnis', 1489579767190, {
        votes: ['tylermcginnis'],
        text: 'take a course on ReactJS',
    }, {
        votes: ['mtsamis'],
        text: 'take a course on unit testing with Jest'
    }),
    "xj352vofupe1dqz9emx13r": createQuestion('xj352vofupe1dqz9emx13r', 'johndoe', 1493579767190, {
        votes: ['mtsamis', 'zoshikanlu'],
        text: 'deploy to production once every two weeks',
    }, {
        votes: ['tylermcginnis'],
        text: 'deploy to production once every month'
    }),
};

function generateUID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function createUser(id: string, name: string, avatarURL: string, answers: Record<string, string>, questions: string[]): User {
    return {id, password: "123456", name, avatarURL, answers, questions};
}

function createQuestion(id: string, author: string, timestamp: number, optionOne: object, optionTwo: object): Question {
    return {
        id, author, timestamp,
        optionOne,
        optionTwo
    }
}

export function _getUsers(): Promise<Record<string, User>> {
    return new Promise((res) => {
        setTimeout(() => res({...users}), 500)
    })
}

export function _getQuestions(): Promise<Record<string, Question>> {
    return new Promise((res) => {
        setTimeout(() => res({...questions}), 500)
    })
}

function formatQuestion({optionOneText, optionTwoText, author}: {
    optionOneText: string,
    optionTwoText: string,
    author: User
}) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author: author.id,
        optionOne: {
            votes: [],
            text: optionOneText,
        },
        optionTwo: {
            votes: [],
            text: optionTwoText,
        }
    }
}

export function _saveQuestion(question: { optionOneText: string, optionTwoText: string, author: User }) {
    return new Promise((res, rej) => {
        if (!question?.optionOneText || !question?.optionTwoText || !question?.author) {
            rej("Please provide 2 answers of the question and its author")
        }

        const formattedQuestion = formatQuestion(question)

        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion
            }

            res(formattedQuestion)
        }, 1000)
    })
}

export function _saveQuestionAnswer({authedUser, qid, answer}: { authedUser: string, qid: string, answer: string }) {
    return new Promise<void>((res, rej) => {
        if (!authedUser || !qid || !answer) {
            rej("Please provide the answer, user and question id");
        }

        setTimeout(() => {
            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    answers: {
                        ...users[authedUser].answers,
                        [qid]: answer
                    }
                }
            }

            questions = {
                ...questions,
                [qid]: {
                    ...questions[qid],
                    [answer]: {
                        ...questions[qid][answer],
                        votes: questions[qid][answer].votes.concat([authedUser])
                    }
                }
            }

            res(true)
        }, 500)
    })
}

console.log(users)