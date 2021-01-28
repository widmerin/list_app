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
        <div class="list-header-action-filter-dropdown-category" v-if="selectedCategory" @click="removeCategory">{{ selectedCategory }}<span>x</span></div>
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
        selectedCategory: '',
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
        this.selectedCategory = this.getCategoryName(id)
        this.$emit('selectedCategory', this.categories[id].id)
      },
      getCategoryName(id) {
        return this.categories[id].name
      },
      removeCategory() {
        this.selectedCategory = ''
        this.$emit('selectedCategory', '')
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
      color: #fff;
      font-size: 14px;
      display: flex;
      &-icon {
        margin-left: 15px;
        margin-right: 15px;
        cursor: pointer;
      }
      &-category {
        text-transform: uppercase;
        background: #312c51;
        border-radius: 5px;
        padding: 0 10px;
        line-height: 24px;
        cursor: pointer;
        span {
          font-size: 10px;
          padding-left: 5px;
          vertical-align: bottom;
        }
      }
      &-content {
        min-width: 130px;
        position: absolute;
        top: 10px;
        right: 0;
        border: 1px solid #9e9e9e;
        border-radius: 5px;
        background-color: #312c51;
        li {
          padding: 10px;
          border-bottom: 1px solid #9e9e9e;
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
