import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";

function ParentDashboard() {
  const userData = useSelector((state) => state.auth?.data);
  const childs = userData?.childs || [];

  return (
    <HomeLayout>
      <div className="flex flex-col items-center pt-10 gap-8">
        <h1 className="text-3xl font-bold text-white mb-6">Your Children</h1>
        <div className="flex flex-wrap gap-8 justify-center w-full">
          {childs.length === 0 ? (
            <div className="text-white text-lg">No childs added yet.</div>
          ) : (
            childs.map((child) => (
              <Link
                to={`/child-courses/${child.email}`}
                key={child.email}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-2 w-64 hover:shadow-2xl transition"
              >
                <img
                  src={
                    child.avatar?.secure_url ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt={child.name}
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
                <div className="font-semibold text-lg capitalize">
                  {child.name}
                </div>
                <div className="text-gray-600 text-sm">{child.email}</div>
              </Link>
            ))
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default ParentDashboard;
