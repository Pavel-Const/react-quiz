import React from "react";
import classes from './AnswersList.module.css'
import AnswerItem from "./AnswerItem";

const AnswersList = props => (  //Компонент отвечает за список вариантов ответов
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, index) => { //Перебираем массив ответо для передачи в компоненту ответов
            return (
                <AnswerItem
                    key={index}
                    answer={answer} //Передача ответа в пропс
                    onAnswerClick={props.onAnswerClick}//передача ф-ции клика на ответ
                    state={props.state ? props.state[answer.id] : null}//передаем и проверяем есть ли ответ, и правильный ли он
                />
            )
        })}
    </ul>
)

export default AnswersList