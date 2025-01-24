import Link from "next/link";


export const TopBarMenu = () => {
  const menuItems: string[] = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <div>
      {menuItems.map((item, index) => (
        <div key={`${item}-${index}`}>
          <Link
            className="w-full"
            color={
              index === 2
                ? "primary"
                : index === menuItems.length - 1
                ? "danger"
                : "foreground"
            }
            href="#"
          >
            {item}
          </Link>
        </div>
      ))}
    </div>
  );
};
