import "../index.css"
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import { Button, Flex } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import authScreenAtom from "../atoms/authAtom";
import { Avatar } from "@chakra-ui/avatar";
const WidgetBar = () => {
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const logout = useLogout();
  return (
    <>
      {user && (
        <Link as={RouterLink} to='/' />
      )}
      {!user && (
        <Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")} />
      )}
      {user && (

        <div className="nav">
          <div className="nav-header">

            <span className="user-icon">
              {user.profilePic && (
                <Avatar
                  name={user.name}
                  src={user.profilePic}
                  size={{
                    base: "md",
                    md: "xl",
                  }}
                />
              )}
              {!user.profilePic && (
                <Avatar
                  name={user.name}
                  src='https://bit.ly/broken-link'
                  size={{
                    base: "md",
                    md: "xl",
                  }}
                />
              )}
            </span>
            <div className="header-in4">
              <Link as={RouterLink} to={`/${user._id}`}>
                <span className="username">
                  <a style={{ fontSize: '25px' }}>
                    {user.name}
                  </a>
                </span>
              </Link>
              <br />
              <span className="information">Your money</span>
            </div>
          </div>
          <div className="nav-body">
            <button className="nav-btn">
              <Link as={RouterLink} to='/'>
                <i className="ti-bar-chart" style={{ marginRight: "5px", fontSize: '27px' }}></i> Dashboard
              </Link>
            </button>
            <button className="nav-btn">
              <Link as={RouterLink} to='/incomes'>
                <i className="ti-stats-up" style={{ marginRight: "5px", fontSize: '27px' }}></i> Incomes
              </Link>
            </button>
            <button className="nav-btn">
              <Link as={RouterLink} to='/expenses'>
                <i className="ti-stats-down" style={{ marginRight: "5px", fontSize: '27px' }}></i> Expense
              </Link>
            </button>
            <Flex alignItems={"center"} gap={4}>
              <Button onClick={logout} style={{ fontWeight: "normal", fontSize: '20px' }}>
                <FiLogOut size={18} style={{ marginRight: "5px" }} /> Logout
              </Button>
            </Flex>
          </div>
        </div>
      )}
    </>
  )
}

export default WidgetBar