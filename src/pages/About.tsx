import { Container, Typography } from "@mui/material";

export default function About() {
  return (
    <Container>
      <Typography variant='h4'> About the Application </Typography>
        <Typography variant='body1' style={{marginTop: '3vh', width: '70vw', lineHeight: '2'}}> 
          The Application is meant to serve as a medium for learning and practicing the tech stack that Gael
          used from his internship. Using NextJS to serve the functions of ExpressJS and ReactJS,
          Gael was able to create a full-stack application that consume data from its own API (backend).
          {<br/>}{<br/>}    
        </Typography>

        <Typography variant='h4'> MySQL </Typography>
          <Typography variant='body1' style={{marginTop: '3vh', width: '70vw', lineHeight: '2'}}> 
            MySQL is the relational database management system that is used for this application due to its
            complexity with entity relationships and management. Using the <b>mysql</b> npm package, NextJS was able to
            connect with the MySQL server. 
            {<br/>}{<br/>}
          </Typography>

          <Typography variant='h4'> Custom API </Typography>
            <Typography variant='body1' style={{marginTop: '3vh', width: '70vw', lineHeight: '2'}}>
              Gael utilized an API that would be able to basic CRUD and much more. The complexity of the CRUD is high due
              to the usage of <b>associative entities</b> in the database design. This was written without the aid of external APIs.
              {<br/>}{<br/>} 
            </Typography> 
    </Container>
  );
}
