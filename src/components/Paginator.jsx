import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination'

const Paginator = (props) => {
    const [active, setActive] = useState(props.page)
    let numPages = Math.ceil(props.collectionSize / props.pageSize)
    let maxItems = numPages >= props.maxSize ? props.maxSize : numPages;
    let center = Math.ceil(maxItems / 2);
    let items = [];

    const setPage = (page) => {
        setActive(page);
        props.onPageChange(page);
    }
    if (numPages > 1) {
        items.push(<Pagination.First key="first" disabled={active === 1} />)
        items.push(<Pagination.Prev key="prev" disabled={active === 1} />)
    }
    for (let item = 1; item <= maxItems; item++) {
        let numberPage = item;
        if (item === center) {
            items.push(<Pagination.Ellipsis key="ellipsis" />)
        }
        if (item >= center) {
            numberPage = numPages - (maxItems - item)
        }
        items.push(
            <Pagination.Item key={item} active={numberPage === active} onClick={() => setPage(numberPage)}>
                {numberPage}
            </Pagination.Item>,
        );
    }
    if (numPages > 1) {
        items.push(<Pagination.Next key="next" disabled={active === numPages} />)
        items.push(<Pagination.Last key="last" disabled={active === numPages} />)
    }
    return (
        <Pagination>{items}</Pagination>
    );
}

export default Paginator;