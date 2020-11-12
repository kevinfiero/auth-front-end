import React, { Component } from 'react'
import request from 'superagent';
import { Link } from 'react-router-dom';

export default class ToDo extends Component {

    state = {
        toDoList: []
    }

    componentDidMount = async () => {
        const response = await request
            .get('https://agile-thicket-76983.herokuapp.com/api/todo')
            .set('Authorization', this.props.token)
        await this.setState({toDoList: response.body});
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const newToDo = {
            todo: this.state.todo,
            completed: false //fix in API
        }

        await request
            .post('https://agile-thicket-76983.herokuapp.com/api/todo')
            .set('Authorization', this.props.token)
            .send(newToDo); 
        const response = await request
            .get('https://agile-thicket-76983.herokuapp.com/api/todo')
            .set('Authorization', this.props.token)
        await this.setState({toDoList: response.body})
    }

    handleCheckClick = async (id) => {
        await request
        .put(`https://agile-thicket-76983.herokuapp.com/api/todo/${id}`)
        .set('Authorization', this.props.token)
        
        const response = await request
        .get('https://agile-thicket-76983.herokuapp.com/api/todo')
        .set('Authorization', this.props.token)
        await this.setState({toDoList: response.body})
    }


    render() {
        return (
            <div className = 'column'>
                <Link to="./">
                    <button onClick = {this.props.logout}>Log Out</button>
                </Link>
                <form className='column center' onSubmit = {this.handleSubmit}>
                    <div className = 'row small-margin'>
                        <label id='todo-label'>To Do:</label>
                        <input type='text' onChange={(e) => this.setState({ todo: e.target.value })}></input>
                    </div>
                    <button className='small-margin'>Create</button>
                </form>
                <div id='list' className ='column'>
                    {this.state.toDoList.map((todo, i) => 
                    <div className = 'row'>
                        {todo.completed ? <input key={`${todo.todo}-${Math.ceil(Math.random()*10000)}`} readOnly={true} type='checkbox' checked/> : <input key={`${todo.todo}-${Math.ceil(Math.random()*10000)}`} onChange={() => this.handleCheckClick(todo.id)} type='checkbox'/>}
                        <div key={`div-${todo.todo}-${i}`}>{todo.todo}</div>
                    </div>)}
                </div>
                
            </div>
        )
    }
}
