import { Link, useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navigation = [
        { name: "Dashboard", href: "/admin-dashboard" },
        { name: "Venues", href: "/venues" },
        { name: "Vendors", href: "/vendors" },
        { name: "Wedding Stories", href: "/wedding-stories" },
        { name: "Bookings", href: "/bookings" },
    ];

    const handleSignOut = () => {
        // Perform sign-out logic here
        navigate("/");
    };
    return (
        <div style={{ width: "250px", minHeight: "100vh", backgroundColor: "#fff", borderRight: "1px solid #ddd", display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0 }}>
            <div style={{ padding: "16px", borderBottom: "1px solid #ddd", textAlign: "center" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Wedding Hall Admin</h2>
            </div>
            <nav style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {navigation.map((item) => (
                        <li key={item.name} style={{ marginBottom: "8px" }}>
                            <Link
                                to={item.href}
                                style={{
                                    display: "block",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    textDecoration: "none",
                                    color: location.pathname === item.href ? "#007bff" : "#333",
                                    backgroundColor: location.pathname === item.href ? "#e0f0ff" : "#f8f9fa",
                                    cursor: "pointer"
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div style={{ padding: "16px", borderTop: "1px solid #ddd" }}>
                <button onClick={handleSignOut} style={{ width: "100%", padding: "10px", borderRadius: "4px", backgroundColor: "#ff4d4d", color: "white", border: "none", cursor: "pointer" }}>
                    Sign out
                </button>
            </div>
        </div>
    );
};
