export default function Pagination({ pageCounts, currentPage, setCurrentPage }) {
    let pages = [];

    for (let i = 1; i < Math.ceil(pageCounts + 1); i++) {
        pages.push(i);
    }

    return (
        <div className="mt-5 flex justify-end gap-x-5">
            {pages.map((page, key) => {
                return <button className={page === currentPage ? 'h-8 px-4 flex items-center justify-center rounded text-white bg-red-600' : 'h-8 px-4 flex items-center justify-center rounded text-white bg-blue-600'} key={key} onClick={() => setCurrentPage(page)}>{page}</button>;
            })}
        </div>
    );
}
