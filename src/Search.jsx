function Search({ search, setSearch, sort, setSort, filter, setFilter }){

    return(
        <>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." />
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="all">All</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="">                  Category      </option>
                <option value="food">           🍴 Food         </option>
                <option value="utilities">      💡 Utilities    </option>
                <option value="transport">      🚗 Transport    </option>
                <option value="shopping">       🛒 Shopping     </option>
                <option value="health">         🏥 Health       </option>
                <option value="education">      📚 Education    </option>
                <option value="salary">         💼 Salary       </option>
                <option value="freelance">      💻 Freelance    </option>
                <option value="business">       🏪 Business     </option>
                <option value="investment">     📈 Investment   </option>
                <option value="gift">           🎁 Gift         </option>
                <option value="other-income">   💰 Other        </option>
            </select>
        </>

    );
}

export default Search