import "../index.css";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Flex, Spinner } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast.js";
import useGetCurrentUser from "../hooks/useGetCurrentUser.js";
import { useRecoilState } from "recoil";
import expenseAtom from "../atoms/expenseAtom.js";
import CreateExpense from "../components/CreateExpense.jsx";
import ExpenseItem from "../components/ExpenseItem.jsx";

const ExpensePage = () => {
    const { user, loading } = useGetCurrentUser();
    const showToast = useShowToast();
    const [fetchingExpenses, setFetchingExpenses] = useState(true);
    const [allExpense, setAllExpenses] = useRecoilState(expenseAtom);
    useEffect(() => {
        const getAllExpense = async () => {
            setFetchingExpenses(true);
            try {
                const res = await fetch("/api/expense/get-expenses");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setAllExpenses(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setAllExpenses([]);
            } finally {
                setFetchingExpenses(false);
            }
        };
        getAllExpense();
    }, [setAllExpenses, showToast]);

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found</h1>;



    const totalExpense = () => {
        let totalExpense = 0;
        allExpense.forEach((expense) => {
            totalExpense = totalExpense + expense.amount
        })
        return totalExpense;
    }

    return (
        <div className="body">
            <div className="expense">
                <div className="body-title">
                    <h2>Expense</h2>
                </div>
                <div className="total-expense">
                    <p>Total Expense: </p>
                    <p>${totalExpense()}</p>
                    <span className="value"></span>
                </div>
                <div className="expense-body">
                    <div className="form-submit-expense">
                        <CreateExpense></CreateExpense>
                    </div>
                    <div className="card-body">
                        {fetchingExpenses && (
                            <Flex justifyContent={"center"} my={12}>
                                <Spinner size={"xl"} />
                            </Flex>
                        )}
                        <HistoryStyled>
                            {allExpense.map((exp) => {
                                return (
                                    <ExpenseItem key={exp._id}
                                        _id={exp._id}
                                        userId={user._id}
                                        type={exp.type}
                                        title={exp.title}
                                        amount={exp.amount}
                                        date={exp.date}
                                        category={exp.category}
                                        description={exp.description}
                                    />
                                )
                            })}
                        </HistoryStyled>
                    </div>
                </div>
            </div>
        </div>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export default ExpensePage