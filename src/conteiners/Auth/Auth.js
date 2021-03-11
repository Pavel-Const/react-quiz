import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'

class Auth extends Component {
    state = {
        isFormValid: false,     //значение валидации всей формы
        formControls: {
            email: {
                value: '',    //значение пустая строка
                type: 'email',    //тип
                label: 'Email',     //лейбл
                errorMessage: 'Введите корректный email',   //поле ошибки
                valid: false,       //
                touched: false,      //свойство отвечающее затронут инпут или нет
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) { //ф-ция валидации объекта
        if (!validation) {  //если не передали параметр
            return true
        }
        let isValid = true  // переменная для возврата

        if (validation.required) {
            isValid = value.trim() !== '' && isValid  //проверка есть ли что-то в строке(trim очищает пробелы)
        }
        if (validation.email) {
            isValid = is.email(value) && isValid  // добавляем is_js для валидации емейла
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid  //длина значения поля больше либо равна минимальной длины
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}  //созд. копию state
        const control = {...formControls[controlName]}      //копия каждого контрола(чтобы не было мутации)

        control.value = event.target.value  //меняем значение инпута
        control.touched = true              //когда тронул инпут
        control.valid = this.validateControl(control.value, control.validation)//ф-ция для контроля валидации

        formControls[controlName] = control //обновляем контрол

        let isFormValid = true  //переменная для проверки всех значений формы на валидацию
        Object.keys(formControls).forEach(name => {  //перебираем все значения на валидность
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid //заменяем state
        })
    }

    renderInputs() {  //ф-ция для отрисовки инпута
        return Object.keys(this.state.formControls).map((controlName, index) => {   //перебираем state
            const control = this.state.formControls[controlName]  //название формы
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}   //привести у булеан типу !!
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}//ф-ция при изменении
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Auth</h1>

                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>

                        {this.renderInputs()}

                        <Button
                            type={'succes'}
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >Войти</Button>
                        <Button
                            type={'primary'}
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >Зарегестрироваться</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;
