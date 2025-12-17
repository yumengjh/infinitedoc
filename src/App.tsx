import Main from "./component/Main/main";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Sidebar from "./component/Sidebar/Sidebar";
import { DataProvider } from "./context/dataContext";

import "./App.css";

function App() {
  return (
    <DataProvider>
      <div className="dashboard">
        <Header />
        <div className="dashboard-shell">
          <div className="dashboard-sidebar">
            <Sidebar />
          </div>
          <main className="dashboard-content">
            <Main />
          </main>
        </div>
        <Footer />
      </div>
    </DataProvider>
  );
}

export default App;
