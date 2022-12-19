<template>
  <worksheet-detail :is-edit="false" />
</template>

<script>
import WorksheetDetail from './components/WorksheetDetail'

export default {
  name: 'WorksheetCreate',
  components: { WorksheetDetail }
}
</script>
