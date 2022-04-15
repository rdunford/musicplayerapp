import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router"
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutations";
import NextImage from "next/image";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await auth(mode, { email, password });
        setIsLoading(false);
        router.push("/");
    }

    return (
        <Box height="100vh" width="100vw" bg="black">
            <Flex justify="center"
                align="center"
                height="100px">
                <NextImage src="/Traxlogo.svg"
                    height={60}
                    width={120} />
            </Flex>

            <Flex justify="center" align="center" height="calc(100vh - 100px)" >
                <Box padding="50px" bg="gray.900" borderRadius="6px">
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            placeholder="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit"
                            bg="green.200"
                            isLoading={isLoading}
                            sx={{
                                "&:hover": {
                                    bg: "green.500",
                                    color: "white"
                                },
                            }}
                        >
                            {mode}
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    )
}

export default AuthForm;