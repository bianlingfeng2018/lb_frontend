<template>
  <client-com-detail :is-edit="true" />
</template>

<script>
import ClientComDetail from './components/ClientComDetail'

export default {
  name: 'ClientComDetailEdit',
  components: { ClientComDetail }
}
</script>

