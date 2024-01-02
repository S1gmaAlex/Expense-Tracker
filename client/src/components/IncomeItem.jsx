import "../index.css";
import useShowToast from "../hooks/useShowToast.js";
import { dateFormat } from "../utils/dateFormat.js";
import { useRecoilState } from "recoil";
import incomeAtom from "../atoms/incomeAtom.js";
import {
    Button,
    Flex,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useColorModeValue,
    useDisclosure,
    Stack,
    FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
const IncomeItem = (income) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    const [incomes, setIncomes] = useRecoilState(incomeAtom);
    const [inputs, setInputs] = useState({
        title: income.title,
        amount: income.amount,
        date: income.date,
        category: income.category,
        description: income.description,
    });
    const handleDelete = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this icome?")) return;
            const res = await fetch(`/api/income/delete-income/${income._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Income deleted", "success");
            setIncomes(incomes.filter((inc) => inc._id !== income._id));
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    const handleEditIncome = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/income/update-income/${income._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs }),
            });

            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "update successfully", "success");
            setIncomes(data)
            onClose();
        } catch (error) {
            showToast("Error", error, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="card" style={{ position: "relative" }}>
                <div className="card-text" >
                    <div style={{ display: "flex", paddingBottom: "10px" }}>
                        <h3 style={{ fontSize: "24px", marginLeft: "10px" }}>{income.title}</h3>
                        <h3 style={{ fontSize: "24px", marginLeft: "10px" }}>{`[${income.category}]`}</h3>
                    </div>
                    <div className="about">
                        <p className="p1">
                            <span style={{ fontSize: "24px", marginLeft: "10px", color: "green", fontWeight: "bold" }}>+ ${income.amount}</span>
                        </p>
                        <p className="p2">
                            <i style={{ fontSize: "20px" }} className="ti-calendar"></i>
                            <span style={{ fontSize: "20px", marginLeft: "5px" }}>{dateFormat(income.date)}</span>
                        </p>
                        <p className="p3" style={{ display: "flex" }}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="25" height="25" viewBox="0 0 24 24"
                                fill="none" stroke="#000000" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">
                                </path>
                            </svg>
                            <span style={{ fontSize: "20px", marginLeft: "10px" }}>{income.description}</span>
                        </p>
                    </div>
                </div>
                <div className="btn-trash">
                    <a>
                        <button onClick={onOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "35px", height: "35px", position: "absolute", marginTop: "-16px", right: "0", marginRight: "70px" }}
                                viewBox="0 0 24 24" fill="none" stroke="#000000"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="14 2 18 6 7 17 3 17 3 13 14 2">
                                </polygon><line x1="3" y1="22" x2="21" y2="22">
                                </line>
                            </svg>
                        </button>
                        <button >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "35px", height: "35px", position: "absolute", marginTop: "-16px", right: "0", marginRight: "10px" }}
                                onClick={() => handleDelete(income)}
                                viewBox="0 0 24 24" fill="none"
                                stroke="#000000" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6">
                                </polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                </path>
                                <line x1="10" y1="11" x2="10" y2="17">
                                </line><line x1="14" y1="11" x2="14" y2="17">
                                </line>
                            </svg>
                        </button>
                    </a>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Income</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleEditIncome}>
                            <Flex align={"center"} justify={"center"} my={6}>
                                <Stack
                                    spacing={4}
                                    w={"full"}
                                    maxW={"md"}
                                    bg={useColorModeValue("white", "gray.dark")}
                                    rounded={"xl"}
                                    boxShadow={"lg"}
                                    p={6}
                                >
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input
                                            placeholder='your title'
                                            value={inputs.title}
                                            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                                            _placeholder={{ color: "gray.500" }}
                                            type='text'
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Amount</FormLabel>
                                        <Input
                                            placeholder='your amount'
                                            value={inputs.amount}
                                            onChange={(e) => setInputs({ ...inputs, amount: e.target.value })}
                                            _placeholder={{ color: "gray.500" }}
                                            type='text'
                                        />
                                    </FormControl>
                                    <Stack >
                                        <Button
                                            bg={"green.400"}
                                            color={"white"}
                                            w='full'
                                            _hover={{
                                                bg: "green.500",
                                            }}
                                            type='submit'
                                            isLoading={loading}
                                        >
                                            Update
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}

export default IncomeItem