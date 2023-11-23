import { useTransactionStore } from '@/stores/transaction'
import { storeToRefs } from 'pinia'
import { getTransactionsService, getTransactionByIdService } from '@/services/transactionServices'
import { useQuasar } from 'quasar'

export const useTransactionComposable = () => {
  const $q = useQuasar()
  const { setTransactions, setTransaction, setCountTransactions, setQueryTransaction } = useTransactionStore()
  const { transactions, transaction, queryTransaction, countTransactions } = storeToRefs(useTransactionStore())
  async function getTransactions(query: any): Promise<void> {
    $q.loading.show()
    try {
      const { status, data } = await getTransactionsService(query)
      if (status === 200) {
        setTransactions(data?.data)
        setCountTransactions(data?.meta?.total)
      }
    } catch (error) {
      console.log(error)
    } finally {
      $q.loading.hide()
    }
  }
  async function getTransactionById(id: number): Promise<void> {
    try {
      const { status, data } = await getTransactionByIdService(id)
      if (status === 200) setTransaction(data)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    transactions,
    transaction,
    queryTransaction,
    countTransactions,
    getTransactions,
    getTransactionById,
    setQueryTransaction
  }
}
