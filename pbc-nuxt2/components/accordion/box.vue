<template>
    <dl class="accordion box" role="presentation">
    <AccordionItem
        v-for="item in content"
        :multiple="multiple"
        :item="item"
        :groupId="groupId"
        :key="item.id">
    </AccordionItem>
    </dl>
</template>

<script>
export default {
  name: 'AccordionBox',
  props: {
    content: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      groupId: null
    }
  },
}
</script>

<style scoped>
.container {
  margin-bottom: em(24);
}

.btn-action-delete {
  color: #ccc;
  cursor: pointer;
}

.accordion {
  padding: 0;
  }


</style>