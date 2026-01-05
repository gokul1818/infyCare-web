
// Footer.tsx
import { FiCheck } from "react-icons/fi";
import { IoAddOutline, IoCreateOutline, IoLockClosedOutline, IoPrintOutline, IoTrashOutline } from "react-icons/io5";
import { Pagination } from "../components/common/Pagination";


interface FooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  permissions?: {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canPrint?: boolean;
  };
  onNew?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
}

export default function Footer({
  currentPage,
  totalPages,
  onPageChange,
  permissions = {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canPrint: true,
  },
  onNew,
  onEdit,
  onDelete,
  onPrint,
}: FooterProps) {
  return (
<footer className="fixed bottom-0 left-0 right-0 w-full h-14 bg-white border-t border-gray-300 px-6 flex items-center justify-between z-50">      {/* Left Side - Access Rights and Actions */}
      <div className="flex items-center gap-4">
        {/* Access Rights */}
        <div className="flex items-center gap-2">
          <IoLockClosedOutline className="text-gray-600 text-lg" />
          <span className="text-sm font-medium text-gray-700">Access Rights</span>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* New */}
          {permissions.canCreate && (
            <button
              onClick={onNew}
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-600 transition"
            >
              <IoAddOutline className="text-base" />
              <span>New</span>
            </button>
          )}

          <div className="w-px h-4 bg-gray-300"></div>

          {/* Edit */}
          {permissions.canEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-600 transition"
            >
              <FiCheck className="text-base" />
              <IoCreateOutline className="text-base" />
              <span>Edit</span>
            </button>
          )}

          <div className="w-px h-4 bg-gray-300"></div>

          {/* Delete */}
          {permissions.canDelete && (
            <button
              onClick={onDelete}
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-red-600 transition"
            >
              <FiCheck className="text-base" />
              <IoTrashOutline className="text-base" />
              <span>Delete</span>
            </button>
          )}

          <div className="w-px h-4 bg-gray-300"></div>

          {/* Print */}
          {permissions.canPrint && (
            <button
              onClick={onPrint}
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-600 transition"
            >
              <FiCheck className="text-base" />
              <IoPrintOutline className="text-base" />
              <span>Print</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Side - Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </footer>
  );
}
