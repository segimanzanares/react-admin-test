import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination'
import PropTypes from 'prop-types'

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

Paginator.propTypes = {
    collectionSize: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    maxSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Paginator;