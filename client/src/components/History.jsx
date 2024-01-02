import styled from 'styled-components'
import useHistory from '../hooks/useHistory';
import "../index.css"
const History = () => {
    const { transactionHistory } = useHistory()
    const [...history] = transactionHistory()

    return (
        <HistoryStyled>
            <p className="recent size" style={{ marginTop: " -70px", fontSize: "30px" }}>Recent History</p>
            {history.map((item) => {
                const { _id, title, amount, type } = item
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'green'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'green', fontWeight: "bold"
                        }}>
                            {
                                type === 'expense' ? `- $${amount <= 0 ? 0 : amount}` : `+$${amount <= 0 ? 0 : amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>

    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export default History