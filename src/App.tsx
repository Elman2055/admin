import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthAdmin from "./components/AuthAdmin";
import Layout from "./components/ux/Layout";
import BlogPageContainer from "./containers/BlogPageContainer";
import TransportPageContainer from "./containers/TransportPageContainer";
import SparesPageContainer from "./containers/SparesPageContainer";
import { AppProvider } from "./components/AppContext";
import CategoriesPageContainer from "./containers/CategoriesPageContainer";
import PricesPageContainer from "./containers/PricesPageContainer";
import './CustomScrollbar.css';
import AuthRoute from "./utils/AuthRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/admin-lg" element={<AuthAdmin />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="blog" element={<AuthRoute element={<BlogPageContainer />} />} />
            <Route path="transport" element={<AuthRoute element={<TransportPageContainer />} />} />
            <Route path="spares" element={<AuthRoute element={<SparesPageContainer />} />} />
            <Route path="categories" element={<AuthRoute element={<CategoriesPageContainer />} />} />
            <Route path="prices" element={<AuthRoute element={<PricesPageContainer />} />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
