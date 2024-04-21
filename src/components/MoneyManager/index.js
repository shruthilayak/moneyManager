import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionList: [],
    income: 0,
    balance: 0,
    expense: 0,
  }

  deleteTransaction = id => {
    const {transactionList, income, balance, expense} = this.state
    const trans = transactionList.filter(each => each.id === id)

    if (trans[0].optionId === 'INCOME') {
      this.setState(prevState => ({
        transactionList: prevState.transactionList.filter(
          each => each.id !== id,
        ),
        income: income - trans[0].amountInput,
        balance: balance - trans[0].amountInput,
      }))
    } else {
      this.setState(prevState => ({
        transactionList: prevState.transactionList.filter(
          each => each.id !== id,
        ),
        expense: parseInt(expense, 10) - parseInt(trans[0].amountInput, 10),
        balance: parseInt(balance, 10) + parseInt(trans[0].amountInput, 10),
      }))
    }
  }

  addTransaction = event => {
    event.preventDefault()
    const title = document.getElementById('title')
    const newTrans = document.getElementById('newTrans')
    const amount = document.getElementById('amount')
    const type = document.getElementById('type')
    const {income, expense, balance} = this.state
    let newIncome = 0
    let newBalance = 0
    let newExpense = 0
    if (type.value === 'INCOME') {
      newIncome = income + parseInt(amount.value, 10)
      newBalance = balance + parseInt(amount.value, 10)
    } else {
      newExpense = expense + parseInt(amount.value, 10)
      newBalance = balance - parseInt(amount.value, 10)
    }
    const newtrans = {
      id: uuidv4(),
      titleInput: title.value,
      amountInput: amount.value,
      optionId: type.value,
    }

    if (type.value === 'INCOME') {
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newtrans],
        income: newIncome,
        balance: newBalance,
      }))
    } else {
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newtrans],
        expense: newExpense,
        balance: newBalance,
      }))
    }

    newTrans.reset()
  }

  render() {
    const {transactionList, income, balance, expense} = this.state

    return (
      <div className="container">
        <div className="header">
          <h1 className="welcome-text">HI, Richard</h1>
          <p className="welcome-para">
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <div className="money-details-container">
          <MoneyDetails type="Balance" amount={balance} key="1" />
          <MoneyDetails type="Income" amount={income} key="2" />
          <MoneyDetails type="expense" amount={expense} key="3" />
        </div>
        <div className="lower-card">
          <div className="new-transaction">
            <h1 className="heading">Add Transaction</h1>
            <form id="newTrans">
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                type="text"
                className="input"
                placeholder="TITLE"
                id="title"
              />
              <br />
              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <br />
              <input
                type="text"
                placeholder="AMOUNT"
                className="input"
                id="amount"
              />
              <br />
              <label className="label" htmlFor="type">
                TYPE
              </label>
              <br />
              <select id="type" className="input">
                <option id="INCOME" value="INCOME" selected>
                  Income
                </option>
                <option id="EXPENSES" value="EXPENSES">
                  Expenses
                </option>
              </select>
              <br />
              <button
                type="submit"
                className="btn"
                onClick={this.addTransaction}
              >
                Add
              </button>
            </form>
          </div>
          <div className="new-transaction history-container">
            <h1 className="heading">History</h1>

            <ul className="history-list">
              <div className="history-list-heading">
                <p className="head">Title</p>
                <p className="head">Amount</p>
                <p className="head">Type</p>
                <p className="head">{`    `}</p>
              </div>
              {transactionList.map(each => (
                <TransactionItem
                  transactionDetails={each}
                  key={each.id}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
