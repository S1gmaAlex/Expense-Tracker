import { atom } from "recoil";

const expenseAtom = atom({
	key: "expenseAtom",
	default: [],
});

export default expenseAtom;