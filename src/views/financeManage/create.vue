<template>
  <finance :is-edit="false" />
</template>

<script>
import Finance from './components/FinaceDetail'

export default {
  name: 'FinanceCreate',
  components: { Finance }
}
</script>
