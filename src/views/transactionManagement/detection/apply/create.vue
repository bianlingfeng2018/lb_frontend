<template>
  <apply-detail :is-edit="false" />
</template>

<script>
import ApplyDetail from './components/ApplyDetail'

export default {
  name: 'ApplyCreate',
  components: { ApplyDetail }
}
</script>
