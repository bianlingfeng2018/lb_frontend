<template>
  <report-detail :is-edit="true" />
</template>

<script>
import ReportDetail from './components/ReportDetail'

export default {
  name: 'ReportEdit',
  components: { ReportDetail }
}
</script>

