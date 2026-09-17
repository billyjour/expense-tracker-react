function Search({ search, setSearch, sort, setSort }){

    return(
        <>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." />
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
            </select>
        </>

    );
}

export default Search