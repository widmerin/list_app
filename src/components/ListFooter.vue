<template>

<div class="list-footer">
  <div class="list-footer-add">
    <div class="input-field">
      <input type="text" placeholder="Add Task..." id="inputText1" class="list-footer-modal-task" v-model="newTask" v-on:keyup.enter="addTask" autofocus>
    </div>
    <div>
      <span  @click="addTask" class="list-footer-add-icon material-icons">+</span>
    </div>
  </div>
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

  }
</script>

<style lang='scss'>
.list-footer {
    height: 50px;
    background-color: #312c51;
    padding: 0 15px;
    position: fixed;
    bottom:0%;
    width:100%;
    padding: 0;
    max-width: 600px;
    color: #fff;
    &-add {
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      &-icon {
        cursor: pointer;
        padding: 0 5px;
      }
      .input-field {
        width: 100%;
        padding-right: 15px;
        margin-top: 0;
        height: 42px;
        input {
          min-width: 100%;
          color: #fff;
        }
        input::-webkit-input-placeholder {
          text-transform: uppercase;
          font-size: 12px;
        }
      }
      .btn {
        height: 25px
      }

  }
}
</style>
