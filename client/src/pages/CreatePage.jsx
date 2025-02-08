import { Container, VStack, Heading, Box, Input, Button } from '@chakra-ui/react';
import {React, useState} from 'react'
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product';
import { Toaster, toaster } from "../components/ui/toaster"


function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:"",
  });

  const {createProduct} = useProductStore();

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct)
    console.log('Success: ', success);
    console.log('Message: ', message);
    
    <Toaster />

    if(!success){
      toaster.create({
        title: 'Error',
        description: message,
        type: 'error',
        isClosable: true,
      })
    }else{
      toaster.create({
        title: 'Success',
        description: message,
        type: 'success',
        isClosable: true,
      })
      setNewProduct({name:'', price: '', image: ''})
    }
    
  }

  return (
    <Container maxW={'container.sm'}>
      <VStack
        spacing={8}
      >
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8} mt={8} fontSize={{base:24, sm:32}}>
          Create New Product
        </Heading>
        <Box
          w={'full'} maxW={'xl'} bg={useColorModeValue('white','gray.900')}
          p={6} rounded={'lg'} shadow={'md'}
        >
          <VStack gap={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e)=> setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
              placeholder='Price'
              name='price'
              value={newProduct.price}
              onChange={(e)=> setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e)=> setNewProduct({...newProduct, image: e.target.value})}
            />

            <Button colorScheme={'blue'} onClick={handleAddProduct} w={'full'} mt={8} bgColor={'orange.600'}>
              Add Product
            </Button>

            <Toaster />
           
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage