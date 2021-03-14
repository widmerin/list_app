import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.GRIDSOME_API_URL
const supabaseKey = process.env.GRIDSOME_APP_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


/**
 *  Add a new task to supabase
 */
 async function createTask(task) {
  try {
    const { data, error } = await supabase
      .from('Tasks')
      .insert(task)

    if (error) {
      alert(error.message)
      console.error('There was an error inserting', error)
      return null
    }
    return data
  } catch (err) {
    alert('Error')
    console.error('Unknown problem inserting to db', err)
    return null
  }
}

async function getLists() {
  let { data: Lists } = await supabase.from('Lists').select('*');
  return Lists
}

async function getCategories() {
  let { data: Categories } = await supabase.from('Categories').select('*');
  return Categories
}

async function getTasks() {
  let { data: Tasks } = await supabase.from('Tasks').select('*');
  return Tasks
}

async function updateTask(task) {
  const { data, error } = await supabase
  .from('Tasks')
  .update(task)
  .eq('id', task.id)
}

async function deleteTask(id) {
  const { data, error } = await supabase
  .from('Tasks')
  .delete()
  .eq('id', id)
}

export { createTask, getCategories, deleteTask, getLists, getTasks, updateTask }