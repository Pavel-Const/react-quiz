import React from 'react';
import classes from './Input.Module.css'

function isInvalid({valid, touched, shouldValidate}) {    //ф-ция валидации
    return !valid && shouldValidate && touched
}

const Input = (props) => {

    const inputType = props.type || 'text'  //передаем из пропсов тип инпута
    const cls = [classes.Input]
    const htmlFor = `${inputType}-${Math.random()}`  //уникальная строка для каждого инпута

    if (isInvalid(props)) {     //проверка валидации с добавление стиля
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label
                htmlFor={htmlFor}  //слово над инпутом
            >{props.label}</label>
            <input
                type={inputType}  //тип инпута
                id={htmlFor}        //уникальный id для каждого инпута
                value={props.value}     //значение инпута
                onChange={props.onChange}   //при изменении
            />

            {
                isInvalid(props)   //добавление спана если не прошла валидация
                    ? <span>{props.errorMessage || "Введите верное значение"}</span>
                    : null
            }


        </div>
    );
};


export default Input;
