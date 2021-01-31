function bar() {
    return 'bar';
}

function getCategories() {
  return fetch('/.netlify/functions/get-categories',{
       headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      }).then((response) => {
    return response.json()
  })
}

function getLists(){
  return fetch('/.netlify/functions/get-lists').then((response) => {
    return response.json()
  })
}

function getTasks(){
  return fetch('/.netlify/functions/get-tasks').then((response) => {
    return response.json()
  })
}

function createCategory(data){
  return fetch('./.netlify/functions/create-category', {
  headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}


function updateTask(data){
  return fetch('./.netlify/functions/post-category', {
  headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

function deleteTask(data){
  return fetch('./.netlify/functions/create-category', {
  headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export { bar, getCategories, createCategory };
