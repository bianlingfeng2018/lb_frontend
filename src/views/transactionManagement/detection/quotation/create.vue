<template>
  <quotation-detail :is-edit="false" />
</template>

<script>
import QuotationDetail from './components/QuotationDetail'

export default {
  name: 'QuotationCreate',
  components: { QuotationDetail }
}
</script>
