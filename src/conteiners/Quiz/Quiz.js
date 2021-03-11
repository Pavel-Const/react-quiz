import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results:{},                     //объект для записи результатов {[id]: 'succes or error'} для всех вопросов
        isFinished: false,               //закончился ли тест
        activeQuestion: 0,              //счетчик номера вопросов
        answerState: null,              //храним информацию о текущем клике пользователя  {[id]: 'succes or error'}
        quiz: [
            {
                question: "Какого цвета небо?", //вопрос
                rightAnswerID: 2,               //правильный номер ответа
                id: 1,
                answers: [                      //ответы
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Зеленый', id: 3},
                    {text: 'Красный', id: 4}
                ]
            },
            {
                question: "В каком году основали Санкт-Петербург",
                rightAnswerID: 3,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {      //ф-ция для клика на ответ
        if (this.state.answerState) {               //делаем проверку чтобы при двойном нажатии на ответ не перескакивал
            const key = Object.keys(this.state.answerState)[0]//вытаскиваем состояние ключа, [0] т.к. только одно значение
            if (this.state.answerState[key] === 'succes') {
                return  //если ответ правильный то возвращаем просто retern чтобы не заходить в ф-цию
            }
        }

        const question = this.state.quiz[this.state.activeQuestion] // постоянная для вопроса
        const results = this.state.results

        if (question.rightAnswerID === answerId) {    //ПРИ ПРАВИЛЬНОМ ОТВЕТЕ
            if(!results[question.id]){         //если сразу ответили правильно
                results[question.id] = 'succes'
            }
            this.setState({   //изменение стейта при правильном ответе
                answerState: {[answerId]: 'succes'} ,
                results
            })

            const timeout = window.setTimeout(() => {   //создание задержки после ответа
                if (this.isQuizFinished()) {  //если вопросы закончились
                    this.setState({
                        isFinished: true
                    })
                } else {

                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1, // набираем счетчик вопросов
                        answerState: null //обнуляем параметр чтобы выделение не передавалось на следующий вопрос
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

        } else {      //ПРИ НЕ ПРАВИЛЬНОМ ОТВЕТЕ
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }

    }

    isQuizFinished() {      //метод для проверки закончились ли вопросы или нет, возвращает true или false
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () =>{   //функция обнуления стейта для кнопки повторить
        this.setState({
            results:{},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
        })
    }

    componentDidMount() {
        console.log('quiz id = ', this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished           //ПРОВЕРЯЕМ ЗАКОНЧИЛСЯ ЛИ ТЕСТ
                            ? <FinishedQuiz             //если закончился то вызываем компоненту финиша
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            :
                            <ActiveQuiz                  //если нет то вызываем список вопросов
                                answers={this.state.quiz[this.state.activeQuestion].answers}//передаем ответы
                                question={this.state.quiz[this.state.activeQuestion].question}//передаем вопросы
                                onAnswerClick={this.onAnswerClickHandler}   //передача ф-ции клика на ответ
                                quizLength={this.state.quiz.length}         //передаем длинну массива вопросов
                                answerNumber={this.state.activeQuestion + 1}//передача номера вопроса
                                state={this.state.answerState}              //передем правильный ответ или нет
                            />
                    }

                </div>
            </div>
        );
    }
}

export default Quiz