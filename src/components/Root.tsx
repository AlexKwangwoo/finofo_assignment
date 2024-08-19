import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="max-h-screen flex flex-col overflow-y-hidden ">
      {/* Header */}
      <div
        id="invisibleScrollBar"
        className="relative  h-[100vh] w-full overflow-y-auto "
      >
        <Outlet />
      </div>
      {/* Footer */}
    </div>
  );
}
