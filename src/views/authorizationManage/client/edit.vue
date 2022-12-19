<template>
  <client-detail :is-edit="true" />
</template>

<script>
import ClientDetail from './components/ClientDetail'

export default {
  name: 'ClientDetailEdit',
  components: { ClientDetail }
}
</script>

