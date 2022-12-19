<template>
  <client-detail :is-edit="false" />
</template>

<script>
import ClientDetail from './components/ClientDetail'

export default {
  name: 'ClientDetailCreate',
  components: { ClientDetail }
}
</script>
