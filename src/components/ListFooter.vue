<template>

<div class="list-footer" >
  <div class="list-footer-add">
    <div class="input-field">
      <input type="text" placeholder="Add Task..." ref="input" class="list-footer-modal-task" v-model="newTask" v-on:keyup.enter="addTask">

    </div>
    <div>
      <input type="submit" placeholder="Add Task..." @click="addTask" value="+" ref="btn" class="list-footer-add-icon">


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
        if (this.newTask.trim().length != 0) {
          this.$emit('addedTask', this.newTask, this.newCategory)
          this.newTask = ''
        }
        this.$refs.btn.focus()
      },
    },

  }
</script>

<style lang='scss'>
.list-footer {
    height: 60px;
    background-color: #312c51;
    padding: 0 15px;
    position: fixed;
    bottom: -1px;
    width:100%;
    padding: 0;
    max-width: 600px;
    color: #fff;
    &-add {
      padding: 5px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      &-icon {
        cursor: pointer;
        height: 30px;
        margin: 0;
        padding: 5px;
        background: transparent;
        line-height: 0.2em;
        color: white;
        font-size: 30px;
        border: none;
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
        }
      }
      .btn {
        height: 25px
      }

  }
}
</style>
