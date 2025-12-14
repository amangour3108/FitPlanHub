import { Link } from "react-router-dom";

function Sidebar({ user }) {
  if (!user) return null;

  const linkData = [
    { to: "/plans", label: "Plans", roles: ["user"] },
    { to: "/feed", label: "Feed", roles: ["user"] },
    { to: "/dashboard/create-plan", label: "Create Plan", roles: ["trainer"] },
    { to: "/plans", label: "My Plans", roles: ["trainer"] },
  ];

  return (
    <div className="p-4">
      {linkData.map((link) => {
        // show link only if role is allowed
        if (!link.roles.includes(user.role)) return null;

        return (
          <p key={link.to} className="mb-2 text-lg text-center">
            <Link to={link.to}>
              {link.label}
            </Link>
          </p>
        );
      })}
    </div>
  );
}

export default Sidebar;
