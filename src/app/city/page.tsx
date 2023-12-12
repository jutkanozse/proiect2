'use client'

import {
  Container,
  List,
  ListItem,
  ListIcon,
  Center
} from '@chakra-ui/react'


import { 
  InfoOutlineIcon
} from '@chakra-ui/icons'

import { useSearchParams } from 'next/navigation';

import {
  useState,
  useEffect
} from 'react'
 
export default function Page() {
  const searchParams = useSearchParams()
  const [data, setData] = useState({})
  const [extraData, setExtraData] = useState({})
 
  useEffect(() => {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchParams.get('name')}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results[0])
      })
  }, [])
 
  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${searchParams.get('latitude')}&longitude=${searchParams.get('longitude')}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`)
      .then((res) => res.json())
      .then((data) => {
        setExtraData(data.current)
        console.log(data)
      })
  }, [])

  return (
    <>
      <Container maxW='1000'>
        <Center>
          <List spacing={3} mt={50}>
            <ListItem>
              <ListIcon as={InfoOutlineIcon} color='green.500' />
              Name: {data.name}
            </ListItem>
            <ListItem>
              <ListIcon as={InfoOutlineIcon} color='green.500' />
              Latitude: {data.latitude}
            </ListItem>
            <ListItem>
              <ListIcon as={InfoOutlineIcon} color='green.500' />
              Longitude: {data.longitude}
            </ListItem>
            <ListItem>
              <ListIcon as={InfoOutlineIcon} color='green.500' />
              Elevation: {data.elevation}
            </ListItem>
            <ListItem>
              <ListIcon as={InfoOutlineIcon} color='green.500' />
              Population: {data.population}
            </ListItem>
            <ListItem>
              <ListIcon as={InfoOutlineIcon} color='green.500' />
              Temp: {extraData.temperature_2m} C
            </ListItem>
            <ListItem>
              <ListIcon as={InfoOutlineIcon} color='green.500' />
              Wind speed: {extraData.wind_speed_10m} km/h
            </ListItem>
            <ListItem>
              <ListIcon as={InfoOutlineIcon} color='green.500' />
              Humidity: {extraData.relative_humidity_2m} %
            </ListItem>
          </List>
        </Center>
      </Container>
    </>
  )
  }