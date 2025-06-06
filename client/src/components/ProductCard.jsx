import { Box, Image, Heading, Text, HStack, IconButton, Button, Icon, Stack, Input } from '@chakra-ui/react'
import { MdDelete, MdModeEdit } from "react-icons/md";
import {React, useState} from 'react'
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '../store/product';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Field } from "../components/ui/field"
import { Toaster, toaster } from "../components/ui/toaster"

function ProductCard({product}) {
    const textColor = useColorModeValue('gray.600','gray.200');
    const {deleteProduct, updateProduct} = useProductStore(); // Importa las funciones para actualizar y eliminar
    const [updatedProduct, setUpdatedProduct] = useState(product);  
    const handleDeleteProduct = async (pid) =>{
      const {success, message} = await deleteProduct(pid);
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
      }   
    }
    const handleUpdateProduct = async (pid, updatedProduct)=>{
      const {success, message} = await updateProduct(pid, updatedProduct);
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
      }   
    }
    
    
  return (
    <Box
    h={'20em'}
    shadow={'lg'}
    rounded={'1.25em'}
    overflow={'hidden'}
    transition={'all 0.3s'}
    _hover={{transform:'translateY(-5px)', shadow:'x1'}}
    bgImage={`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${product.image})`}
    bgSize="cover"
    bgPos={'center'}
    display={'flex'}
    flexDirection={'column'}
    >
        <Box p={4} bg={'transparent'} mt={'auto'}>
            <Heading as={'h2'} size={'xl'} color={'white'}>
                ${product.price}
            </Heading>
            <Text fontWeight={'500'} fontSize={'x1'} color={'gray.300'} mb={4}>
                {product.name}
            </Text>
            <HStack gap={2}>
                <Button rounded={'full'} variant="subtle" onClick={()=> handleDeleteProduct(product._id)} colorScheme={'blue'} >
                    <Icon as={MdDelete} color={'orange.600'}/>
                </Button>
                <DialogRoot>
                  <DialogTrigger asChild>
                    <Button rounded={'full'} variant="subtle" colorScheme={'red'}>
                        <Icon as={MdModeEdit} color={'orange.600'}/>
                    </Button>
                  </DialogTrigger>

                  <DialogContent rounded={'lg'}>
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb="4">
                      <Stack gap="4">
                          <Input rounded={'lg'} placeholder="Product Name" name='name' 
                          value={updatedProduct.name}
                          onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})}
                          />
                          <Input rounded={'lg'} placeholder="Price" name='price' 
                          value={updatedProduct.price}
                          onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value})}
                          />
                          <Input rounded={'lg'} placeholder="Image URL" name='image' 
                          value={updatedProduct.image}
                          onChange={(e)=> setUpdatedProduct({...updatedProduct, image: e.target.value})}
                          />                           
                      </Stack>
                    </DialogBody>
                    <DialogFooter>
                      <DialogActionTrigger asChild>
                        <Button variant="outline" rounded={'lg'}>Cancel</Button>
                      </DialogActionTrigger>
                      <DialogActionTrigger asChild>
                      <Button bgColor={'orange.600'} rounded={'lg'} onClick={()=> handleUpdateProduct(product._id, updatedProduct)}>Save</Button>
                      </DialogActionTrigger>
                    </DialogFooter>
                  </DialogContent>
              </DialogRoot>

            </HStack>
        </Box>
        <Toaster />
    </Box>
          
  )
    
}

export default ProductCard