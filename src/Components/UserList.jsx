import React, { Fragment } from "react";

const UserList = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            });
    }
    , []);

    if (loading) {
        return <h1>Cargando...</h1>;
    }

    return (
        <Fragment>
            <div>
            <h1 className="py-20">Lista de usuarios</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
        </Fragment>
    );

}

export default UserList