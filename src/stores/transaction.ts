import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { QueryParameters } from '@/utils/helpers'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<any[]>([])
  const transaction = ref<any>({})
  const countTransactions = ref<number>(0)
  const queryTransaction = ref<QueryParameters>({ page: 1, perPage: 10 })

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

  return {
    transactions,
    transaction,
    countTransactions,
    queryTransaction,
    setTransactions,
    setTransaction,
    setCountTransactions,
    setQueryTransaction
  }
})
