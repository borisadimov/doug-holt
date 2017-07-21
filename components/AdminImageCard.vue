<template lang="pug">
.image(@click="handleCardClick(image)")
  span(@click="handleRemoveClick(image)").image-delete-btn
    | ❌
  img(:src="image.url", alt="" ref="image")
  .name {{ image.name }}
  .date(v-if="image.created_at") {{ new Date(image.created_at).toTimeString() }}
</template>

<script>
export default {
  props: ['image'],

  methods: {
    handleRemoveClick: function (params) {
      this.$emit('on-remove-click', params)
    },
    handleCardClick: function (params) {
      this.$emit('on-card-click', params)
    }
  }
}
</script>

<style lang="scss">
$primary-color: #EBC8B2;

.image {
  flex: 1 1 25%;
  max-width: 25%;
  padding: 25px;
  background-color: #fff;
  position: relative;
  border: 5px solid $primary-color;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    margin-bottom: 10px;
  }
  .name {
    font-size: 14px;
  }
  .date {
    font-size: 12px;
  }
}

.image-delete-btn {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
  font-size: 10px;
}

</style>
