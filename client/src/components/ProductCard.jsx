import { Box, Image, Heading, Text, HStack, IconButton, Button, Icon } from '@chakra-ui/react'
import { MdDelete, MdModeEdit } from "react-icons/md";
import React from 'react'
import { useColorModeValue } from './ui/color-mode';

function ProductCard({product}) {
    const textColor = useColorModeValue('gray.600','gray.200');
    
    return (
        <Box
        h={'15em'}
        shadow={'lg'}
        rounded={'xl'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{transform:'translateY(-5px)', shadow:'x1'}}
        bgImage={`url(${product.image})`}
        bgSize="cover"
        >
            {/* <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/> */}

            <Box p={4} bg={'transparent'}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'x1'} color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack gap={2}>
                    <Button variant={'ghost'} rounded={'full'} onClick={''} colorScheme={'blue'} >
                        <Icon as={MdDelete} color={'orange.600'}/>
                    </Button>
                    <Button variant={'ghost'} rounded={'full'} onClick={()=> handleDelete(product._id)} colorScheme={'red'}>
                        <Icon as={MdModeEdit} color={'orange.600'}/>
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}

export default ProductCard