import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as mui from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from 'next/link'
import * as React from 'react'

export default function MyApp({ Component, pageProps }) {
  let client = new QueryClient();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const exploreClick = (e:any) => {
    setAnchorEl(e.currentTarget)
  }

  return (
    <QueryClientProvider client={client}>
      <div style={{ marginTop: "15vh", maxHeight: "100%", maxWidth: '100%', fontFamily: 'Roboto' }}>
        <mui.Box>
          <mui.AppBar style={{backgroundColor: '#1565c0'}}>
            <mui.Toolbar>
              <mui.IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </mui.IconButton>

              <mui.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link href='/Intro'>
                  Gael's Portfolio Site
                </Link>
                <mui.Button 
                  style={{marginLeft: '2vw', color: 'white'}}
                  aria-haspopup='true'
                  aria-expanded={open}
                  onClick={exploreClick}>
                  Explore
                </mui.Button>
              </mui.Typography>

              
              <mui.Menu 
              open={open} 
              keepMounted 
              anchorEl={anchorEl}
              onClose={() => {setAnchorEl(null)}}>
                <Link href='/About'>
                  <mui.MenuItem>
                      <mui.Typography>
                        About
                      </mui.Typography>
                  </mui.MenuItem>
                </Link>

              <Link href='/Achievements'>
                <mui.MenuItem>
                  <mui.Typography>
                    Achievements
                  </mui.Typography>
                  </mui.MenuItem>
              </Link>
            </mui.Menu>

              <mui.Button color="inherit">Login</mui.Button>
            </mui.Toolbar>
          </mui.AppBar>
        </mui.Box>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
