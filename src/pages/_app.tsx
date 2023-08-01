import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as mui from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function MyApp({ Component, pageProps }) {
  let client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <div style={{ marginTop: "15vh", maxHeight: "400vh" }}>
        <mui.Box>
          <mui.AppBar style={{backgroundColor: 'chocolate'}}>
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
                Gael's Portfolio Site
              </mui.Typography>
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
