'use server'

import prisma from '@/db'

import {
  redirect
} from 'next/navigation'
 
export async function createCity(data: FormData) {
  const cityData = {
    name: data.get('name'),
    latitude: data.get('latitude'),
    longitude: data.get('longitude'),
    elevation: data.get('elevation')
  }

  await prisma.city.create({data: cityData})
  redirect('/favourites')
}

export async function deleteCity(data: FormData) {
  await prisma.city.delete({where: {id: data.get('id')}})
  redirect('/favourites')
}