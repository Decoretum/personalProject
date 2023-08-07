import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Info from "@/components/achievements/info";
import { Button, List, ListItem, Grid } from "@mui/material";
import Link from "next/link";


export default function View(){
    const router = useRouter();
    let path = Number(router.query.id);
    
    const skillsQuery = useQuery({
        enabled: !isNaN(path),
        queryKey: ['skills'],
        queryFn: async () => {
            return axios.get(`/api/AchSkills/${path}/view`)
            .then((res) => {
                console.log(res.data)
                return res.data})
        }
    })


    const aQuery = useQuery({
        enabled: !isNaN(path),
        queryKey: ['ach'],
        queryFn: async () => {
            return axios.get(`/api/achievements/${path}/view`)
            .then(
                (res) => {
                    return res.data.result[0];
                }
            )
        },
    })
    

    if (aQuery.isFetching){
        return <h1 style={{marginLeft: '2vw'}}> Retrieving Achievement data </h1>
    }

    if (aQuery.isError){
        return <h1 style={{marginLeft: '2vw'}}> Failed to retrieve Achievement data </h1>
    }

    

    if (aQuery.isSuccess) 
    {
    const wholeData = {achievement : aQuery.data, skills : skillsQuery.data}
    console.log(wholeData)
    return (
        <>    
            <Grid container style={{}}>
                <Grid item style={{}}>
                    <Info props={wholeData} />
                </Grid>

                <Grid item>
                    <Link href='/Achievements' style={{position: 'absolute', right: '10vw'}}>
                        <Button variant='contained'> Back </Button>
                    </Link>
                </Grid>
                
            </Grid>
        </>
    )}
}