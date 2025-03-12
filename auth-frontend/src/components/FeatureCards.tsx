import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const FeatureCards: React.FC = () => {
  return (
    <Card>
        <CardContent>
            <Typography variant='h5'>title</Typography>
            <Typography variant='body1'>description</Typography>
        </CardContent>
    </Card>
)
}

export default FeatureCards;