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
    let centerPage = Math.ceil(numPages / 2)
    for (let item = 1; item <= maxItems; item++) {
        let numberPage = (active <= centerPage) ? active + item - 1 : item;
        if (active <= centerPage) {
            if (item === center + 1) {
                items.push(<Pagination.Ellipsis disabled key="ellipsis" />)
            }
        }
        else if (item === center) {
            items.push(<Pagination.Ellipsis disabled key="ellipsis" />)
        }
        if (active <= centerPage) {
            if (item >= center + 1) {
                numberPage = numPages - (maxItems - item)
            }
        }
        else if (item >= center) {
            numberPage = active - (maxItems - item)
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