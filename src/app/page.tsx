'use client'

import prisma from '@/db'

import {
  Flex,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Link
} from '@chakra-ui/react'

import { 
  ExternalLinkIcon,
  LinkIcon
} from '@chakra-ui/icons'

import {
  useState,
  useEffect
} from 'react'

function getCities() {
  return prisma.city.findMany(({take: 5}))
}

function generateRandomCity() {
  const alphabet = ['Brasov', 'Cluj-Napoca', 'Bucuresti', 'Berlin', 'London', 'Paris']
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

export default function Page() {
  const [randomCities, setRandomCities] = useState([])
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${generateRandomCity()}&count=5`)
      .then((res) => res.json())
      .then((data) => {
        setRandomCities(data.results)
      })
  }, [])

  useEffect(() => {
    fetch('/api/favourites')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setFavourites(data)
      })
  }, [])

  return(
    <>
    <Center>
      <Flex>
        <TableContainer m={50}>
          <Table variant='striped' size='sm'>
            <TableCaption>Top 5 cities from favourites</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Latitude</Th>
                <Th isNumeric>Longitude</Th>
                <Th isNumeric>Elevation</Th>
              </Tr>
            </Thead>
            <Tbody>
            {favourites.map(city => 
              <Tr>
                <Td><Link href={`/city?id=${city.id}&name=${city.name}&latitude=${city.latitude}&longitude=${city.longitude}`}>{city.name} <LinkIcon mx='2px' /></Link></Td>
                <Td isNumeric>{city.latitude}</Td>
                <Td isNumeric>{city.longitude}</Td>
                <Td isNumeric>{city.elevation}</Td>
              </Tr>)}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Latitude</Th>
                <Th isNumeric>Longitude</Th>
                <Th isNumeric>Elevation</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <TableContainer m={50}>
          <Table variant='striped' size='sm'>
            <TableCaption>Random 5 cities from <Link href='https://open-meteo.com/en/docs/geocoding-api' isExternal>Geocoding API <ExternalLinkIcon mx='2px' /></Link></TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Latitude</Th>
                <Th isNumeric>Longitude</Th>
                <Th isNumeric>Elevation</Th>
              </Tr>
            </Thead>
            <Tbody>
            {randomCities.map(city => 
              <Tr>
                <Td><Link href={`/city?name=${city.name}&latitude=${city.latitude}&longitude=${city.longitude}`}>{city.name} <LinkIcon mx='2px' /></Link></Td>
                <Td isNumeric>{city.latitude}</Td>
                <Td isNumeric>{city.longitude}</Td>
                <Td isNumeric>{city.elevation}</Td>
              </Tr>)}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Latitude</Th>
                <Th isNumeric>Longitude</Th>
                <Th isNumeric>Elevation</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </Center>
    </>
  )
}