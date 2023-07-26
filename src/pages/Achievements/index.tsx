/* eslint-disable react/no-unescaped-entities */
''
import  {Avatar, Container, Divider, Grid, List, ListItem, ListItemText} from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { UseQueryResult, useQuery } from 'react-query'

export default function Achievements(){
    type format = {
        id: number,
        description: string,
    } 
    const achievements : UseQueryResult<any, Array<format>> = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            return axios.get(`/api/achievements`)
            .then((res) => {
                console.log(res.data.results)
                return res.data.results
            })
        }
    })

if (achievements.isFetching){
    return <h1> Fetching data from MySQL </h1>
}

    return (
        <>
            <Grid container style={{fontFamily: 'Roboto'}}>
                <Grid item>
                    <h1> Gael's Achievements </h1>
                </Grid>
                <Grid item style={{marginLeft: '55vw'}}>
                    <Link href={'/Intro'}> 
                        <h1> Back to Home </h1> 
                    </Link>
                </Grid>
            </Grid>

            {achievements?.data?.map((element) => {
                return (
                <>
                    <Container style={{marginTop: '3vh', fontFamily: 'Roboto'}}>
                        <h4> {element.title} </h4>
                        <p style={{marginTop: '2vh'}}>
                            Description
                        </p>
                        <p>
                            {element.description}
                        </p>
                    </Container>
                </>
                )
            })}
        </>
    )
}