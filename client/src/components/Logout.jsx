import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import { Button, Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
const Logout = () => {
  const logout = useLogout();
  const user = useRecoilValue(userAtom);
  return (
    <Flex justifyContent={"space-between"} mt={6} mb='12'>
      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Button size={"xs"} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default Logout