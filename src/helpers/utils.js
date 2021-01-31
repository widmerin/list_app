import axios from 'axios';
function createTask(title,category,list){
      axios.post(`/.netlify/functions/create-task`, {
          title: title,
          category: category,
          list: list,
          completed: false,
      })
      .then(response => {
        return response.data
      })
      .catch(function (error) {
          console.log(error);
      })
}
function deleteTask(id){
  axios.delete(`/.netlify/functions/delete-task/${id}`)
  .catch(function (error) {
      console.log(error);
  })
}

function updateTask(id, data){
  axios.put(`/.netlify/functions/update-task/${id}`, data)
  .catch(function (error) {
      console.log(error);
  })
}


function getReferenceId(element) {
      return element.ref['@ref'].id
    }

export { deleteTask, updateTask, getReferenceId };
