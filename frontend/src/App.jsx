import { useEffect, useState } from "react";
import Table from "./data-table/table";
import { getUsers } from "./services";
import Pagination from "./Pagination";

export default function App() {
    const [users, setUsers] = useState(false);
    const [paginationData, setPaginationData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getUsers(currentPage, 10).then((data) => {
            setUsers(data["result"]);
            setPaginationData({
                previous: data?.previous,
                total: data.total,
                next: data?.next,
            });
        });
    }, [currentPage]);

    return (
        <div className="p-4">
            <Table
                searchable={true}
                head={[
                    { name: "Ad-Soyad", sortable: true },
                    { name: "E-posta" },
                    { name: "Yaş", sortable: true },
                    {
                        name: "İşlemler",
                        width: 200,
                        style: { textAlign: "right" },
                    },
                ]}
                body={
                    users &&
                    users.map((user, key) => [
                        user.name,
                        user.email,
                        user.age,
                        [
                            <button className="h-8 px-4 flex items-center justify-center rounded bg-blue-600 text-white">
                                Düzenle
                            </button>,
                            <button
                                onClick={() => {
                                    const tmpUsers = [...users];
                                    tmpUsers.splice(key, 1);
                                    setUsers(tmpUsers);
                                }}
                                className="h-8 px-4 flex items-center justify-center rounded bg-red-600 text-white"
                            >
                                Sil
                            </button>,
                        ],
                    ])
                }
            />

            <Pagination
                pageCounts={paginationData?.total?.pageCounts}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
