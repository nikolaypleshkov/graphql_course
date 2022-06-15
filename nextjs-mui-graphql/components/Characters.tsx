import { Box, Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Characters = ({characters}: {characters: any[]}) => {
  return (
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3}}>
          {characters.map((character) => (
              <Link href={`/characters/${character.id}`} key={character.id}>
              <Box>
                <Image src={character.image} width={300} height={300} alt={character.name} />
                <Typography variant='h4' align='center' fontSize="16px">
                    {character.name}
                </Typography>
                <Typography variant='body2'>
                    {character.origin.name}
                </Typography>
                <Typography variant='body2'>
                    {character.location.name}
                </Typography>
              </Box>
              </Link>
          ))}
      </Grid>
  )
}

export default Characters