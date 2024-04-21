// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, titleInput, amountInput, optionId} = transactionDetails

  const onDelete = () => {
    deleteTransaction(id)
  }

  return (
    <li className="container-l">
      <p className="item">{titleInput}</p>
      <p className="item">{amountInput}</p>
      <p className="item">{optionId}</p>
      <button className="delete-btn item" onClick={onDelete}>
        <img
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="img-delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
