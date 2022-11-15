<script lang="ts">
  import { parseCopyPaste } from "./lib/CopyPasteParser";
  import { optimize } from "./lib/CompensationOptimizer";
  import { formatNumber } from "./lib/NumberFormatter";
  import { exampleCopypastedText } from "./lib/ExampleText";
  import Transaction from "./component/Transaction.svelte";
  import GithubLink from "./component/GithubLink.svelte";

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
        <p>
          На странице Мили в интернет банке
          <kbd class="smaller">Ctrl + A / Ctrl + C</kbd>
        </p>
        <p>Сюда <kbd class="smaller">Ctrl + V</kbd></p>
        <textarea
          placeholder={exampleCopypastedText}
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
          <h6>Доступно миль {formatNumber(milesInfo.balance)}</h6>

          <h6>Транзакции</h6>
          {#each transactions as transaction}
            <Transaction {transaction} />
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
        <Transaction {transaction} />
      {/each}
      <br />
      <i>
        {optimizationResult.transactions.length} покупки на сумму
        {formatNumber(optimizationResult.compensatedRubles)} ₽ за {formatNumber(
          optimizationResult.spendMiles
        )} миль
      </i>
    {/if}
  </article>
</main>

<GithubLink />
