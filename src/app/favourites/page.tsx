'use client'

import prisma from '@/db'

import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Link
} from '@chakra-ui/react'

import { 
  LinkIcon
} from '@chakra-ui/icons'

function getCities() {
  return prisma.city.findMany()
}

export default async function Page() {
  const cities = await getCities()

  return (
    <>
      <Container maxW='1000'>
          <TableContainer mt={50}>
            <Table variant='striped' size='sm'>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Latitude</Th>
                  <Th isNumeric>Longitude</Th>
                  <Th isNumeric>Elevation</Th>
                </Tr>
              </Thead>
              <Tbody>
              {cities.map(city => 
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
      </Container>
    </>
  )
  }