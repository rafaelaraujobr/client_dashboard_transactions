import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { QueryParameters } from '@/utils/helpers'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<any[]>([])
  const transaction = ref<any>({})
  const countTransactions = ref<number>(0)
  const queryTransaction = ref<QueryParameters>({ page: 1, perPage: 10 })
  const filterTransaction = ref<any>({})
  const filterDrawerTransaction = ref<boolean>(false)

  function setTransactions(data: any[]): void {
    transactions.value = data
  }
  function setTransaction(data: any): void {
    transaction.value = data
  }
  function setCountTransactions(data: number): void {
    countTransactions.value = data
  }
  function setQueryTransaction(data: QueryParameters): void {
    queryTransaction.value = data
  }

  function setFilterTransaction(data: any): void {
    filterTransaction.value = data
  }

  function setFilterDrawerTransaction(data: boolean): void {
    filterDrawerTransaction.value = data
  }

  return {
    transactions,
    transaction,
    countTransactions,
    queryTransaction,
    filterTransaction,
    filterDrawerTransaction,
    setTransactions,
    setTransaction,
    setCountTransactions,
    setQueryTransaction,
    setFilterTransaction,
    setFilterDrawerTransaction
  }
})
