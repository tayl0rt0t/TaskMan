import { useEffect, useState } from "react";
import axios from "axios";
export default function TaskItems() {
  const [itemText, setItemText] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [updating, setUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");
  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/task", {
        item: itemText,
      });
      setTaskItems((prevTask) => [...prevTask, res.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getTaskList = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/tasks");
        setTaskItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTaskList();
  }, []);

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/task/${id}`);
      const newTaskItems = taskItems.filter((item) => item._id !== id);
      setTaskItems(newTaskItems);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async(e) => {
    e.preventDefault()
    try{
        const res = await axios.put(`http://localhost:3001/api/task/${updating}`, {item: updateItemText})
        
        console.log(res.data)
        const updatedTaskIndex = taskItems.findIndex(item => item._id === updating)
        const updatedTask = taskItems[updatedTaskIndex].item = updateItemText 
        setUpdateItemText('')
        setUpdating('')
    }
    catch(err){
        console.log(err);
    }
  }

  const updateForm = () => (
    <form className="update-form" onSubmit={(e) => updateTask(e)}>
      <input className="update-input" type="text" placeholder="edit task" onChange={e => {setUpdateItemText(e.target.value)}} value={updateItemText}/>
      <button className="update-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div>
      <form className="taskForm" onSubmit={(e) => addTask(e)}>
        <input
          type="text"
          placeholder="add a task"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <button type="submit">Add</button>
      </form>
      <div className="task-list">
        {taskItems.map((item) => (
          <div className="task-item">
            {updating === item._id ? (
              updateForm()
            ) : (
              <>
                <p className="task-content">{item.item}</p>
                <button
                  className="update-task"
                  onClick={() => {
                    setUpdating(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-task"
                  onClick={() => {
                    deleteTask(item._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
