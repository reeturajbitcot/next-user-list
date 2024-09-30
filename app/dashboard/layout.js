import Navbar from "@/components/Navbar";

function layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default layout;
