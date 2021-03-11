import React from "react";
import classes from './ActiveQuiz.module.css'
import AnswersList from "./AnswersList";

const ActiveQuiz = props => (                 //Компонент отвечает за текущий вопрос
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>{/*выводим номер вопроса и сам вопрос*/}
                &nbsp; {props.question}
            </span>
            <small>{props.answerNumber} из {props.quizLength}</small> {/*выводим номер вопроса из общего кол-ва вопросов*/}
        </p>
        <AnswersList
            answers={props.answers} //передача ответов в пропс
            onAnswerClick={props.onAnswerClick}//передача ф-ции клика на ответ
            state={props.state}                  //передем правильный ответ или нет
        />
    </div>
)

export default ActiveQuiz