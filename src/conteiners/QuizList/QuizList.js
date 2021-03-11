import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './QuizList.module.css'
import {NavLink} from "react-router-dom";

class QuizList extends Component {

    state = {};

    renderQuizes(){
        return [1,2,3].map ((quiz, index) =>{
            return(
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz}>
                        Тест {quiz}
                    </NavLink>
                </li>
            )
        } )
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>QuizList</h1>

                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>

            </div>
        );
    }
}

export default QuizList;
