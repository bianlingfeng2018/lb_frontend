<template>
  <client-com-detail :is-edit="false" />
</template>

<script>
import ClientComDetail from './components/ClientComDetail'

export default {
  name: 'ClientComDetailCreate',
  components: { ClientComDetail }
}
</script>
