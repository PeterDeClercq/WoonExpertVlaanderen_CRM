"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "@/app/login/login.module.css";
import Logo from "@/assets/images/wev_logo.png";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";

import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log({ data, error });
    } else {
      router.push("/keuringen");
    }
  };

  useEffect(() => {
    const getSess = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/keuringen");
      }
    };
    getSess();
  }, []);

  return (
    <div className={styles.login}>
      <Image height={100} src={Logo} alt="Logo WoonExpertVlaanderen" priority />
      <form>
        <FormControl mt="50px" fontSize="14px" fontWeight="500">
          <FormLabel>E-mail</FormLabel>
          <Input
            mt="5px"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt="20px" fontSize="14px" fontWeight="500">
          <FormLabel>Wachtwoord</FormLabel>
          <InputGroup mt="5px">
            <Input
              pr="4.5rem"
              type={passwordHidden ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                height="1.75rem"
                size="sm"
                icon={passwordHidden ? <FaEyeSlash /> : <FaEye />}
                onClick={() => setPasswordHidden(!passwordHidden)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          mt="30px"
          width="100%"
          colorScheme="green"
          onClick={handleSignIn}
        >
          Aanmelden
        </Button>
        <Box textAlign="center">
          <Text mt={5}>Wachtwoord vergeten?</Text>
          <Link href="/reset-password">Klik hier om het te resetten</Link>
        </Box>
      </form>
    </div>
  );
}