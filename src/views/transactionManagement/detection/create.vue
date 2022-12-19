<template>
  <detection-detail :is-edit="false" />
</template>

<script>
import DetectionDetail from './components/DetectionDetail'

export default {
  name: 'DetectionCreate',
  components: { DetectionDetail }
}
</script>
