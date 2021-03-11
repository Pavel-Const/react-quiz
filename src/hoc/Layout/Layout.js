import React, {Component} from "react";
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/ComponentMenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";


//Компонент высшего порядка для оборачивания всего приложения, для стилей, навигации и т.д.
class Layout extends Component{
    state ={
        menu: false
    }
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
}

    menuCloseHandler = () => {
        this.setState({
            menu:false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>

                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                />

                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout