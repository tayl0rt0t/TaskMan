import { useEffect, useState } from "react"
import axios from "axios"
export default function TaskItems() {
    const [itemText, setItemText ] = useState('')
    const [taskItems, setTaskItems] = useState([])
    const addTask = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3001/api/task', {item:itemText})
            console.log(res)
            setItemText('');
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect (() => {
        const getTaskList = async() => {
            try{
                const res = await axios.get('http://localhost:3001/api/tasks')
                setTaskItems(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getTaskList()
    },[])

    return(
        <div>
            <form className="taskForm" onSubmit={e => addTask(e)}>
                <input type='text' placeholder='add a task' onChange={e => {setItemText(e.target.value)}} value={itemText}/>
                <button type = 'submit'>Add</button>
            </form>
            <div className="task-list">
                {
                    taskItems.map(item => (
                    <div className="task-item">
                    <p className="task-content">{item.item}</p>
                    <button className="update-task">Update</button>
                    <button className="delete-task">Delete</button>
                </div>
                    ))
                }
                
            </div>
        </div>
    )

}