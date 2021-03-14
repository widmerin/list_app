import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.GRIDSOME_API_URL
const supabaseKey = process.env.GRIDSOME_APP_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function createCategory(category) {
  try {
    const { data, error } = await supabase
      .from('Categories')
      .insert(category)

    if (error) {
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

async function createList(list) {
  try {
    const { data, error } = await supabase
      .from('Lists')
      .insert(list)

    if (error) {
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

async function createTask(task) {
  try {
    const { data, error } = await supabase
      .from('Tasks')
      .insert(task)

    if (error) {
      console.error('There was an error inserting', error)
      return null
    }
    return data
  } catch (err) {
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

async function deleteCategory(id) {
  const { data, error } = await supabase
  .from('Categories')
  .delete()
  .eq('id', id)
}

async function deleteList(id) {
  const { data, error } = await supabase
  .from('Lists')
  .delete()
  .eq('id', id)
}

async function deleteTask(id) {
  const { data, error } = await supabase
  .from('Tasks')
  .delete()
  .eq('id', id)
}

export { createCategory, createList, createTask, getCategories, deleteCategory, deleteList, deleteTask, getLists, getTasks, updateTask }