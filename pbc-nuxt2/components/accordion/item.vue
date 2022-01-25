<template>
  <div :id="groupId + '-' + item.id" class="accordion-item" :class="{'is-active': item.active}">
    <dt class="accordion-item-title">
      <button @click="toggle" class="accordion-item-trigger">
        <h4 class="accordion-item-title-text">{{item.title}}</h4>
        <span class="accordion-item-trigger-icon"></span>
      </button>
    </dt>
    <transition
      name="accordion-item"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition">
      <dd v-if="item.active" class="accordion-item-details">
        <div v-html="item.details" class="accordion-item-details-inner"></div>
      </dd>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AccordionItem',
  //   data() {
  //   return {

  // }},
  props: ['item', 'multiple', 'groupId'],
  methods: {
    toggle(event) {
      if (this.multiple) this.item.active = !this.item.active
      else {
        this.$parent.$children.forEach((item, index) => {
          if (item.$el.id === event.currentTarget.parentElement.parentElement.id) item.item.active = !item.item.active
          else item.item.active = false
        }) 
      }
    },
    startTransition(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    
    endTransition(el) {
      el.style.height = ''
    }
  }
}
</script>

<style scoped>
.accordion-item-trigger, .accordion-item-details-inner {
  padding: 1.25rem;
}

.accordion-item-title {
  position: relative;
  background: #ddd;
  border-bottom: #fff 1px solid;
}

.accordion-item-title-text {
  font-size: 1.2em;
  color: #222;
}

.accordion-item-trigger {
  width: 100%;
  text-align: left;
  background-color: transparent;
  border: none;
  margin: 0 0 5px 0;
}

.accordion-item-trigger-icon {
  display: block;
  position: absolute;
  top: 0; right: 1.25rem; bottom: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  border-right: 2px solid #363636;
  border-bottom: 2px solid #363636;
  transform: translateY(-2px) rotate(45deg);
  /* transition: transform 0.2s ease; */
}
  
  .accordion-item.is-active .accordion-item-trigger-icon {
    transform: translateY(0) translateX(2px) rotate(135deg);
  }

.accordion-item-details {
  overflow: hidden;
  background-color: #f8f8f8;
  margin: 0;
}

.accordion-item-enter-active, .accordion-item-leave-active {
  will-change: height;
  transition: height 0.2s ease;
}
.accordion-item-enter, .accordion-item-leave-to {
  height: 0 !important;
}
</style>