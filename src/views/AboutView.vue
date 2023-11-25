
<template>
  <q-page padding class="wrapper">
    <q-breadcrumbs v-if="!$q.screen.lt.sm">
      <template v-slot:separator>
        <q-icon size="1.2em" name="chevron_right" color="primary" />
      </template>
      <q-breadcrumbs-el label="Principal" to="/" />
      <q-breadcrumbs-el label="Transações" />
    </q-breadcrumbs>
    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <div class="text-h4 text-primary">Sobre</div>

        <div class="text-h5 q-mt-md">Backend: Laravel 10 e PHP 8.2:</div>
        <p>O uso do Laravel 10 e PHP 8.2 foi estratégico para garantir eficiência na manipulação de dados. A flexibilidade
          do
          Laravel facilita a integração de diversas fontes, enquanto o PHP 8.2 oferece recursos avançados.</p>

        <div class="text-h5 q-mt-md">Armazenamento: MySQL:</div>
        <p>O MySQL foi escolhido pela confiabilidade e escalabilidade. Sua capacidade de gerenciar grandes volumes de
          dados é crucial para garantir informações sempre atualizadas.</p>

        <div class="text-h5 q-mt-md">Frontend: Vue 3 + Vite + TS:</div>

        <p>Principais bibliotecas utilizadas no frontend: Axios, Gridstack, Echart, Pinia, ts-config, Vue Router, Vite,
          Vitest, Cypress:
          Cada biblioteca tem um papel estratégico na criação de uma interface dinâmica:</p>

        Axios: Comunicação eficiente com o backend.<br>
        Gridstack: Criação de painéis personalizados para organização visual de informações.<br>
        Echart: Gráficos interativos para compreensão profunda dos dados.<br>
        Pinia: Gerenciamento eficiente do estado da aplicação.<br>
        Vue Router: Facilita navegação entre visualizações e relatórios.<br>
        Vitest: Assegura qualidade do código por meio de testes unitários.<br>
        Cypress: Realiza testes de ponta a ponta para garantir estabilidade.<br>

      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
</script>