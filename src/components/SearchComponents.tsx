import React, { useEffect, useState, ChangeEvent } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

const URL = `https://jsonplaceholder.typicode.com/users`;

const SearchComponents: React.FC = () => {
  const [user, setUser] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  const fetchUser = async () => {
    try {
      const response = await fetch(URL);
      const data: User[] = await response.json();
      setUser(data);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const searchUser = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    console.log(search);
  };

  let resultados = []
  if(!search){
    resultados = user
  } else {
    resultados = user.filter((user: User) => user.name.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div>
      <form>
        <input value={search} onChange={searchUser} type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
      {resultados.map((user: User) => (
        <ul key={user.id}>
          <li>{user.name}</li>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>{user.address.street}</li>
        </ul>
      ))}
    </div>
  );
};

export default SearchComponents;
