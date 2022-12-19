<template>
  <worksheet-detail :is-edit="true" />
</template>

<script>
import WorksheetDetail from './components/WorksheetDetail'

export default {
  name: 'WorksheetEdit',
  components: { WorksheetDetail }
}
</script>

