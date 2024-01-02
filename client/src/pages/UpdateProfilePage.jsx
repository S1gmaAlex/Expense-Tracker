import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Avatar,
    Center,
    HStack,
    Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom.js";
import usePreviewImg from "../hooks/usePreviewImg.js";
import useShowToast from "../hooks/useShowToast.js";
import "../index.css"
import { useNavigate } from 'react-router-dom'

export default function UpdateProfilePage() {
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userAtom);
    const [inputs, setInputs] = useState({
        name: user.name,
        email: user.email,
        bio: user.bio,
        password: "",
    });
    const fileRef = useRef(null);
    const [updating, setUpdating] = useState(false);

    const showToast = useShowToast();

    const { handleImageChange, imgUrl } = usePreviewImg();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/users/update/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Profile updated successfully", "success");
            setUser(data);
            localStorage.setItem("current-user", JSON.stringify(data));
        } catch (error) {
            showToast("Error", error, "error");
        } finally {
            setUpdating(false);
        }
    };
    return (
        <>
            <div className="body">
                <form onSubmit={handleSubmit} style={{ width: "100%", paddingTop: "7px" }}>
                    <Flex align={"center"} justify={"center"}>
                        <Stack
                            spacing={4}
                            w={"full"}
                            rounded={"xl"}
                            bg={"#ccc"}
                            p={6}
                        >
                            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                                User Profile Edit
                            </Heading>
                            <FormControl id='userName'>
                                <Stack direction={["column", "row"]} spacing={6}>
                                    <Center>
                                        <Avatar size='xl' boxShadow={"md"} src={imgUrl || user.profilePic} />
                                    </Center>
                                    <Center w='full'>
                                        <Button w='full' onClick={() => fileRef.current.click()}>
                                            Change Avatar
                                        </Button>
                                        <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                                    </Center>
                                </Stack>

                            </FormControl>
                            <Stack >
                                <HStack>
                                    <Box>
                                        <FormControl>
                                            <FormLabel>Full name</FormLabel>
                                            <Input
                                                placeholder='John Doe'
                                                value={inputs.name}
                                                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                                _placeholder={{ color: "gray.500" }}
                                                type='text'
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl>
                                            <FormLabel>Email address</FormLabel>
                                            <Input
                                                placeholder='your-email@example.com'
                                                value={inputs.email}
                                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                                _placeholder={{ color: "gray.500" }}
                                                type='email'
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl>
                                            <FormLabel>Age</FormLabel>
                                            <Input
                                                placeholder='Your Age.'
                                                value={inputs.age}
                                                onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
                                                _placeholder={{ color: "gray.500" }}
                                                type='text'
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl>
                                            <FormLabel>Job</FormLabel>
                                            <Input
                                                placeholder='Your Job.'
                                                value={inputs.job}
                                                onChange={(e) => setInputs({ ...inputs, job: e.target.value })}
                                                _placeholder={{ color: "gray.500" }}
                                                type='text'
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>
                            </Stack>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    placeholder='Your Address.'
                                    value={inputs.address}
                                    onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
                                    _placeholder={{ color: "gray.500" }}
                                    type='text'
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Contact</FormLabel>
                                <Input
                                    placeholder='Your Contact'
                                    value={inputs.contact}
                                    onChange={(e) => setInputs({ ...inputs, contact: e.target.value })}
                                    _placeholder={{ color: "gray.500" }}
                                    type='text'
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Bio</FormLabel>
                                <Input
                                    placeholder='Your bio.'
                                    value={inputs.bio}
                                    onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                                    _placeholder={{ color: "gray.500" }}
                                    type='text'
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    placeholder='password'
                                    value={inputs.password}
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    _placeholder={{ color: "gray.500" }}
                                    type='password'
                                />
                            </FormControl>
                            <Stack spacing={6} direction={["column", "row"]}>
                                <Button
                                    bg={"red.400"}
                                    color={"white"}
                                    w='full'
                                    _hover={{
                                        bg: "red.500",
                                    }}
                                    onClick={() => navigate(`/${user._id}`)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    bg={"green.400"}
                                    color={"white"}
                                    w='full'
                                    _hover={{
                                        bg: "green.500",
                                    }}
                                    type='submit'
                                    isLoading={updating}
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </Flex>
                </form>
            </div>
        </>
    );
}