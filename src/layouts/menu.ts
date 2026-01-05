import {
  MdPeople,
  MdContactPhone,
  MdEventNote,
  MdAssessment,
  MdHealing,
  MdMedicalServices,
  MdAccountBalance,
  MdFolderShared,
  MdSecurity,
  MdHome,
  MdWork,
} from "react-icons/md";

export const MENU = {
  admin: [
    {
      label: "Residents",
      icon: MdPeople,
      children: [
        { label: "Contact", path: "/residents/contact", icon: MdContactPhone },
        { label: "Diary", path: "/residents/diary", icon: MdEventNote },
        { label: "Assessment", path: "/residents/assessment", icon: MdAssessment },
        { label: "Care Plan", path: "/residents/care-plan", icon: MdHealing },
        { label: "Medical", path: "/residents/medical", icon: MdMedicalServices },
        { label: "Financial", path: "/residents/financial", icon: MdAccountBalance },
        { label: "A & I", path: "/residents/a-i", icon: MdFolderShared },
        { label: "MCA", path: "/residents/mca", icon: MdSecurity },
      ],
    },
    {
      label: "Employees",
      path: "/employees",
      icon: MdWork,
    },
    {
      label: "Home",
      path: "/home",
      icon: MdHome,
    },
  ],
};
