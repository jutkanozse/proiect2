'use client'

import {
  Button,
  Center,
  Container,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link
} from '@chakra-ui/react'

import { 
  ExternalLinkIcon,
  LinkIcon
} from '@chakra-ui/icons'

import {
  useState,
  FormEvent
} from 'react'

export default function Page() {
  const [data, setData] = useState([])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${formData.get('name')}`)
    const data = await response.json()
    setData(data.results);
  }

  return (
    <>
      <Container maxW='1000'>
        <form onSubmit={onSubmit}>
          <Center>
            <Input id='name' name='name' variant='flushed' placeholder='Enter a city' size='lg' mt={10} borderColor='#545454' textAlign='center' w={400} />
          </Center>
          <Center>
            <Button type='submit' variant='outline' colorScheme='teal' mt={5} w={200}>Submit</Button>
          </Center>
        </form>
        {data.length > 0 &&
          <TableContainer mt={50}>
            <Table variant='striped' size='sm'>
              <TableCaption>Data from <Link href='https://open-meteo.com/en/docs/geocoding-api' isExternal>Geocoding API <ExternalLinkIcon mx='2px' /></Link></TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Latitude</Th>
                  <Th isNumeric>Longitude</Th>
                  <Th isNumeric>Elevation</Th>
                  <Th isNumeric>Population</Th>
                </Tr>
              </Thead>
              <Tbody>
              {data.map(city => 
                <Tr>
                  <Td><Link href={`/city?name=${city.name}&latitude=${city.latitude}&longitude=${city.longitude}`}>{city.name} <LinkIcon mx='2px' /></Link></Td>
                  <Td isNumeric>{city.latitude}</Td>
                  <Td isNumeric>{city.longitude}</Td>
                  <Td isNumeric>{city.elevation}</Td>
                  <Td isNumeric>{city.population}</Td>
                </Tr>)}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Name</Th>
                  <Th isNumeric>Latitude</Th>
                  <Th isNumeric>Longitude</Th>
                  <Th isNumeric>Elevation</Th>
                  <Th isNumeric>Population</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>}
      </Container>
    </>
  )
  }