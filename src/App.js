import React from "react";
import Layout from "./features/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./features/frame/Frame";
import CreatePages from "./features/CreatePages/CreatePages";
import CreateForm from "./features/CreatePages/components/Form/CreateForm";
import CreateTable from "./features/CreatePages/components/Table/CreateTable";
import PageList from "./features/PageList/PageList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/createPage" element={<CreatePages />}>
              <Route path="form" element={<CreateForm />} />
              <Route path="table" element={<CreateTable />} />
            </Route>
            <Route path="/pagelist" element={<PageList />} />
            <Route path=":slug" element={<StudentList />} />
          </Route>
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
