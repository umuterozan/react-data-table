import {useState} from "react";
import Table from "./data-table/table";
import {data} from "./data-table/data";

export default function App() {

    const [users, setUsers] = useState(() => data)

    return (
        <div className="p-4">
            <Table
                searchable={true}
                head={[
                    { name: 'Ad-Soyad', sortable: true },
                    { name: 'E-posta' },
                    { name: 'Yaş', sortable: true },
                    { name: 'İşlemler', width: 200, style: { textAlign: "right" } }
                ]}
                body={users && users.map((user, key) => ([
                    `${user.name} ${user.surname}`,
                    user.email,
                    user.age,
                    [
                        <button className="h-8 px-4 flex items-center justify-center rounded bg-blue-600 text-white">Düzenle</button>,
                        <button onClick={() => {
                            const tmpUsers = [...users]
                            tmpUsers.splice(key, 1)
                            setUsers(tmpUsers)
                        }} className="h-8 px-4 flex items-center justify-center rounded bg-red-600 text-white">Sil</button>
                    ]
                ]))}
            />
        </div>
    )
}