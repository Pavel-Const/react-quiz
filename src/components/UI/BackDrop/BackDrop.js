import React, {Component} from "react";
import classes from'./BackDrop.Module.css'

const BackDrop = props => <div className={classes.BackDrop} onClick={props.onClick}/>

export default BackDrop