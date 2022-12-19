<template>
  <report-detail :is-edit="false" />
</template>

<script>
import ReportDetail from './components/ReportDetail'

export default {
  name: 'ReportCreate',
  components: { ReportDetail }
}
</script>
