<template>
  <detection-detail :is-edit="true" />
</template>

<script>
import DetectionDetail from './components/DetectionDetail'

export default {
  name: 'DetectionEdit',
  components: { DetectionDetail }
}
</script>

