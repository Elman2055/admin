import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthAdmin from "./components/AuthAdmin";
import Layout from "./components/ux/Layout";
import BlogPageContainer from "./containers/BlogPageContainer";
import TransportPageContainer from "./containers/TransportPageContainer";
import SparesPageContainer from "./containers/SparesPageContainer";
import { AppProvider } from "./components/AppContext";
import CategoriesPageContainer from "./containers/CategoriesPageContainer";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/admin-lg" element={<AuthAdmin />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="blog" element={<BlogPageContainer />} />
            <Route path="transport" element={<TransportPageContainer />} />
            <Route path="spares" element={<SparesPageContainer />} />
            <Route path="categories" element={<CategoriesPageContainer />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
