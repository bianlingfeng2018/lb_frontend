<template>
  <finance :is-edit="true" />
</template>

<script>
import Finance from './components/FinaceDetail'

export default {
  name: 'FinanceEdit',
  components: { Finance }
}
</script>

