<template>
<header>
  <div class="list-header">
    <nav class="list-header-nav-extended nav-extended">
      <div class="list-header-nav-content nav-content">
        <ul class="tabs tabs-transparent">
          <li class="tab" v-for="(list, index)  in lists" :key="index"><a href="#" v-bind:class="{ active: index ==  currentListId}" @click="selectList(index)">{{ list.data.name }}</a></li>
        </ul>
      </div>
    </nav>
      <div class="list-header-nav-filter-dropdown">
        <i class="material-icons list-header-nav-filter-dropdown-menu-icon" @click="showMenuDropdown=!showMenuDropdown">settings</i>
        <ul class="list-header-nav-filter-dropdown-content" v-if="showMenuDropdown">
          <li @click="openModal('lists')"><i class="material-icons list-header-nav-icon" >edit</i>Lists</li>
          <li @click="openModal('categories')"><i class="material-icons list-header-nav-icon" >edit</i>Categories</li>
          <li @click="refreshData"><i class="material-icons list-header-nav-icon" >sync</i>Refresh</li>
          <li @click="logout"><i class="material-icons list-header-nav-icon">exit_to_app</i>Log Out</li>
        </ul>
      </div>
  </div>
  <div class="list-header-nav-filter">
    <div class="list-header-selected-category">
      <span class="list-header-selected-category-label" v-if="selectedCategory" @click="removeCategory">{{ selectedCategory }} <span class="list-header-selected-category-remove">x</span></span>
    </div>
    <div class="list-header-nav-filter-dropdown">
      <i class="material-icons list-header-nav-filter-dropdown-icon" @click="showCategoryDropdown=!showCategoryDropdown">filter_list</i>
      <ul class="list-header-nav-filter-dropdown-content" v-if="showCategoryDropdown">
        <li v-for="(category, index)  in categories" :key="index"><a href="#" @click="selectCategory(index)">{{ category.data.name }}</a></li>
      </ul>
    </div>
  </div>
    <!-- overlay -->
  <div class="list-overlay" v-if="showModal" @click="openModal = false"></div>

  <!-- modal -->
  <div class="list-modal" v-if="showModal">
    <div class="list-modal-form">
      <button class="list-modal-close" @click="showModal = false">x</button>
      <h5>Edit {{modalType}}</h5>
       <ul >
          <li v-for="(list, index) in modalData" :key="index">{{ list.data.name }}<span class="list-modal-form-remove" @click="removeItem(list.ref['@ref'].id, index)">&times;</span></li>
        </ul>
      <input type="text" placeholder="Create new List" ref="input" v-model="newItem">
      <button class="btn" @click="addItem" v-on:keyup.enter="addItem">Add List</button>
    </div>
  </div>
  </header>
</template>
<script>
  import { getReferenceId } from '@/helpers/utils';
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
      },
      currentListId: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        newItem: '',
        showCategoryDropdown: false,
        showMenuDropdown: false,
        selectedCategory: '',
        showModal: false,
        modalData: '',
        modalType: ''
      }
    },
    methods: {
      openModal(type) {
        if (type == 'lists') {
          this.modalData = this.lists
          this.modalType = "Lists"
        }
        else if (type == 'categories') {
          this.modalData = this.categories
          this.modalType = "Categories"
        }     
        this.showModal = true,
        this.showMenuDropdown = false,
        this.showCategoryDropdown = false
      },
      addItem() {
        if (this.newItem.trim().length == 0) {
          return
        }
        if (this.modalType == 'Lists') {
          this.$emit('addedList', this.newItem)
        }
        else if (this.modalType == 'Categories') {
          this.$emit('addedCategory', this.newItem)
        }
        this.newItem = ''
        this.showModal = false;
      },
      removeItem(id, index) {
        if (this.modalType == 'Lists') {
          this.$emit('removedList', id, index)
        }
        else if (this.modalType == 'Categories') {
          this.$emit('removedCategory', id, index)
        }
      },
      logout(){
        this.$emit('logoutUser', 'logout')
      },
      selectList(id) {
        this.$emit('selectedList', id)
      },
      selectCategory(id) {
        this.showCategoryDropdown = false
        this.selectedCategory = this.getCategoryName(id)
        this.$emit('selectedCategory', getReferenceId(this.categories[id]))
      },
      refreshData() {
        this.$emit('refreshedData')
      },
      getCategoryName(id) {
        return this.categories[id].data.name
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
  .nav-content {
    .tabs {
      .tab {
      a.active {
          border-bottom: 2px solid #fff;
          outline: none;
        }
      }
    }
  }
}
header {
  margin-bottom: 10px;
}
.list-header {
  padding: 0 15px;
  background-color: #312c51;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 5px;
  &-nav {
    &-extended {
      box-shadow: none;
    }
    &-icon {
      cursor: pointer;
      color: #FFF;
      font-size: 16px;;
      padding-right: 5px;
      vertical-align: middle;
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
        &-menu-icon {
          cursor: pointer;
        }
        &-icon {
          margin-right: 15px;
          cursor: pointer;
        }

        &-content {
          min-width: 130px;
          position: absolute;
          top: 14px;
          right: 0;
          border-top: 1px solid #fff;
          background-color: #312c51;
          cursor: pointer;
          z-index: 99999;
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
  &-nav-filter {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &-selected-category {
    height: 35px;

    color: #fff;
    cursor: pointer;
    padding: 5px 15px;
    &-label{
      text-transform: uppercase;
      padding: 5px 10px;
      line-height: 24px;
      font-size: 14px;
      background: #312c51;
      border-radius: 5px;
    }
    &-remove {
        font-size: 10px;
        padding-left: 5px;
      }
    }
}
 .list-overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }

  .list-modal {
    position:absolute;
    top: 50px;
    width: 300px;
    min-height: 250px;
    z-index: 9999;
    margin: 0 auto;
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
    &-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px;
      align-items: stretch;
      justify-content: space-between;
      min-height: 250px; 
      &-remove {
        padding: 0 5px;
        cursor: pointer;
      }
    }
    }
</style>
