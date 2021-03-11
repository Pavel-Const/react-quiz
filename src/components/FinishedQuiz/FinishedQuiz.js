import React from "react";
import classes from '../FinishedQuiz/FinishedQuiz.module.css'
import Button from "../UI/Button/Button";
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'succes'){
            total++
        }
        return total
    }, 0)

    return(
        <div className={classes.FinishedQuiz}>
            {/*выводим список всех вопросов и отмечаем правильно или нет*/}
            <ul>
                {props.quiz.map((quizItem, index) => {      //перебираем массив вопросов для вывода вопросов
                    const cls =[                            //классы для иконок ответов
                        'fa',
                        props.results[quizItem.id] === 'error' ?  'fa-times' : 'fa-check',  //крестик или галочка в зависимости от ответа
                        classes[props.results[quizItem.id]]          //красим в зеленый или красный classes.error or classes.succes
                    ]
                    return(//возвращаем вопросы
                        <li key={index}>
                            <strong>{index+1}</strong>. &nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {successCount} из {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type={'primary'}>Повторить</Button>
                <Link to={'/'}>
                    <Button onClick={props.onRetry} type={'succes'}>Перейти в список тестов</Button>
                </Link>

            </div>
        </div>
    )
}

export default FinishedQuiz