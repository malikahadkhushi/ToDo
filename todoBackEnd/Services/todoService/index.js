const {todoData} = require('../../collectionSchemas/index');

exports.createTodoService = (data)=>{
    return todoData.insertMany([data]);
}

exports.getTodoService = (id)=>{
    return todoData.findById({_id:id});
}

exports.getUserTodosService = (id)=>{
    return todoData.find({user_id:id});
}

exports.deleteTodoService = (id)=>{
    return todoData.deleteOne({_id:id});
}

exports.updateTodoService = (obj)=>{
    let {id}  = obj;
    return todoData.updateOne({_id:id},{$set: obj})
}

exports.updateStatusService = (completedTodos)=>{

    return todoData.updateMany({_id:{$in:completedTodos}} , {$set:{status:'completed'}});

}