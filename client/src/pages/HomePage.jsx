import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const {fetchProducts, products} = useProductStore();

  useEffect(()=>{
    fetchProducts();
  },[fetchProducts]);
  console.log('products', products)

  return (
    <Container maxW={'Container.x1'} mt={8}>
      <VStack gap={8}>
        <Text
          fontSize={30}
          fontWeight={'bold'}
          color={'orange.600'}
          textAlign={'center'}
        >
          Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          gap={10}
          w={'full'}
        >
          {products.map((product)=>(
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        <Text fontSize={'x1'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
          No products found ☹️
        </Text>
      </VStack>
    </Container>
  )
}

export default HomePage