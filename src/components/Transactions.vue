<template>
    <v-container fluid>
        <Transactions-List></Transactions-List>
    </v-container>
</template>

<script>
import TransactionsList from './TransactionsList';

export default {
    name: 'Transactions',
    components: {
        TransactionsList
    }
}
</script>
