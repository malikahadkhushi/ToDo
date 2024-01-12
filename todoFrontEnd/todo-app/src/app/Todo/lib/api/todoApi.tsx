import baseUrl from '../../../config/constants';

interface todoI {
  _id:string,
  title:string,
  description:string,
  status:string,
  user_id : string,
  createdAt:string,
  _v:number
}


// Get All Todos of loggedIn User
export const getTodos = async (id:string)=>{

try {

  let response =await fetch(`${baseUrl}/gettodos/${id}`);
  let data =await response.json();
  return data;
  
} catch (error) {
  console.log("Error in getting Todos");
}

}

// post Todo Data Api
export const postTodoData =async (obj:{title:string,description:string,status:string})=>{

  try {

   let resp = await fetch(`${baseUrl}/createtodo`,{
      method:'Post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    });

    if(!resp.ok){
      throw new Error("Network response was not ok.");
    }
    
  } catch (error) {
    console.log("Failed To Post Todo",error);
  }

}

// Delete Api
export const deleteTodo =async (id:string)=>{

try {
  
let ack =await fetch(`${baseUrl}/deletetodo/${id}`,{
  method:"Delete",
  headers:{
    'Content-Type':"application/json",
  }
})

} catch (error) {
  console.log("Error in Delete Todo",error);
}
}

// Update Todo Api

export const updateTodo = async (todo:todoI)=>{


  try {

    let {_id} = todo;

    await fetch(`${baseUrl}/updatetodo/${_id}`,{
      method:"PUT",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(todo),
    })
    
  } catch (error) {
    console.log("Update Todo is Unsuccessfull");
  }


}


export const updateStatus =async (todoIds:string[])=>{

  try {

  await  fetch(`${baseUrl}/updatestatus`,{
      method:"PUT",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(todoIds)
    })

    
  } catch (error) {
    console.log("Error in Updating Status",error)
  }
}