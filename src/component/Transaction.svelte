<script lang="ts">
    import { formatNumber } from "../lib/NumberFormatter";

    export let transaction;
</script>

<div>
    <b>{transaction.name}</b>
    <small>{formatNumber(transaction.price)} ₽ / {formatNumber(transaction.miles)} миль</small>
</div>
