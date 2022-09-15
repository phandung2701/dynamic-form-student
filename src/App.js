import React from "react";
import Layout from "./features/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./features/Students/StudentList";
import Form from "./common/Form";
import CreatePages from "./features/CreatePages/CreatePages";
import CreateForm from "./features/CreatePages/components/Form/CreateForm";
import CreateTable from "./features/CreatePages/components/Table/CreateTable";
import PreviewForm from "./features/CreatePages/components/Preview/PreviewForm";
import PreviewTable from "./features/CreatePages/components/Preview/PreviewTable";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="teacher" element={<StudentList />} />
            <Route path="/createPage" element={<CreatePages />}>
              <Route path="form" element={<CreateForm />} />
              <Route path="table" element={<CreateTable />} />
            </Route>
            <Route path="/createPage/previewForm" element={<PreviewForm />} />
            <Route path="/createPage/previewTable" element={<PreviewTable />} />
            <Route path=":slug" element={<StudentList />} />
            <Route path=":slug/create" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
