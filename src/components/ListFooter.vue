<template>

<div class="list-footer">
  <!-- overlay -->
  <div class="list-footer-overlay" v-if="showModal" @click="showModal = false"></div>

  <!-- modal -->
  <div class="list-footer-modal" v-if="showModal">
    <button class="list-footer-modal-close" @click="showModal = false">x</button>

    <h5>Create new Task</h5>
    <div class="input-field">
      <input type="text" placeholder="Add new Task ..." class="list-footer-modal-task" v-model="newTask" v-on:keyup.enter="addTask" autofocus>
    </div>
    <div class="input-field">
      <select class="list-footer-modal-category" v-model="newCategory">
        <option disabled selected value="">Category</option>
        <option v-for="category in categories" v-bind:value="category.ref['@ref'].id" :key="category">
          {{ category.data.name }}
        </option>
      </select>
    </div>
    <div class="list-footer-modal-btn"><button class="waves-effect waves-light btn" @click="addTask">Add Task</button></div>
  </div>
  <a class="waves-effect waves-light btn list-footer-add-btn" @click="showModal = true"><span class="list-footer-add-add-icon material-icons">+</span> Add Task</a>
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
        showModal: false
      }
    },
    methods: {
      addTask() {
        if (this.newTask.trim().length == 0) {
          return
        }
        this.$emit('addedTask', this.newTask, this.newCategory)
        this.newTask = ''
        this.newCategory = ''
        this.showModal = false;
      },
    },
    watch:{
    showModal:function(value){
     // set the focus when the modal opened/closed
      this.$refs.inputText1.focus();
    }
  },
  }
</script>

<style lang='scss'>
.list-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  &-add-add-icon {
    padding-right: 5px;
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
    &-btn {
      display: flex;
      justify-content: center;
    }
    &-category {
      display: inline-block;
    }
  }
  &-add-btn {
    height: 48px;
    position: fixed;
    bottom:0%;
    width:100%;
    padding: 4px;
  }
}
</style>
