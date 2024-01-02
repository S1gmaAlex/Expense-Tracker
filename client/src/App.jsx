import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from './pages/AuthPage';
import HomePage from "./pages/HomePage";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage"
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserInfor from "./pages/UserInfor";
import WidgetBar from "./components/WidgetBar";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import "./index.css"
function App() {
  const user = useRecoilValue(userAtom);
  return (
    <div className="web">
      <WidgetBar></WidgetBar>
      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
        <Route path='/incomes' element={user ? <IncomePage /> : <Navigate to='/auth' />} />
        <Route path='/expenses' element={user ? <ExpensePage /> : <Navigate to='/auth' />} />
        <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
        <Route path="/:id" element={user ? <UserInfor /> : <Navigate to='/auth' />} />
      </Routes>
    </div>
  )
}

export default App
