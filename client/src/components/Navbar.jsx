import { Container, Flex, Text, Link, HStack, Button, Icon, Span } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  ColorModeButton,
  DarkMode,
  LightMode,
  useColorMode,
  useColorModeValue,
} from "../components/ui/color-mode";
import { FaCirclePlus} from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import React from 'react'

function Navbar() {
  const {colorMode, toggleColorMode} = useColorMode();  // Desde Chakra UI
  const ThemeIcon = useColorModeValue(IoSunny, FaMoon); // La funcion useColorModeValue define dos estados, el primer parametro (IoSunny) sera en caso de modo claro, el segundo en caso (FaMoon) de modo oscuro.

  return (
    <Container w={'90%'} maxW={"1920"} px={4} mt={4}>
        <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"row",
            sm:"row"
        }}
        >
            <Text
            // Usaremos el texto como un router link que sera dirigido a "/"
            as={RouterLink} 
            to={'/'}
            fontSize={{base:22, sm:28}}
            fontWeight={'900'}
            textAlign={'center'}
            color={'orange.600'}
            >
              STORE <Span outline={'full'}>TEC</Span>
            </Text>
            <HStack gap={2} alignItems={'center'}>
              <Button variant={'ghost'} rounded={'full'} as={RouterLink} to={'/create'}>
                <Icon as={FaCirclePlus} color={'orange.600'}/>
              </Button>
              <Button onClick={toggleColorMode} variant={'ghost'} rounded={'full'}>
                <Icon as={ThemeIcon} color={'orange.600'}/>
              </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar