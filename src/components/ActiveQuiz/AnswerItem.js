import React from "react";
import classes from './AnswerItem.module.css'

const AnswersItem = props => { //Компонент ответа
    const cls = [classes.AnswerItem]

    if(props.state){//если в пропсе что-то есть
        cls.push(classes[props.state])//добавляем стиль в зависимости от того правильный ответ или нет
    }

    return (
        <li
            className={cls.join(' ')}//добавляем стиль
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}

        </li>
    )
}

export default AnswersItem