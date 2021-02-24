<template>

<div class="list-footer">
  <!-- overlay -->
  <div class="list-footer-overlay" v-if="showModal" @click="closeModal()"></div>

  <!-- modal -->
  <div class="list-footer-modal" v-if="showModal">
    <button class="list-footer-modal-close" @click="closeModal()">x</button>

    <h5>Create new Task</h5>
    <input type="text" ref="task" placeholder="Add to List ..." class="list-footer-modal-task" v-model="newTask" autofocus  v-on:keyup.enter="addTask">
      <select class="list-footer-modal-category" v-model="newCategory">
        <option selected value=""></option>
        <option v-for="(category, index) in categories" v-bind:value="category.ref['@ref'].id" :key="index">
          {{ category.data.name }}
        </option>
      </select>
    <button class="waves-effect waves-light btn" @click="addTask">Add Task</button>
  </div>
  <button class="waves-effect waves-light btn list-footer-add-btn" @click="openModal()">+</button>
</div>
</template>

<script>
  export default {
    name: 'list-footer',
    props: {
      categories: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        newTask: '',
        newCategory: '',
        showModal: false,
      }
    },
    methods: {
      openModal() {
       // this.$refs.task.focus()
        this.showModal = true
      },
      closeModal() {
        this.showModal = false
      },
      addTask() {
        if (this.newTask.trim().length == 0) {
          return
        }
        this.$emit('addedTask', this.newTask, this.newCategory)
        this.newTask = ''
        this.newCategory = ''
        this.showModal = false;
      },
     
    }
  }
</script>

<style lang='scss'>
.list-footer {
  display: flex;
  align-items: center;
  justify-content: center;

  &-add-btn {
    position: absolute;
    bottom: 15px;
    right: 15px;
    text-align: center;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: white;
    text-decoration: none
  }

  &-overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }

  &-modal {
    position:absolute;
    top: 50px;
    width: 300px;
    min-height: 250px;
    z-index: 9999;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    &-close {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 10px;
      background: none;
      border: none;
      font-weight: bold;
      cursor: pointer;
    }
    &-category {
      display: inline-block;
    }
  }
}
</style>
