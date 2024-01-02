import "../index.css";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Flex, Spinner } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast.js";
import useGetCurrentUser from "../hooks/useGetCurrentUser.js";
import { useRecoilState } from "recoil";
import incomeAtom from "../atoms/incomeAtom.js";
import CreateIncome from "../components/CreateIncome"
import IncomeItem from "../components/IncomeItem";
const IncomePage = () => {
    const { user, loading } = useGetCurrentUser();
    const showToast = useShowToast();
    const [fetchingIncomes, setFetchingIncomes] = useState(true);
    const [allIncome, setAllIncome] = useRecoilState(incomeAtom);
    useEffect(() => {
        const getAllIncome = async () => {
            setFetchingIncomes(true);
            try {
                const res = await fetch("/api/income/get-incomes");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setAllIncome(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setAllIncome([]);
            } finally {
                setFetchingIncomes(false);
            }
        };

        getAllIncome();
    }, [setAllIncome, showToast]);
    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found</h1>;

    const totalIncome = () => {
        let totalIncome = 0;
        allIncome.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    return (
        <div className="body">
            <div className="income">
                <div className="body-title">
                    <h2>Incomes</h2>
                </div>
                <div className="total-income">
                    <p>Total Income: </p>
                    <p>${totalIncome()}</p>
                    <span className="value"></span>
                </div>
                <div className="income-body">
                    <div className="form-submit-income">
                        <CreateIncome></CreateIncome>
                    </div>
                    <div className="card-body">
                        {fetchingIncomes && (
                            <Flex justifyContent={"center"} my={12}>
                                <Spinner size={"xl"} />
                            </Flex>
                        )}
                        <HistoryStyled>
                            {
                                allIncome.map((inc) => {
                                    return (
                                        <IncomeItem key={inc._id}
                                            _id={inc._id}
                                            userId={user._id}
                                            title={inc.title}
                                            description={inc.description}
                                            amount={inc.amount}
                                            date={inc.date}
                                            type={inc.type}
                                            category={inc.category}
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
export default IncomePage