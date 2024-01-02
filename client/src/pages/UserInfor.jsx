import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import useGetUserProfile from "../hooks/useGetUserProfile.js";
import "../index.css"
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";
const UserInfor = () => {
    const { user, loading } = useGetUserProfile();
    const currentUser = useRecoilValue(userAtom);
    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found</h1>;
    return (
        <>
            {currentUser?._id === user._id && (
                <div className="userbody">
                    <div className="userbody-title">Profile</div>
                    <div className="userbody-text">
                        <div className="useravatar">
                            <Box>
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
                            </Box>
                        </div>
                        {user && (
                            <div className="userdetails">
                                <p><strong>Username:</strong> <p2>{user.name}</p2></p>
                                <p><strong>Full Name:</strong> John Doe</p>
                                <p><strong>Age:</strong> {user.age}</p>
                                <p><strong>Phone:</strong> {user.contact}</p>
                                <p><strong>Address:</strong> {user.address}</p>
                                <p><strong>Job:</strong> {user.job}</p>
                                <p><strong>Bio:</strong> {user.bio}</p>
                                {user?._id && (
                                    <Link as={RouterLink} to='/update'>
                                        <Button size={"sm"}>Update Profile</Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default UserInfor;