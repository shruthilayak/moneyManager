// Write your code heremoneydetails
import './index.css'

const MoneyDetails = props => {
  const {type, amount} = props

  let cardClass = ''
  let img = ''
  let alternate = ''
  let testId = ''
  if (type === 'Balance') {
    cardClass = 'greenClass'
    alternate = 'balance'
    testId = 'balanceAmouont'
    img =
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'
  } else if (type === 'Income') {
    cardClass = 'blueClass'
    alternate = 'income'
    testId = 'incomeAmouont'
    img =
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'
  } else {
    cardClass = 'violetClass'
    alternate = 'expenses'
    testId = 'expensesAmouont'
    img =
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'
  }
  return (
    <div className={`card ${cardClass}`}>
      <img src={img} alt={alternate} className="img" />
      <div className="inner-card">
        <p className="money-details-type">Your {type}</p>
        <p className="money" data-testId={testId}>
          Rs {amount}
        </p>
      </div>
    </div>
  )
}

export default MoneyDetails
