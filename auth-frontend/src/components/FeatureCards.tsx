import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
interface props {
    title: string;
    description?: string;
    onClick?: () => void;
    className?: string;
}

const FeatureCards: React.FC<props> = ({ title, description, onClick, className }) => {
    return (
        <Card
            className={`feature-card ${className || ''}`}
            onClick={onClick}
            sx={{
                maxWidth: 250,
                minHeight: 200,
                padding: 3,
                boxShadow: 4,
                borderRadius: 5,
                textAlign: 'center',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.06)', boxShadow: 8, backgroundColor: "#eeeeee" }
            }}>
            <CardContent>
                <Typography variant='h4' fontWeight='bold' gutterBottom sx={{ wordWrap: "break-word" }}>{title} </Typography>
                <Typography variant='h6' marginTop={2}>{description}</Typography>
            </CardContent>
        </Card>
    )
}

export default FeatureCards;