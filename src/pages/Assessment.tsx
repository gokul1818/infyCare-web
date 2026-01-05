import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../layouts/Footer";

export default function ResidentAssessment() {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(12);
  const totalPages = 44;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch data for the new page
  };

  const handleNew = () => console.log("New clicked");
  const handleEdit = () => console.log("Edit clicked");
  const handleDelete = () => console.log("Delete clicked");
  const handlePrint = () => console.log("Print clicked");
  return (
    <div>
      <div style={{ padding: 20 }}>
        <h1>ResidentAssessment</h1>

       

      </div>
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onNew={handleNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPrint={handlePrint}
        permissions={{
          canCreate: true,
          canEdit: true,
          canDelete: true,
          canPrint: true,
        }}
      />
    </div>
  );
}
