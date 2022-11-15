<script lang="ts">
  import { parseCopyPaste } from "./lib/CopyPasteParser";
  import { optimize } from "./lib/CompensationOptimizer";

  let copypasted: string;
  $: milesInfo = parseCopyPaste(copypasted);
  $: transactions = milesInfo.transactions ?? [];
  $: optimizationResult = optimize(milesInfo);
</script>

<main class="container">
  <hgroup>
    <h1>Miles guru</h1>
    <h2>Оптимизация компенсации милями в Тинькофф банке</h2>
  </hgroup>

  <article>
    <div class="grid">
      <div>
        <label for="copypasted">Скопируйте содержимое страницы Мили</label>
        <textarea
          name="copypasted"
          placeholder="Тут текст"
          rows="10"
          bind:value={copypasted}
        />
      </div>
      <div>
        <h5>Результат разбора</h5>
        {#if milesInfo.message}
          <h6>Не получается распарсить</h6>
          <p>{milesInfo.message}</p>
        {:else}
          <h6>Доступно миль {milesInfo.balance}</h6>

          <h6>Транзакции</h6>
          {#each transactions as transaction}
            <div>
              <b>{transaction.name}</b>
              <small>{transaction.price} ₽ / {transaction.miles} миль</small>
            </div>
          {/each}
          {#if transactions.length === 0}
            <small>Нет транзакций</small>
          {/if}
        {/if}
      </div>
    </div>
  </article>

  <article>
    <h3>Максимизируем рубли</h3>
    {#if optimizationResult.message}
      <p>{optimizationResult.message}</p>
    {:else}
      {#each optimizationResult.transactions as transaction}
        <div>
          <b>{transaction.name}</b>
          <small>{transaction.price} ₽ / {transaction.miles} миль</small>
        </div>
      {/each}
      <br/>
      <i
        >{optimizationResult.transactions.length} покупки на сумму {optimizationResult.compensatedRubles}
        ₽ за {optimizationResult.spendMiles} миль</i
      >
    {/if}
  </article>
</main>
