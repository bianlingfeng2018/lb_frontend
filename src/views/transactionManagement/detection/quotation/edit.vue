<template>
  <quotation-detail :is-edit="true" />
</template>

<script>
import QuotationDetail from './components/QuotationDetail'

export default {
  name: 'QuotationEdit',
  components: { QuotationDetail }
}
</script>

