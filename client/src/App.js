import './App.css';
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Upload from './pages/Upload/upload';
import Search from './pages/Search/search';
import NotFound from './pages/NotFound/notfound';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Baloo 2',
      'cursive',
    ].join(','),
  },
});

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <BrowserRouter>
        <Header />
        <Box className="Content">
          <Routes>
            <Route path="/" element={<NotFound />} />
            <Route exact path="upload" element={<Upload />} />
            <Route exact path="search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </div>

    // </ThemeProvider>
  );
}

export default App;

