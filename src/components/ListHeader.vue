<template>
  <div>
  <nav class="nav-extended">
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab" v-for="(list, index)  in lists" :key="index"><a href="#" class="active" @click="selectList(index)">{{ list.name }}</a></li>
      </ul>
    </div>
  </nav>
  <div class="list-header-action">
    <div class="input-field list-header-action-add">
      <span class="list-header-action-add-icon">+</span>
      <input type="text" placeholder="Add to List ..." class="list-header-action-add-input" v-model="newTask" @keyup.enter="addTask"/>
    </div>
    <div class="list-header-action-filter">
      <p class="tasks-title">Current List</p>
      <div class="list-header-action-filter-dropdown">
        <i class="material-icons list-header-action-filter-dropdown-icon" @click="showCategoryDropdown=!showCategoryDropdown">filter_list</i>
        <ul class="list-header-action-filter-dropdown-content" v-if="showCategoryDropdown">
          <li v-for="(category, index)  in categories" :key="index"><a href="#" class="active" @click="selectCategory(index)">{{ category.name }}</a></li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list-header',
    props: {
      lists: {
        type: Array,
        required: true,
      },
      categories: {
        type: Array,
        required: true,
      }
    },
    data() {
      return {
        newTask: '',
        showCategoryDropdown: false,
      }
    },
    methods: {
      addTask() {
        if (this.newTask.trim().length == 0) {
          return
        }
        this.$emit('addedTask', this.newTask)
        this.newTask = ''
      },
      selectList(id) {
        this.$emit('selectedList', id)
      },
      selectCategory(id) {
        this.showCategoryDropdown = false
        console.log(id)
      },
      close (e) {
          if (!this.$el.contains(e.target)) {
            this.showCategoryDropdown = false
          }
        }
      },
      mounted () {
        document.addEventListener('click', this.close)
      },
      beforeDestroy () {
        document.removeEventListener('click',this.close)
      }
  }
</script>
<style lang='scss'>
nav {
  background-color: #312c51;
  .brand-logo {
    img {
      max-width: 25px;
    }

  }
}
.list-header-action {
  margin: 0 15px;
  &-add {
    background-color: #312c51;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    color: #fff;
    margin-bottom: 0;
    width: 100%;
    margin-bottom: 15px;
    &-input {
      color: #fff;
      border: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    &-icon {
      min-width: 37px;
      font-size: 1.7em;
    }
  }
  &-filter {
    display: flex;
    align-items: center;
    justify-content: center;
    .tasks-title {
      width: 100%;
    }
    &-dropdown {
      position: relative;
      &-icon {
        color: #fff;
        margin-left: 15px;
        margin-right: 15px;
        cursor: pointer;
      }
      &-content {
        min-width: 150px;
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #312c51;
        li {
          padding: 10px;
          border-bottom: 1px solid #fff;
          a {
            color: #fff;
            display: block;
          }
        }
        li:last-child { border-bottom: none; }
      }
    }
  }
}
</style>
