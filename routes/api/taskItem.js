const router = require('express').Router();

const taskItemsModel = require('../../models/taskItem')

router.post('/api/task', async (req,res) => {
    try{
        const newTask = new taskItemsModel({
            item: req.body.item
        })
        const saveItem = await newTask.save()
        res.status(200).json('Task added');
    }
    catch(err){
        res.json(err);
    }
})

router.get('/api/task', async (req,res)=> {
    try{
        const allTaskItems = await taskItemsModel.find({});
        res.status(200).json(allTaskItems)
    }
    catch(err){
        res.json(err)
    }
})

router.put('/api/task/:id', async (req,res)=> {
    try{
        const updateTask = await taskItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(200).json('update')
    }
    catch(err){
        res.json(err);
    }
})
router.delete('api/task/:id', async (req,res)=> {
    try{
        const deleteItem = await taskItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('deleted')
    }
    catch(err){
        res.json(err)
    }
})
module.exports = router;
