

function Logout(){
    sessionStorage.removeItem("meta_address");
    sessionStorage.removeItem("meta_balance");
    window.location.href = "/"
    return (
        <h1>Logged out</h1>
    )
}

export default Logout;