import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import Header from "./component/Header/Header";
import Toolbar from "./component/Toolbar/Toolbar";
import Footer from "./component/Footer/Footer";
import Sidebar from "./component/Sidebar/Sidebar";
import { appRoutes, sidebarItems } from "./routes";
import { DataProvider } from "./context/dataContext";
import { DocumentProvider } from "./context/documentContext";
import { EditProvider, useEditContext } from "./context/editContext";
import RequireAuth from "./routes/RequireAuth";
import { tokenManager } from "./api";

import "./App.css";

const NotFound = lazy(() => import("./pages/NotFound"));

function AppContent() {
  const { isEditing } = useEditContext();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isAuthed = tokenManager.isAuthenticated();
  const showShell = isAuthed && !isLoginPage;

  return (
    <div className={showShell ? "dashboard" : undefined}>
      <div className={showShell ? "dashboard-shell" : undefined}>
        {showShell && (
          <div className="dashboard-sidebar">
            <Sidebar items={sidebarItems} />
          </div>
        )}

        <div className={showShell ? "dashboard-main" : undefined}>
          {showShell && <Header />}
          {showShell && isEditing && (
            <div className="toolbar-container">
              <Toolbar />
            </div>
          )}

          <main className={showShell ? "dashboard-content" : undefined}>
            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                  }}
                >
                  <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />
                </div>
              }
            >
              <Routes>
                {appRoutes.map((route) => {
                  const isPublic = route.path === "/login";
                  const element = isPublic ? (
                    route.element
                  ) : (
                    <RequireAuth>{route.element}</RequireAuth>
                  );

                  return <Route key={route.path} path={route.path} element={element} />;
                })}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          {showShell && <Footer />}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <DocumentProvider>
        <EditProvider>
          <AppContent />
        </EditProvider>
      </DocumentProvider>
    </DataProvider>
  );
}

export default App;
