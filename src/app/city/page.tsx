'use client'

import {
  Container,
  List,
  ListItem,
  ListIcon,
  Center,
  Button,
  Select,
  Textarea 
} from '@chakra-ui/react'


import { 
  InfoOutlineIcon
} from '@chakra-ui/icons'

import {
  useSearchParams
} from 'next/navigation'

import {
  useState,
  useEffect
} from 'react'

import {
  createCity,
  deleteCity,
  rateCity
} from './actions'

export default function Page() {
  const searchParams = useSearchParams()
  const [data, setData] = useState({})
  const [extraData, setExtraData] = useState({})
  const [rating, setRating] = useState(0)
  const [ratingDescription, setRatingDescription] = useState(null)
  const createCityFunc = createCity.bind(null)
  const deleteCityFunc = deleteCity.bind(null)
  const rateCityFunc = rateCity.bind(null)
  const cityId = searchParams.get('id')

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
      })
  }, [])
 
  if (cityId){
    useEffect(() => {
      fetch(`/api/city?id=${cityId}`)
        .then((res) => res.json())
        .then((data) => {
          setRating(data.rating)
          setRatingDescription(data.ratingDescription)
        })
    }, [])
  }

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
        <Center mt={10}>
          {cityId ? 
            <div>
              <form action={rateCityFunc}>
                <input type="hidden" id="id" name="id" value={cityId}></input>
                <Select name='rating' id='rating' placeholder='Select rating ...'>
                  {rating == 1 ? <option value='1' selected>⭐</option> : <option value='1'>⭐</option>}
                  {rating == 2 ? <option value='2' selected>⭐⭐</option> : <option value='2'>⭐⭐</option>}
                  {rating == 3 ? <option value='3' selected>⭐⭐⭐</option> : <option value='3'>⭐⭐⭐</option>}
                  {rating == 4 ? <option value='4' selected>⭐⭐⭐⭐</option> : <option value='4'>⭐⭐⭐⭐</option>}
                  {rating == 5 ? <option value='5' selected>⭐⭐⭐⭐⭐</option> : <option value='5'>⭐⭐⭐⭐⭐</option>}
                </Select>
                <br></br>
                <Textarea id='ratingDescription' name='ratingDescription' placeholder='Rating description ...' value={ratingDescription}/>
                <br></br>
                <br></br>
                <Center>
                  <Button colorScheme='teal' variant='outline' type='submit'>Rate</Button>
                </Center>
              </form>
              <br></br>
              <form action={deleteCityFunc}>
                <input type="hidden" id="id" name="id" value={cityId}></input>
                <Center>
                  <Button colorScheme='pink' variant='outline' type='submit'>Delete</Button>
                </Center>
              </form>
            </div>
          :
            <form action={createCityFunc}>
              <input type="hidden" id="name" name="name" value={data.name}></input>
              <input type="hidden" id="latitude" name="latitude" value={data.latitude}></input>
              <input type="hidden" id="longitude" name="longitude" value={data.longitude}></input>
              <input type="hidden" id="elevation" name="elevation" value={data.elevation}></input>
              <Button colorScheme='teal' variant='outline' type='submit'>Save</Button>
            </form>}
        </Center>
      </Container>
    </>
  )
  }